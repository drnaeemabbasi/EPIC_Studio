import fs from "fs";
import path from "path";
import { headers as headersConfig } from "../model/main.model.js";
import { getFilePath } from "../utils/filePath.js";

const getEpicRunFile = (req, resp) => {
  const filePathFromEnv = getFilePath();

  if (!filePathFromEnv) {
    return resp.status(500).json({ error: "FilePath is not defined." });
  }

  const driveCPath = path.join(filePathFromEnv);

  const filePath = path.join(driveCPath, "EPICRUN.dat");

  fs.readFile(filePath, "utf8", (err, data) => {
    if (err) {
      return resp.status(500).json({ error: "Failed to read file" });
    }

    // Split the file into lines
    const lines = data.trim().split("\n");
    // Use the second line as the headers
    const headers = [
      "ASTN",
      "ISIT",
      "IWP1",
      "IWP5",
      "IWND",
      "INPS",
      "IOPS",
      "IWTH",
    ];

    // Process each subsequent line as data (starting from the first data line)
    const rows = lines.slice(0, 1).map((line, index) => {
      const values = line.trim().split(/\s+/);

      let obj = { id: index + 1 }; // Add an ID field for each row

      headers.forEach((header, valueIndex) => {
        obj[header] = values[valueIndex] || null; // Use null if there's no corresponding value
      });

      return obj;
    });
    resp.json(rows[0]);
  });
};

const updateEpicRunFile = (req, resp) => {
  const updates = req.body; // Destructure updates from the request body

  // Check if updates is an array and has values
  if (!updates || updates.length === 0) {
    return resp
      .status(400)
      .json({ error: "Invalid or missing 'updates' array in request body" });
  }

  const filePathFromEnv = getFilePath();

  if (!filePathFromEnv) {
    return resp.status(500).json({ error: "FilePath is not defined." });
  }

  const driveCPath = path.join(filePathFromEnv);

  const filePath = path.join(driveCPath, "EPICRUN.dat");

  fs.readFile(filePath, "utf8", (err, data) => {
    if (err) {
      return resp.status(500).json({ error: "Failed to read file" });
    }

    // Split the file into lines
    const lines = data.trim().split("\n");

    // Use the headers for the first line update
    const headers = [
      "ASTN",
      "ISIT",
      "IWP1",
      "IWP5",
      "IWND",
      "INPS",
      "IOPS",
      "IWTH",
    ];

    // Find the update for the first line (assuming the first line is what you want to update)
    const update = updates; // We expect only the first line update here
    if (update) {
      // Update the first line using the headers and provided update data
      const updatedFirstLine = headers
        .map((header) => update[header] || "")
        .join("    ");

      // Replace the first line with the updated one
      lines[0] = updatedFirstLine;
    }

    // Write the updated content back to the file
    const updatedContent = lines.join("\n");

    fs.writeFile(filePath, updatedContent, "utf8", (err) => {
      if (err) {
        return resp.status(500).json({ error: "Failed to update file" });
      }
      resp.json({ message: "Data updated successfully" });
    });
  });
};

