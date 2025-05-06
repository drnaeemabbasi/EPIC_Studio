import fs from "fs";
import path from "path";
import { getFilePath } from "../utils/filePath.js";

const fetchFiles = (req, resp) => {
  const { fileFormat } = req.params;
  console.log(fileFormat);
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
      (file) => path.extname(file).toLowerCase() === `.${fileFormat}`
    );

    if (opcFiles.length === 0) {
      return resp.status(404).json({ message: "No .opc files found" });
    }

    const filePath = path.join(driveCPath, opcFiles[0]);

    fs.readFile(filePath, "utf8", (err, data) => {
      if (err) {
        return resp.status(500).json({ error: "Failed to read file" });
      }

      return resp.status(200).json(data);
    });

    console.log(filePath);
  });
};

const updateFiles = (req, resp) => {
  const { content, fileFormat } = req.body;
  console.log("fileFormat", fileFormat);
  console.log("content", content);

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
      (file) => path.extname(file).toLowerCase() === `.${fileFormat}`
    );

    if (opcFiles.length === 0) {
      return resp.status(404).json({ message: "No .opc files found" });
    }
    const filePath = path.join(driveCPath, opcFiles[0]);
    console.log(filePath);
    fs.writeFile(filePath, content, "utf8", (err) => {
      if (err) {
        return resp
          .status(500)
          .json({ error: `Failed to update file ${fileFormat}` });
      }
      resp.json({ message: "Data updated successfully" });
    });
  });
};

export { fetchFiles, updateFiles };
