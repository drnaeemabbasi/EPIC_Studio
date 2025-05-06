import express from "express";
import bodyParser from "body-parser";
import fs from "fs";
import path from "path";
import cors from "cors";
import { exec } from "child_process";
// import { setFilePath } from "./utils/filePath.js";
// const { exec } = require("child_process");
import os from "os";
// import { sequelize } from "./database/connectDB.js";
import { RegistrationRouter } from "./routers/registration.router.js";
import { getTextFileDataRouter } from "./routers/getTextFileData.router.js";

import { epicRunFileRouter } from "./routers/epicFiles.router.js";
// import { epicAllFilesRouters } from "./routers/epicFiles.router.js";
import { epicAllFilesRouters } from "./routers/epicAllFiles.router.js"; // Import router
import { basicRoutes } from "./routers/basic.router.js";
import { OPCFormsRouter } from "./routers/OPCForms.router.js";

import { filesRouters } from "./routers/Files.router.js";
import { setFilePath,getFilePath } from "./utils/filePath.js";
const app = express();

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
const executableDir = getFilePath();

const executablePath = path.join(executableDir, "epic1102.exe");

app.get("/run-epic", (req, res) => {
  // Construct the command to execute the EXE with the folder path
  const executableDir = getFilePath();

  const command = `cd "${executableDir}" && .\\epic1102.exe`;

  exec(command, (error, stdout, stderr) => {
    console.log(command);

    if (error) {
      console.error(`Execution Error: ${error.message}`);
      return res.status(500).json({ error: error.message });
    }

    if (stderr) {
      console.error(`Standard Error: ${stderr}`);
      return res.status(500).json({ error: stderr });
    }

    console.log(stdout); // Log the raw output for debugging

    // Parse the raw output to a structured object
    const parsedOutput = parseEpicOutput(stdout);
    console.log(parsedOutput);
    // Send the parsed object back to the client
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

app.use("/registration", RegistrationRouter);
app.use("/getTextFileData", getTextFileDataRouter);
app.use("/epicRunFileRouter", epicRunFileRouter);
// app.use("/epicAllFilesRouters", epicAllFilesRouters);
app.use("/epicAllFilesRouters", epicAllFilesRouters);
app.use("/basicRoutes", basicRoutes);
app.use("/databseFiles", OPCFormsRouter);
app.use("/files", filesRouters);

app.post("/pickFolder", (req, res) => {
  const { folderPath } = req.body;
  console.log(folderPath);

  setFilePath(folderPath);
  res.send({ message: 'File path set!' });

});

app.post("/submit", async (req, res) => {
  const { name, email, age } = req.body;
  // C:\Program Files
  try {
    // Save to database
    // const user = await User.create({ name, email, age });
    const driveCPath = path.join("C:", "Teals");
    // Check if the folder exists, if not create it
    if (!fs.existsSync(driveCPath)) {
      fs.mkdirSync(driveCPath);
    }

    const filePath = path.join(driveCPath, "form_data.txt");

    const fileData = `${name.padEnd(5, " ")} ${email.padEnd(5, " ")} ${age
      .toString()
      .padEnd(5, " ")}\n`;

    // Write to the text file
    fs.appendFileSync(filePath, fileData);

    res.send('Form submitted and data saved in the "Teals" folder in Drive C!');
    // Get path to Downloads folder
    // const downloadsPath = path.join(os.homedir(), "Downloads", "form_data.txt");

    // // Create text file with columns in Downloads folder
    // const fileData = `${name.padEnd(5, " ")} ${email.padEnd(5, " ")} ${age
    //   .toString()
    //   .padEnd(5, " ")}\n`;
    // fs.appendFileSync(downloadsPath, fileData);

    // res.send("Form submitted and data saved in the Downloads folder!");
  } catch (error) {
    console.error(error);
    res.send("Error occurred!");
  }
});

// Handle form submission
app.post("/submit_code_folder", async (req, res) => {
  const { name, email, age } = req.body;

  try {
    // Save to database
    const user = await User.create({ name, email, age });

    // Create text file with columns
    const fileData = `${name.padEnd(20, " ")} ${email.padEnd(30, " ")} ${age
      .toString()
      .padEnd(5, " ")}\n`;
    fs.appendFileSync("form_data.txt", fileData);

    res.send("Form submitted and data saved!");
  } catch (error) {
    console.error(error);
    res.send("Error occurred!");
  }
});

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
