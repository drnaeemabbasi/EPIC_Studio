import inquirer from "inquirer";
import shell from "shelljs";
import path from "path";
import fs from "fs";

async function setup() {
  const answers = await inquirer.prompt([
    {
      type: "input",
      name: "installDir",
      message: "Enter the installation directory:",
      default: process.cwd(),
      validate: (input) => fs.existsSync(input) || "Directory does not exist!",
    },
  ]);

  const installDir = path.resolve(answers.installDir);
  console.log(`Installing in: ${installDir}`);

  // Frontend setup
  const frontendPath = path.join(installDir, "front-end");
  if (!fs.existsSync(path.join(frontendPath, "node_modules"))) {
    console.log("Installing frontend dependencies...");
    shell.cd(frontendPath);
    shell.exec("npm install");
  }
  shell.exec('start cmd /k "npm start"');

  // Backend setup
  const backendPath = path.join(installDir, "backend");
  if (!fs.existsSync(path.join(backendPath, "node_modules"))) {
    console.log("Installing backend dependencies...");
    shell.cd(backendPath);
    shell.exec("npm install");
  }
  shell.exec('start cmd /k "npm run dev"');

  console.log("Setup completed successfully!");
}

setup().catch((err) => console.error(err));
