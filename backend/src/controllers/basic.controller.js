import fs from "fs";
import path from "path";
import { getFilePath } from "../utils/filePath.js";


const reNameFile = (req, resp) => {
  console.log(req.body);
  const { oldFileName, newName } = req.body;

  if (!oldFileName || !newName) {
    return resp
      .status(400)
      .json({ error: "Both oldFileName and newName are required." });
  }
  const filePathFromEnv = getFilePath();


  if (!filePathFromEnv) {
    return resp.status(500).json({ error: "FilePath is not defined." });
  }

  const driveCPath = path.join(filePathFromEnv);

  const fileExtensions = [".sit", ".opc", ".sol"];
  let renameErrors = [];

  fileExtensions.forEach((ext) => {
    const oldFilePath = path.join(driveCPath, `${oldFileName}${ext}`);
    const newFilePath = path.join(driveCPath, `${newName}${ext}`);

    try {
      if (fs.existsSync(oldFilePath)) {
        fs.renameSync(oldFilePath, newFilePath);
        console.log(`File renamed from ${oldFilePath} to ${newFilePath}`);
      } else {
        renameErrors.push(`File ${oldFilePath} does not exist.`);
      }
    } catch (err) {
      renameErrors.push(
        `Error renaming ${oldFilePath} to ${newFilePath}: ${err.message}`
      );
    }
  });

  if (renameErrors.length > 0) {
    return resp.status(500).json({ errors: renameErrors });
  }

  resp.json({
    success: `Files renamed successfully from ${oldFileName} to ${newName}`,
  });
};

const fetchFileNames = (req, resp) => {
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

    // Filter files with .opc extension and remove the extension from the names
    const oldFileNames = files
      .filter((file) => path.extname(file).toLowerCase() === ".opc")
      .map((file) => path.basename(file, ".opc")); // Remove the .opc extension

    if (oldFileNames.length === 0) {
      return resp.status(404).json({ message: "No .opc files found" });
    }

    resp.json({ oldFileNames });
  });
};

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

  const driveCPath = path.join(
    "C:",
    "Teals Soft",
    "epic1102_example_files_20221002"
  );
  const filePath = path.join(driveCPath, `${formName}.dat`);

  // Define field widths based on the example data
  const fieldWidths = [5, 20, 10, 12, 12, 30]; // Adjust widths based on actual data format

  // Read existing data from the file
  fs.readFile(filePath, "utf8", (err, data) => {
    if (err) {
      console.error(Error`reading file ${formName}.dat:`, err);
      return resp
        .status(500)
        .json({ error: `Failed to read ${formName}.dat file` });
    }

    const lines = data.split("\n");

    const line = lines[0];
    console.log(line);
    const spaceGroups = (line.match(/ +/g) || []).map((group) => group.length);
    // Validate and construct new rows
    console.log(spaceGroups);

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
          return String(value).trim().padEnd(spaceGroups[index]); // Pad to the column width
        })
        .join(" "); // Join fields with a space

      // Append the new row to the lines
      lines.push(newRow);
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
// app.get("/renameFiles", (req, res) => {});
export { reNameFile, fetchFileNames };
