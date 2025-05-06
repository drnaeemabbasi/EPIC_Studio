import fs from "fs";
import path from "path";
import { headers as headersConfig } from "../model/main.model.js";
import { Console } from "console";
import { getFilePath } from "../utils/filePath.js";

const fetchOPCFormData = (req, resp) => {
  const { formName } = req.query;
  let formConfig = headersConfig[formName];

  const filePathFromEnv = getFilePath();

  if (!filePathFromEnv) {
    return resp.status(500).json({ error: "FilePath is not defined." });
  }

  const driveCPath = path.join(filePathFromEnv);
  fs.readdir(driveCPath, (err, files) => {
    if (err) {
      return resp
        .status(500)
        .json({ error: `Error reading directory: ${err.message}` });
    }

    const opcFiles = files.filter(
      (file) => path.extname(file).toLowerCase() === ".opc"
    );

    if (opcFiles.length === 0) {
      return resp.status(404).json({ message: "No .opc files found" });
    }

    const filePath = path.join(driveCPath, opcFiles[0]);

    fs.readFile(filePath, "utf8", (err, data) => {
      if (err) {
        return resp.status(500).json({ error: "Failed to read file" });
      }

      const lines = data
        .trim()
        .split("\n")
        .filter((line) => line.trim() !== ""); // Remove empty lines
      const { headers } = formConfig;

      if (!headers || headers.length === 0) {
        return resp
          .status(500)
          .json({ error: "No headers defined in config." });
      }

      const rows = lines.slice(2).map((line) => {
        // Use `slice(2)` to skip the first two rows
        const values = line.trim().split(/\s+/); // Split line into an array of values
        let obj = {};

        // Access the first set of headers
        const actualHeaders = headers[0];

        // Map each header to its corresponding value
        actualHeaders.forEach((header, valueIndex) => {
          obj[header] = values[valueIndex] || null; // Use null if there's no corresponding value
        });

        return obj;
      });
      resp.json({ data: rows, descriptions: formConfig.descriptions });
    });
  });
};

