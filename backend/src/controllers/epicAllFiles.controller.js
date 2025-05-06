import fs from "fs";
import path from "path";
import { headers as headersConfig } from "../model/main.model.js";
import { getFilePath } from "../utils/filePath.js";
// Utility function to process each line based on headers
const processLine = (line, headers) => {
  if (!Array.isArray(headers)) {
    throw new Error("Headers must be an array");
  }

  const values = line.trim().split(/\s+/); // Split values based on spaces

  return headers.reduce((obj, header, index) => {
    obj[header] = values[index] || null; // Map each value to its corresponding header
    return obj;
  }, {});
};

// Function to read data from the specified file
const readEpicFile = (filePath, callback) => {
  fs.readFile(filePath, "utf8", (err, data) => {
    if (err) {
      return callback(new Error(`Failed to read file: ${filePath}`), null);
    }

    const lines = data.trim().split("\n");
    callback(null, lines);
  });
};

// Function to write updated data to the specified file
const writeEpicFile = (filePath, data, callback) => {
  fs.writeFile(filePath, data.join("\n"), "utf8", (err) => {
    if (err) {
      return callback(new Error(`Failed to write file: ${filePath}`));
    }
    callback(null);
  });
};

const getEpicFormData = async (req, resp) => {
  const { formName, startingPoint, endingPoint } = req.query;

  let formConfig = headersConfig[formName];

  if (!formConfig) {
    formConfig = {
      index: 0,
      headers: [["ID", "Filename"]],
      forLoopEndpoint: 0,
    };
  }

  const {
    headers: formHeaders,
    index = startingPoint,
    forLoopEndpoint = endingPoint,
  } = formConfig;

  const filePathFromEnv = getFilePath();

  if (!filePathFromEnv) {
    return resp.status(500).json({ error: "FilePath is not defined." });
  }

  const driveCPath = path.join(filePathFromEnv);

  const filePath = path.join(driveCPath, `${formName}.dat`);

  readEpicFile(filePath, (err, lines) => {
    if (err) {
      return resp.status(500).json({ error: err.message });
    }

    const formData = [];
    const endpoint =
      forLoopEndpoint && forLoopEndpoint > 0
        ? Math.min(forLoopEndpoint, lines.length)
        : lines.length;

    let headerIndex = 0;

    for (let i = index; i < endpoint; i++) {
      const line = lines[i].trim();

      if (headerIndex >= formHeaders.length) {
        headerIndex = 0;
      }

      const currentHeaders = formHeaders[headerIndex];

      if (line) {
        try {
          const row = processLine(line, currentHeaders);
          formData.push(row);
        } catch (error) {
          return resp.status(500).json({
            error: `Error processing line ${i + 1}: ${error.message}`,
          });
        }
      }

      headerIndex++;
    }

    const response = {
      formName,
      data: formData,
    };

    if (formConfig.descriptions) {
      response.descriptions = formConfig.descriptions;
    }
    resp.json({
      formName,
      data: formData,
      descriptions: formConfig.descriptions || {},
    });
  });
};

const getEpicFormDataBySearch = (req, resp) => {
  const { searchField, searchTerm, formName } = req.query;

  if (!searchField || !searchTerm) {
    return resp
      .status(400)
      .json({ error: "Search field and term are required" });
  }

  const filePathFromEnv = getFilePath();

  if (!filePathFromEnv) {
    return resp.status(500).json({ error: "FilePath is not defined." });
  }

  const driveCPath = path.join(filePathFromEnv);

  const filePath = path.join(driveCPath, `${formName}.dat`);

  readEpicFile(filePath, (err, lines) => {
    if (err) {
      return resp.status(500).json({ error: err.message });
    }

    const formConfig = headersConfig[formName] || {
      headers: [["ID", "Filename"]],
    };
    const { headers: formHeaders } = formConfig;

    let formData = null;
    let headerIndex = 0;

    for (let i = 0; i < lines.length; i++) {
      const line = lines[i].trim();

      if (headerIndex >= formHeaders.length) {
        headerIndex = 0;
      }

      const currentHeaders = formHeaders[headerIndex];

      if (line) {
        try {
          const row = processLine(line, currentHeaders);

          // Apply search filter here and return first match
          if (
            row[searchField]
              ?.toString()
              .toLowerCase()
              .includes(searchTerm.toLowerCase())
          ) {
            formData = row;
            break; // Stop after finding the first matching row
          }
        } catch (error) {
          return resp.status(500).json({
            error: `Error processing line ${i + 1}: ${error.message}`,
          });
        }
      }

      headerIndex++;
    }

    if (formData) {
      return resp.json({
        formName,
        data: formData, // Return only the first matched row
      });
    } else {
      return resp.status(404).json({
        error: `No data found matching the search criteria for ${searchField} with term ${searchTerm}`,
      });
    }
  });
};

