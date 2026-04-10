import express from "express";
import bodyParser from "body-parser";
import fs from "fs";
import path from "path";
import cors from "cors";
import { execFile } from "child_process";
// import { setFilePath } from "./utils/filePath.js";
// const { exec } = require("child_process");
import os from "os";
// import { sequelize } from "./database/connectDB.js";
// import { RegistrationRouter } from "./routers/registration.router.js";
// import { getTextFileDataRouter } from "./routers/getTextFileData.router.js";

import { epicRunFileRouter } from "./routers/epicFiles.router.js";
// import { epicAllFilesRouters } from "./routers/epicFiles.router.js";
import { epicAllFilesRouters } from "./routers/epicAllFiles.router.js"; // Import router
import { basicRoutes } from "./routers/basic.router.js";
import { OPCFormsRouter } from "./routers/OPCForms.router.js";
import { loadModelDefinition, getModelForFile } from "./services/modelDefinition.service.js";


import { filesRouters } from "./routers/Files.router.js";
import epicDescriptionsRouter from "./routers/epicDescriptions.router.js";
import { setFilePath,getFilePath } from "./utils/filePath.js";
const app = express();

app.use((req, res, next) => {
  console.log(`${req.method} ${req.url}`);
  next();
});

const port = process.env.PORT || 3000;
// // sequelize.sync({ force: true });
// app.use(bodyParser.json());
// app.get("/", (req, res) => {
//   res.send("Hello, World!");
// });
// Set a higher limit for JSON payloads
app.use(bodyParser.json({ limit: "10mb" })); // Adjust '10mb' as needed
app.use(bodyParser.urlencoded({ limit: "10mb", extended: true }));
if (process.env.NODE_ENV === "development") {
  console.table([
    ["PORT", process.env.PORT],
    ["FilePath", process.env.FILE_PATH],

    
  ]);
}
console.log(process.env.PORT);

if (process.env.NODE_ENV === "development") {
  const corsOptions = {
    // origin: "http://localhost:3000",
    origin: "*",

    methods: ["GET", "POST", "PUT", "DELETE"],
  };
  app.use(cors(corsOptions));
}
// getTextFileDataRouter;
// Define the directory and executable paths
app.get("/run-epic", (req, res) => {
  const executableDir = getFilePath();
  if (!executableDir) {
    return res
      .status(400)
      .json({ error: "Executable folder path is not configured." });
  }

  const executablePath = path.join(executableDir, "epic1102.exe");
  if (!fs.existsSync(executablePath)) {
    return res
      .status(404)
      .json({ error: `Executable not found at ${executablePath}` });
  }

  console.log(`[backend] Running EPIC executable: ${executablePath}`);

  execFile(executablePath, { cwd: executableDir, timeout: 10 * 60 * 1000 }, (error, stdout, stderr) => {
    if (error) {
      console.error(`[backend] Execution Error: ${error.message}`);
      return res.status(500).json({ error: error.message });
    }

    if (stderr) {
      console.warn(`[backend] Executable stderr: ${stderr}`);
    }

    console.log(stdout); // Log the raw output for debugging
    const parsedOutput = parseEpicOutput(stdout);
    res.json({ output: parsedOutput });
  });
});

// Helper function to parse the output
const parseEpicOutput = (output) => {
  const yearPattern = /YEAR\s+(\d+)\s+OF\s+(\d+)/g;
  const totalRunTimePattern = /TOTAL RUN TIME:\s+(\d+):\s+(\d+):\s+(\d+)/;

  const years = [];
  let match;

  // Extract year data
  while ((match = yearPattern.exec(output)) !== null) {
    years.push({
      year: parseInt(match[1]),
      totalYears: parseInt(match[2]),
    });
  }

  // Extract total run time
  const totalRunTimeMatch = totalRunTimePattern.exec(output);
  let totalRunTime = {};
  if (totalRunTimeMatch) {
    totalRunTime = {
      hours: parseInt(totalRunTimeMatch[1]),
      minutes: parseInt(totalRunTimeMatch[2]),
      seconds: parseInt(totalRunTimeMatch[3]),
    };
  }

  // Construct the object to send back
  return {
    years,
    totalRunTime,
  };
};

// app.use("/registration", RegistrationRouter);
// app.use("/getTextFileData", getTextFileDataRouter);
app.use("/epicRunFileRouter", epicRunFileRouter);
// app.use("/epicAllFilesRouters", epicAllFilesRouters);
app.use("/epicAllFilesRouters", epicAllFilesRouters);
app.use("/basicRoutes", basicRoutes);
app.use("/databaseFiles", OPCFormsRouter);
app.use("/files", filesRouters);
app.use("/api/descriptions", epicDescriptionsRouter);

// Model Metadata API
app.get("/api/model/columns/:filename", async (req, res) => {
  try {
    const { filename } = req.params;
    const model = await getModelForFile(filename);
    if (!model) {
      return res.status(404).json({ error: `Model for ${filename} not found.` });
    }
    res.json(model);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});


app.post("/pickFolder", (req, res) => {
  const { folderPath } = req.body;

  if (!folderPath || typeof folderPath !== "string") {
    return res.status(400).json({ error: "A valid folderPath is required." });
  }

  const resolvedPath = path.resolve(folderPath);
  if (!fs.existsSync(resolvedPath) || !fs.statSync(resolvedPath).isDirectory()) {
    return res.status(400).json({ error: `Folder does not exist or is not a directory: ${resolvedPath}` });
  }

  setFilePath(resolvedPath);
  console.log(`[backend] Model folder set to: ${resolvedPath}`);
  res.json({ message: "File path set!", folderPath: resolvedPath });
});

app.get("/folder-path", (req, res) => {
  const currentFolder = getFilePath();
  res.json({ folderPath: currentFolder || null });
});

app.use((req, res) => {
  res.status(404).json({ error: "Endpoint not found" });
});

app.use((err, req, res, next) => {
  console.error("[backend] Unhandled error:", err);
  res.status(500).json({ error: "Internal server error" });
});

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