const updateOPCFormData = (req, resp) => {
  const { formData } = req.body;

  if (!formData || !Array.isArray(formData)) {
    return resp
      .status(400)
      .json({ error: "Invalid or missing data in request body" });
  }

  const filePathFromEnv = getFilePath();

  if (!filePathFromEnv) {
    return resp.status(500).json({ error: "FilePath is not defined." });
  }

  const driveCPath = path.join(filePathFromEnv);

  fs.readdir(driveCPath, (err, files) => {
    if (err) {
      return resp
        .status(500)
        .json({ error: `Error reading directory: ${err.message}` });
    }

    const opcFiles = files.filter(
      (file) => path.extname(file).toLowerCase() === ".opc"
    );

    if (opcFiles.length === 0) {
      return resp.status(404).json({ message: "No .opc files found" });
    }

    const filePath = path.join(driveCPath, opcFiles[0]);

    fs.readFile(filePath, "utf8", (err, data) => {
      if (err) {
        return resp.status(500).json({ error: "Failed to read file" });
      }
      const lines = data.trim().split("\n");
      let formConfig = headersConfig["OPCForm"];
      const { headers } = formConfig;

      // Function to update a line based on the original format
      const updateLine = (lineIndex, rowData) => {
        if (rowData) {
          const originalLine = lines[lineIndex];

          const values = originalLine.match(/\S+/g); // Split only by values (ignoring spaces)

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

      formData.forEach((line, index) => {
        // if (index > 1) {
        updateLine(index + 2, line); // First line (row1)
        // }
      });
      const updatedContent = lines.join("\n");
      // Write the updated content back to the file
      fs.writeFile(filePath, updatedContent, "utf8", (err) => {
        if (err) {
          return resp.status(500).json({ error: "Failed to update file" });
        }
        resp.json({ message: "Data updated successfully" });
      });
    });
  });
};

const fetchSITFormData = (req, resp) => {
  const formName = "SITForm";
  const formConfig = headersConfig[formName];

  const filePathFromEnv = getFilePath();

  if (!filePathFromEnv) {
    return resp.status(500).json({ error: "FilePath is not defined." });
  }

  const driveCPath = path.join(filePathFromEnv);

  fs.readdir(driveCPath, (err, files) => {
    if (err) {
      return resp
        .status(500)
        .json({ error: `Error reading directory: ${err.message}` });
    }

    const sitFiles = files.filter(
      (file) => path.extname(file).toLowerCase() === ".sit"
    );

    if (sitFiles.length === 0) {
      return resp.status(404).json({ message: "No .SIT files found" });
    }

    const filePath = path.join(driveCPath, sitFiles[0]);

    fs.readFile(filePath, "utf8", (err, data) => {
      if (err) {
        return resp.status(500).json({ error: "Failed to read file" });
      }

      // Split and process lines
      const lines = data
        .trim()
        .split("\n")
        .filter((line) => line.trim() !== ""); // Remove empty lines

      // Start processing data from the 4th line
      const dataLines = lines.slice(2);

      const { headers } = formConfig;

      if (!headers || headers.length === 0) {
        return resp
          .status(500)
          .json({ error: "No headers defined in config." });
      }

      let currentHeaderIndex = 0;
      const rows = [];
      dataLines.forEach((line) => {
        const values = line.trim().split(/\s+/); // Split line into values
        const currentHeaders = headers[currentHeaderIndex] || [];
        const row = {};

        currentHeaders.forEach((header, index) => {
          row[header] = values[index] || null; // Assign value or null
        });

        rows.push(row);

        // Switch to the next header set if values align with the next set
        // if (values.length === currentHeaders.length) {
        currentHeaderIndex++;
        // }
      });

      resp.json({ data: rows, descriptions: formConfig.descriptions });
    });
  });
};

const updateSITFormData = (req, resp) => {
  const { formData } = req.body;
  if (!formData || !Array.isArray(formData)) {
    return resp
      .status(400)
      .json({ error: "Invalid or missing data in request body" });
  }

  const filePathFromEnv = getFilePath();

  if (!filePathFromEnv) {
    return resp.status(500).json({ error: "FilePath is not defined." });
  }

  const driveCPath = path.join(filePathFromEnv);

  fs.readdir(driveCPath, (err, files) => {
    if (err) {
      return resp
        .status(500)
        .json({ error: `Error reading directory: ${err.message}` });
    }

    const opcFiles = files.filter(
      (file) => path.extname(file).toLowerCase() === ".sit"
    );

    if (opcFiles.length === 0) {
      return resp.status(404).json({ message: "No .sit files found" });
    }

    const filePath = path.join(driveCPath, opcFiles[0]);
    fs.readFile(filePath, "utf8", (err, data) => {
      if (err) {
        return resp.status(500).json({ error: "Failed to read file" });
      }
      const lines = data.trim().split("\n");
      let formConfig = headersConfig["SITForm"];
      const { headers } = formConfig;

      // Function to update a line based on the original format
      const updateLine = (lineIndex, rowData) => {
        if (rowData) {
          const originalLine = lines[lineIndex];

          const values = originalLine.match(/\S+/g); // Split only by values (ignoring spaces)

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

      formData.forEach((line, index) => {
        // if (index > 1) {
        updateLine(index + 3, line); // First line (row1)
        // }
      });

      const updatedContent = lines.join("\n");
      // Write the updated content back to the file
      fs.writeFile(filePath, updatedContent, "utf8", (err) => {
        if (err) {
          return resp.status(500).json({ error: "Failed to update file" });
        }
        resp.json({ message: "Data updated successfully" });
      });
    });
  });
};

// const updateSITFileWithNewRows = (req, resp) => {
//   const { formData } = req.body;
// };
const updateOPCFileWithNewRows = (req, resp) => {
  const { formData } = req.body;

  if (!formData || !Array.isArray(formData)) {
    return resp
      .status(400)
      .json({ error: "Invalid or missing data in request body" });
  }

  const filePathFromEnv = getFilePath();

  if (!filePathFromEnv) {
    return resp.status(500).json({ error: "FilePath is not defined." });
  }

  const driveCPath = path.join(filePathFromEnv);

  fs.readdir(driveCPath, (err, files) => {
    if (err) {
      return resp
        .status(500)
        .json({ error: `Error reading directory: ${err.message}` });
    }

    const opcFiles = files.filter(
      (file) => path.extname(file).toLowerCase() === ".opc"
    );

    if (opcFiles.length === 0) {
      return resp.status(404).json({ message: "No .opc files found" });
    }

    const filePath = path.join(driveCPath, opcFiles[0]);

    fs.readFile(filePath, "utf8", (err, data) => {
      if (err) {
        return resp.status(500).json({ error: "Failed to read file" });
      }
      const lines = data.trim().split("\n");
      let formConfig = headersConfig["OPCForm"];
      const { headers } = formConfig;

      // Function to update a line based on the original format
      const updateLine = (lineIndex, rowData) => {
        if (rowData) {
          const originalLine = lines[lineIndex] || lines[4];

          const values = originalLine.match(/\S+/g); // Split only by values (ignoring spaces)

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

      formData.forEach((line, index) => {
        // if (index > 1) {
        updateLine(index + 2, line); // First line (row1)
        // }
      });
      const updatedContent = lines.join("\n");
      // Write the updated content back to the file
      fs.writeFile(filePath, updatedContent, "utf8", (err) => {
        if (err) {
          return resp.status(500).json({ error: "Failed to update file" });
        }
        resp.json({ message: "Data updated successfully" });
      });
    });
  });
};

const fetchSOLFormData = (req, resp) => {
  const formName = "SOLForm";

  let formConfig = headersConfig[formName];

  const filePathFromEnv = getFilePath();

  if (!filePathFromEnv) {
    return resp.status(500).json({ error: "FilePath is not defined." });
  }

  const driveCPath = path.join(filePathFromEnv);
  fs.readdir(driveCPath, (err, files) => {
    if (err) {
      return resp
        .status(500)
        .json({ error: `Error reading directory: ${err.message}` });
    }

    const opcFiles = files.filter(
      (file) => path.extname(file).toLowerCase() === ".sol"
    );

    if (opcFiles.length === 0) {
      return resp.status(404).json({ message: "No .Sol files found" });
    }

    const filePath = path.join(driveCPath, opcFiles[0]);

    fs.readFile(filePath, "utf8", (err, data) => {
      if (err) {
        return resp.status(500).json({ error: "Failed to read file" });
      }

      let lines = data
        .trim()
        .split("\n")
        .filter((line) => line.trim() !== ""); // Remove empty lines
      const { headers } = formConfig;

      if (!headers || headers.length === 0) {
        return resp
          .status(500)
          .json({ error: "No headers defined in config." });
      }
      // .slice(1)
      const rows = lines.slice(0, 3).map((line, index) => {
        // Use `slice(2)` to skip the first two rows
        const values = line.trim().split(/\s+/); // Split line into an array of values
        let obj = {};
        let actualHeaders;
        if (index == 0) {
          actualHeaders = headers[0];
        } else if (index == 1) {
          actualHeaders = headers[1];
        } else if (index == 2) {
          actualHeaders = headers[2];
        } else {
          actualHeaders = headers[3];
        }
        // Access the first set of headers
        // Map each header to its corresponding value
        actualHeaders.forEach((header, valueIndex) => {
          obj[header] = values[valueIndex] || null; // Use null if there's no corresponding value
        });

        return obj;
      });

      let mainData = {};

      const columns = lines.slice(3, 51).map((line, index) => {
        const values = line.trim().split(/\s+/); // Split line into an array of values
        const actualHeaders = headers[3]; // Ensure the headers array is properly defined
        const mainHeaders = headers[4]; // Ensure the headers array is properly defined

        // Map each header to its corresponding value
        actualHeaders.forEach((header, valueIndex) => {
          const value = values[valueIndex] || null; // Use null if there's no corresponding value
          if (value != null) {
            // Match any "ColumnN" pattern dynamically
            const match = header.match(/^Column(\d+)$/);
            if (match) {
              const columnNumber = match[1]; // Extract the column number from the header

              // Dynamically create the column object if it doesn't exist
              if (!mainData[`column${columnNumber}`]) {
                mainData[`column${columnNumber}`] = {};
              }

              // Assign the value to the corresponding column and header
              mainData[`column${columnNumber}`][
                mainHeaders[index] || `Column_${index}`
              ] = value;
            }
          }
        });
      });

      const transposedData = headers.map((col, colIndex) => {
        return lines.slice(1).map((row) => {
          const values = row.split(/\s+/); // Split the row by whitespace

          return values[colIndex] ? parseFloat(values[colIndex]) : null; // Get the value for the column
        });
      });

      transposedData.forEach((element) => {
        const actualHeaders = headers[3];
        let obj = {};

        actualHeaders.forEach((header, valueIndex) => {
          obj[header] = element[valueIndex] || null; // Use null if there's no corresponding value
        });
      });

      const combinedData = { rows, mainData };

      resp.json({
        data: combinedData,
        mainData,
        descriptions: formConfig.descriptions,
      });
    });
  });
};

const updateSOLFormData = (req, resp) => {
  const { formData, formMainData } = req.body;
  if (!formData || !Array.isArray(formData)) {
    return resp
      .status(400)
      .json({ error: "Invalid or missing data in request body" });
  }

  const filePathFromEnv = getFilePath();

  if (!filePathFromEnv) {
    return resp.status(500).json({ error: "FilePath is not defined." });
  }

  const driveCPath = path.join(filePathFromEnv);

  fs.readdir(driveCPath, (err, files) => {
    if (err) {
      return resp
        .status(500)
        .json({ error: `Error reading directory: ${err.message}` });
    }

    const opcFiles = files.filter(
      (file) => path.extname(file).toLowerCase() === ".sol"
    );

    if (opcFiles.length === 0) {
      return resp.status(404).json({ message: "No .sol files found" });
    }

    const filePath = path.join(driveCPath, opcFiles[0]);

    fs.readFile(filePath, "utf8", (err, data) => {
      if (err) {
        return resp.status(500).json({ error: "Failed to read file" });
      }
      const lines = data.trim().split("\n");
      let formConfig = headersConfig["SOLForm"];
      const { headers } = formConfig;

      // Function to update a line based on the original format
      const updateLine = (lineIndex, rowData) => {
        if (rowData) {
          // console.log(rowData[6]);

          // const originalLine = lines[lineIndex];
          const originalLine = lines[lineIndex] || lines[2];

          const values = originalLine.match(/\S+/g); // Split only by values (ignoring spaces)

          let valueIndex = 0;
          Object.keys(rowData).forEach((key) => {
            // Check if value exists in the original line before updating
            if (values[valueIndex]) {
              values[valueIndex] = rowData[key]; // Update the value
            } else {
              const originalLine = lines[2];

              const values = originalLine.match(/\S+/g); // Spl
              console.log(values[valueIndex], rowData[key]);

              values[valueIndex] = rowData[key]; // Update the value

              // console.log(valueIndex);
            }

            valueIndex++; // Move to the next value position
          });

          // Recreate the line by keeping the same format and length
          lines[lineIndex] = originalLine.replace(/\S+/g, (match, i) => {
            return values.shift(); // Replace with updated values
          });
        }
      };

      formData.forEach((line, index) => {
        // if (index > 1) {
        updateLine(index, line); // First line (row1)
        // }
      });

      const dataArray = Object.values(formMainData);
      // console.log(dataArray);
      // console.log(dataArray);

      // Output the result

      const combinedResult = dataArray.reduce((accumulator, dataObject) => {
        Object.entries(dataObject).forEach(([key, value]) => {
          if (!accumulator[key]) {
            // Initialize the key with an array
            accumulator[key] = [];
          }
          // Push the value to the corresponding key's array
          accumulator[key].push(value || "0.00");
        });
        return accumulator;
      }, {});
      const dataArray2 = Object.values(combinedResult);

      const convertedObjects = dataArray2.map((arr) => {
        // Convert each array to an object with numeric properties based on index
        return arr.reduce((acc, value, index) => {
          acc[index] = value;
          return acc;
        }, {});
      });

      if (convertedObjects && Array.isArray(convertedObjects)) {
        convertedObjects.forEach((line, index) => {
          updateLine(index + 3, line);
        });
      } else {
        console.error("Invalid formData structure.");
      }

      const updatedContent = lines.join("\n");
      // console.log(updatedContent);

      fs.writeFile(filePath, updatedContent, "utf8", (err) => {
        if (err) {
          return resp.status(500).json({ error: "Failed to update file" });
        }
        resp.json({ message: "Data updated successfully" });
      });
    });
  });
};

const checking = (req, resp) => {
  // Mock keys array
  const keys = [
    "Z",
    "BD",
    "U",
    "FC",
    "SAN",
    "SIL",
    "WON",
    "PH",
    "SMB",
    "WOC",
    "CAC",
    "CEC",
    "ROK",
    "CNDS",
    "PKRZ",
    "RSD",
    "BDD",
    "PSP",
    "SATC",
    "HCL",
    "WP",
    "EXCK",
    "ECND",
    "STFR",
    "ST",
    "WLS",
    "WLM",
    "WLSL",
    "WLSC",
    "WLMC",
    "WLSLC",
    "WLSLNC",
    "WBMC",
    "WHSC",
    "WHPC",
    "WLSN",
    "WLMN",
    "WBMN",
    "WHSN",
    "WHPN",
    "FE26",
    "SULF",
    "ASHZ",
    "CGO2",
    "CGCO2",
    "CGN2O",
  ];

  // API endpoint
  try {
    // Read the file
    const filePathFromEnv = getFilePath();

    // Ensure the file path is defined
    if (!filePathFromEnv) {
      return resp.status(500).json({ error: "FilePath is not defined." });
    }
    const driveCPath = path.join(filePathFromEnv);
    const filePath = path.join(driveCPath, "umstead.sol");

    // Read the file
    const data = fs.readFileSync(filePath, "utf-8");

    // Split data into lines and filter out empty lines
    const lines = data.split("\n").filter((line) => line.trim() !== "");

    // Parse values and group into JSON
    const jsonResponse = [];
    let currentKeyIndex = 0;

    for (let i = 0; i < lines.length; i++) {
      const values = lines[i]
        .trim()
        .split(/\s+/)
        .map((value) => (!isNaN(value) ? parseFloat(value) : value));

      const groupedValues = [];
      while (values.length > 0) {
        groupedValues.push(values.splice(0, 6)); // Group in sets of 6
      }

      groupedValues.forEach((group) => {
        if (currentKeyIndex < keys.length) {
          jsonResponse.push({ [keys[currentKeyIndex]]: group });
          currentKeyIndex++;
        }
      });
    }

    // Send JSON response
    resp.status(200).json({
      data: jsonResponse,
    });
  } catch (error) {
    console.error(error);
    resp.status(500).json({ error: "Failed to process the .dat file" });
  }
};

export {
  checking,
  fetchOPCFormData,
  updateOPCFormData,
  updateOPCFileWithNewRows,
  fetchSITFormData,
  updateSITFormData,
  fetchSOLFormData,
  updateSOLFormData,
};