const getEpicCount = (req, resp) => {
  const { formName } = req.query;
  let formConfig = headersConfig[formName];

  const filePathFromEnv = getFilePath();

  if (!filePathFromEnv) {
    return resp.status(500).json({ error: "FilePath is not defined." });
  }

  const driveCPath = path.join(filePathFromEnv);

  const filePath = path.join(driveCPath, "EPICCONT.dat");

  // Define the headers for each line
  const headers = {
    line1: [
      "NBYR",
      "IYR0",
      "IMO0",
      "SOLS",
      "SOLO",
      "ISW",
      "IOPS",
      "IGMX",
      "MASP",
      "LBP",
      "IRRS",
      "NVCN",
      "INFL0",
      "LBP2",
      "PHU",
      "SRG",
      "COIR",
      "COL",
      "FULP",
      "NSTP",
    ],
    line2: [
      "IGMX",
      "IERT",
      "ICG",
      "LMS",
      "ICF",
      "ISW",
      "IRW",
      "ICO2",
      "NTV",
      "ICOR",
      "IDN",
      "NUPC",
      "IOX",
      "IDI0",
      "ISAT",
      "IAZM",
      "IPAT",
      "IEVI",
      "IPRK",
      "ICP",
      "ISLT",
    ],
    line3: [
      "RFN0",
      "CO20",
      "CNO30",
      "CSLT",
      "PSTX",
      "YWI",
      "BTA",
      "EXPK",
      "FL",
      "FW",
    ],
    line4: [
      "ANG0",
      "STD0",
      "UXP",
      "DIAM",
      "ACW",
      "BIR",
      "EFI",
      "VIMX",
      "ARMN",
      "ARMX",
    ],
    line5: [
      "BFT0",
      "FNP",
      "FMX",
      "DRT",
      "FDS0",
      "PEC0",
      "VLGN",
      "COWW",
      "DDLG",
      "SOLQ",
    ],
    line6: ["GZLM", "FFED", "DZ", "DRV", "RST0", "STF0"],
    line7: ["COIR", "COL", "FULP", "WAGE", "CSTZ1", "CSTZ2"],
  };

  // Utility function to process each line based on its headers
  const processLine = (line, headers) => {
    const values = line.trim().split(/\s+/);
    return headers.reduce((obj, header, index) => {
      obj[header] = values[index] || null;
      return obj;
    }, {});
  };

  // Utility function to read the file
  const readEpicFile = (filePath, callback) => {
    fs.readFile(filePath, "utf8", (err, data) => {
      if (err) {
        return callback(new Error("Failed to read file"), null);
      }

      const lines = data.trim().split("\n");

      // Ensure the file contains at least 7 lines
      if (lines.length < 7) {
        return callback(new Error("File does not contain enough lines"), null);
      }

      callback(null, lines);
    });
  };

  // Main controller function
  readEpicFile(filePath, (err, lines) => {
    if (err) {
      return resp.status(500).json({ error: err.message });
    }

    // Process each line and map it to corresponding headers
    const row1 = processLine(lines[0], headers.line1);
    const row2 = processLine(lines[1], headers.line2);
    const row3 = processLine(lines[2], headers.line3);
    const row4 = processLine(lines[3], headers.line4);
    const row5 = processLine(lines[4], headers.line5);
    const row6 = processLine(lines[5], headers.line6);
    const row7 = processLine(lines[6], headers.line7);
    // Send the response with all rows
    resp.json({
      row1,
      row2,
      row3,
      row4,
      row5,
      row6,
      row7,
      descriptions: formConfig.descriptions,
    });
  });
};

const updateEpicContFile = (req, resp) => {
  const updates = req.body; // Destructure updates from the request body
  // Validate the request body to ensure rows exist
  if (!updates || typeof updates !== "object") {
    return resp
      .status(400)
      .json({ error: "Invalid or missing updates in request body" });
  }

  const filePathFromEnv = getFilePath();

  if (!filePathFromEnv) {
    return resp.status(500).json({ error: "FilePath is not defined." });
  }

  const driveCPath = path.join(filePathFromEnv);

  const filePath = path.join(driveCPath, "EPICCONT.dat");

  // Read the file content
  fs.readFile(filePath, "utf8", (err, data) => {
    if (err) {
      return resp
        .status(500)
        .json({ error: "Failed to read EPICCONT.dat file" });
    }

    // Split the file content into lines, without trimming spaces
    const lines = data.split("\n");

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

    // Update the lines for each row
    updateLine(0, updates.row1); // First line (row1)
    updateLine(1, updates.row2); // Second line (row2)
    updateLine(2, updates.row3); // Third line (row3)
    updateLine(3, updates.row4); // Fourth line (row4)
    updateLine(4, updates.row5); // Fifth line (row5)
    updateLine(5, updates.row6); // Sixth line (row6)
    updateLine(6, updates.row7); // Seventh line (row7)

    // Join the updated lines back into file content, preserving the original structure
    const updatedContent = lines.join("\n");

    // Write the updated content back to the file
    fs.writeFile(filePath, updatedContent, "utf8", (err) => {
      if (err) {
        return resp.status(500).json({ error: "Failed to update file" });
      }
      resp.json({ message: "Data updated successfully" });
    });
  });
};