const getEpicFormSuggestions = (req, resp) => {
  const { searchField, searchTerm, formName } = req.query;

  if (!searchField || !searchTerm) {
    return resp
      .status(400)
      .json({ error: "Search field and term are required" });
  }

  const filePathFromEnv = getFilePath();

  if (!filePathFromEnv) {
    return resp.status(500).json({ error: "FilePath is not defined." });
  }

  const driveCPath = path.join(filePathFromEnv);

  const filePath = path.join(driveCPath, `${formName}.dat`);

  readEpicFile(filePath, (err, lines) => {
    if (err) {
      return resp.status(500).json({ error: err.message });
    }

    const formConfig = headersConfig[formName] || {
      headers: [["ID", "Filename"]],
    };
    const { headers: formHeaders } = formConfig;

    let suggestions = [];
    let headerIndex = 0;

    for (let i = 0; i < lines.length; i++) {
      const line = lines[i].trim();

      if (headerIndex >= formHeaders.length) {
        headerIndex = 0;
      }

      const currentHeaders = formHeaders[headerIndex];

      if (line) {
        try {
          const row = processLine(line, currentHeaders);

          if (
            row[searchField]
              ?.toString()
              .toLowerCase()
              .includes(searchTerm.toLowerCase())
          ) {
            suggestions.push(row[searchField]);
            if (suggestions.length >= 10) break; // Limit to 10 suggestions
          }
        } catch (error) {
          return resp.status(500).json({
            error: `Error processing line ${i + 1}: ${error.message}`,
          });
        }
      }

      headerIndex++;
    }

    return resp.json({
      formName,
      suggestions, // Return the suggestions as an array
    });
  });
};

const updateEpicFormData = (req, resp) => {
  const { fileName, startingPoint, endingPoint } = req.body; // Destructure fileName and startingPoint from the request body

  const updates = req.body; // Destructure updates from the request body

  // Validate the request body to ensure rows exist, fileName and startingPoint are provided
  if (
    !updates ||
    typeof updates !== "object" ||
    !fileName ||
    startingPoint === undefined
  ) {
    return resp.status(400).json({
      error:
        "Invalid or missing updates, fileName, or startingPoint in request body",
    });
  }

  const filePathFromEnv = getFilePath();

  if (!filePathFromEnv) {
    return resp.status(500).json({ error: "FilePath is not defined." });
  }

  const driveCPath = path.join(filePathFromEnv);

  const filePath = path.join(driveCPath, `${fileName}.dat`); // Dynamically set file name

  // Read the file content
  fs.readFile(filePath, "utf8", (err, data) => {
    if (err) {
      return resp
        .status(500)
        .json({ error: `Failed to read ${fileName}.dat file` });
    }

    // Split the file content into lines, without trimming spaces
    const lines = data.split("\n");

    // Function to update a line based on the original format
    // Function to update a line based on the original format with space adjustments
    // Function to update a line based on the original format
    const updateLine = (lineIndex, rowData) => {
      if (rowData) {
        const originalLine = lines[lineIndex];
        const values = originalLine.match(/\S+/g); // Split only by values (ignoring spaces)

        // Log the original line and values for debugging

        let valueIndex = 0;
        Object.keys(rowData).forEach((key) => {
          // Check if value exists in the original line before updating
          if (values[valueIndex]) {
            values[valueIndex] = rowData[key]; // Update the value
          }
          valueIndex++; // Move to the next value position
        });

        // Recreate the line by keeping the same format and length
        lines[lineIndex] = originalLine.replace(/\S+/g, (match, i) => {
          return values.shift(); // Replace with updated values
        });
      }
    };

    // Update the lines for each row based on the incoming updates
    Object.entries(updates).forEach(([rowKey, rowData], index) => {
      if (rowKey !== "fileName" && rowKey !== "startingPoint") {
        const lineIndex = startingPoint; // Use the startingPoint to calculate the line index
        updateLine(lineIndex, rowData); // Update the line at the calculated lineIndex
      }
    });

    // Join the updated lines back into file content, preserving the original structure
    const updatedContent = lines.join("\n");

    // Write the updated content back to the file
    fs.writeFile(filePath, updatedContent, "utf8", (err) => {
      if (err) {
        return resp
          .status(500)
          .json({ error: `Failed to update file ${fileName}` });
      }
      resp.json({ message: "Data updated successfully" });
    });
  });
};

const getEpicFormLastID = (req, resp) => {
  const { formName } = req.query;

  if (!formName) {
    return resp.status(400).json({ error: "Form name is required" });
  }

  const formConfig = headersConfig[formName];
  if (!formConfig) {
    return resp
      .status(404)
      .json({ error: `No headers configuration found for form ${formName}` });
  }

  const { headers: formHeaders } = formConfig;
  const filePathFromEnv = getFilePath();


  if (!filePathFromEnv) {
    return resp.status(500).json({ error: "FilePath is not defined." });
  }

  const driveCPath = path.join(filePathFromEnv);

  const filePath = path.join(driveCPath, `${formName}.dat`);

  // Read the file content
  fs.readFile(filePath, "utf8", (err, data) => {
    if (err) {
      return resp
        .status(500)
        .json({ error: `Failed to read ${formName}.dat file` });
    }

    // Split the file content into lines
    const lines = data.trim().split("\n");

    // Find the last non-empty line
    let lastLine = lines[lines.length - 1];
    while (!lastLine && lines.length > 0) {
      lines.pop();
      lastLine = lines[lines.length - 1];
    }

    if (!lastLine) {
      return resp.status(404).json({ error: "No data found in the file" });
    }

    const headerIndex = 0;
    const currentHeaders = formHeaders[headerIndex];

    try {
      // Parse the last line based on headers
      const line = lastLine.trim().split(/\s+/); // Adjust this if the data format is different

      // const row = processLine(lastLine, currentHeaders);

      // Extract last ID and calculate new ID
      const lastID = line[0]; // Assuming "ID" is the field name for ID
      const newID = parseInt(lastID) + 1;
      // Create an empty row structure based on headers
      // const emptyRow = Object.fromEntries(
      //   currentHeaders.map((header) => [header, ""])
      // );
      const emptyRow = Object.fromEntries(
        currentHeaders.map((header) => [
          header,
          header === currentHeaders[0] ? newID : "",
        ])
      );

      return resp.json({
        // formName,
        disabledField: currentHeaders[0],
        newID,
        // lastRow: row, // Send the last row if needed
        newRow: emptyRow, // Send an empty row template
      });
    } catch (error) {
      return resp
        .status(500)
        .json({ error: `Error processing last row: ${error.message}` });
    }
  });
};

// Function to add a new row to the specified file

const addEpicFormRow = (req, resp) => {
  const { formName, formData } = req.body;

  // Validate request body
  if (
    !formName ||
    !formData ||
    !Array.isArray(formData) ||
    formData.length === 0
  ) {
    return resp
      .status(400)
      .json({ error: "Form name and row data are required" });
  }

  const formConfig = headersConfig[formName];
  if (!formConfig) {
    return resp
      .status(404)
      .json({ error: `No headers configuration found for form ${formName}` });
  }

  const { headers: formHeaders } = formConfig;
  const currentHeaders = formHeaders[0]; // Assuming the first set of headers is used

  const filePathFromEnv = getFilePath();

  if (!filePathFromEnv) {
    return resp.status(500).json({ error: "FilePath is not defined." });
  }

  const driveCPath = path.join(filePathFromEnv);

  const filePath = path.join(driveCPath, `${formName}.dat`);

  // Define field widths based on the example data
  // const fieldWidths = [5, 20, 10, 12, 12, 30]; // Adjust widths based on actual data format

  // Read existing data from the file
  fs.readFile(filePath, "utf8", (err, data) => {
    if (err) {
      console.error(`Error reading file ${formName}.dat:`, err);
      return resp
        .status(500)
        .json({ error: `Failed to read ${formName}.dat file` });
    }

    const lines = data.split("\n");

    const line = lines[0];
    console.log(line);
    const spaceGroups = (line.match(/ +/g) || []).map((group) => group.length);
    // Validate and construct new rows

    formData.forEach((actualFormData) => {
      const missingFields = currentHeaders.filter(
        (header) => !(header in actualFormData)
      );
      if (missingFields.length > 0) {
        return resp
          .status(400)
          .json({ error: `Missing fields: ${missingFields.join(", ")}` });
      }

      // Create a new row with padded fields to match column width
      const newRow = currentHeaders
        .map((header, index) => {
          const value = actualFormData[header] || ""; // Default to empty string if not present
          if (index === 0) {
            return String(value).trim().padStart(spaceGroups[index]);
          } else {
            return String(value).trim().padEnd(spaceGroups[index]); // Pad to the column width
          }
        })
        .join(" "); // Join fields with a space

      // Append the new row to the lines
      console.log(lines, newRow);
      lines.push(newRow);
      console.log(lines);
    });

    // Write the updated content back to the file
    fs.writeFile(filePath, lines.join("\n"), "utf8", (err) => {
      if (err) {
        return resp
          .status(500)
          .json({ error: `Failed to update file ${formName}` });
      }
      resp.json({ message: "Data added successfully" });
    });
  });
};

// Export functions
export {
  getEpicFormData,
  updateEpicFormData,
  getEpicFormDataBySearch,
  getEpicFormSuggestions,
  getEpicFormLastID,
  addEpicFormRow,
};