const getParm1102Data = (req, resp) => {
  const { formName } = req.query;

  const filePathFromEnv = getFilePath();

  if (!filePathFromEnv) {
    return resp.status(500).json({ error: "FilePath is not defined." });
  }

  const driveCPath = path.join(filePathFromEnv);

  const filePath = path.join(driveCPath, "PARM1102.dat");

  let formConfig = headersConfig[formName];
  let { headers } = formConfig;

  // Utility function to process each line based on its headers
  const processLine = (line, headers) => {
    const values = line.trim().split(/\s+/);
    return headers.reduce((obj, header, index) => {
      obj[header] = values[index] || null;
      return obj;
    }, {});
  };

  // Read and process the file
  fs.readFile(filePath, "utf8", (err, data) => {
    if (err) {
      return resp
        .status(500)
        .json({ error: "Failed to read PARM1102.dat file" });
    }

    const lines = data.trim().split("\n");

    // Process each line according to the headers
    const processedData = headers.map((headerSet, idx) => {
      if (lines[idx]) {
        return processLine(lines[idx], headerSet);
      }
      return null; // If the line does not exist
    });

    // Send the processed data as a response
    resp.json({
      data: processedData,
      descriptions: formConfig.descriptions,
    });
  });
};

const updatePARM1102Data = (req, resp) => {
  const newRows = req.body;

  if (!newRows || Object.keys(newRows).length === 0) {
    return resp
      .status(400)
      .json({ error: "Invalid or missing data in request body" });
  }

  const filePathFromEnv = getFilePath();

  if (!filePathFromEnv) {
    return resp.status(500).json({ error: "FilePath is not defined." });
  }

  const driveCPath = path.join(filePathFromEnv);

  const filePath = path.join(driveCPath, "PARM1102.dat");

  // Read the current content of PARM1102.dat
  fs.readFile(filePath, "utf8", (err, data) => {
    if (err) {
      return resp.status(500).json({ error: "Failed to read file" });
    }

    // Split existing file data into lines
    let lines = data.trim().split("\n");

    // Update specific line based on rowData
    const updateLine = (lineIndex, rowData) => {
      if (rowData) {
        const originalLine = lines[lineIndex];
        const values = originalLine.match(/\S+/g); // Capture words separated by whitespace

        if (!values) return; // Skip if the line has no values

        Object.keys(rowData).forEach((key, idx) => {
          // Ensure the position exists and the new value is not null or undefined
          if (
            values[idx] !== undefined &&
            rowData[key] !== null &&
            rowData[key] !== undefined
          ) {
            values[idx] = rowData[key];
          }
        });

        // Recreate the line with original spaces intact by using the original line's format
        let currentIndex = 0;
        lines[lineIndex] = originalLine.replace(
          /\S+/g,
          () => values[currentIndex++]
        );
      }
    };

    // Iterate over each new row to update corresponding line
    Object.keys(newRows).forEach((rowKey, index) => {
      const rowData = newRows[rowKey];
      if (index < lines.length) {
        // Ensure index is within bounds of lines array
        updateLine(index, rowData);
      }
    });

    // Join updated lines into a single string for writing
    const updatedContent = lines.join("\n");

    // Write the updated content back to PARM1102.dat
    fs.writeFile(filePath, updatedContent, "utf8", (err) => {
      if (err) {
        return resp.status(500).json({ error: "Failed to update file" });
      }
      resp.json({ message: "PARM1102 data updated successfully" });
    });
  });
};

export {
  getEpicRunFile,
  updateEpicRunFile,
  getEpicCount,
  updateEpicContFile,
  getParm1102Data,
  updatePARM1102Data,
};
