import Sequelize from "sequelize"; // Import Sequelize
import { Users } from "../models/users.models.js";
import bcrypt from "bcrypt";
import fs from "fs";
import path from "path";
import os from "os";
import { issueJWT } from "../services/auth.services.js";

const RegregistrationUser = async (req, resp) => {
  //   console.log(Users);
  try {
    const { name, email, password, age } = req.body;

    const finduser = await Users.findOne({ where: { email } });

    if (finduser) {
      console.log("this email is already registered");

      return resp.json({ err: "Email already exists" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await Users.create({
      email,
      name,
      password: hashedPassword,
      age,
    });
    // C:\Program Files
    if (user) {
      try {
        const tokenPayload = {
          id: user.id,
          name: user.name,
          email: user.email,
          age: user.age,
        };
        const token = issueJWT(tokenPayload);
        // const newFolderName = email.replace("@gmail.com", "") + user.id;

        // const driveCPath = path.join("C:", "Teals Soft", newFolderName);
        // console.log(os.homedir(), driveCPath);
        // if (!fs.existsSync(driveCPath)) {
        //   fs.mkdirSync(driveCPath, { recursive: true });
        // }
        // const filePath = path.join(driveCPath, "1st_form_data.txt");

        // const fileData = `${name.padEnd(5, " ")} ${email.padEnd(5, " ")} ${age
        //   .toString()
        //   .padEnd(5, " ")}\n`;

        // // Write to the text file
        // fs.appendFileSync(filePath, fileData);

        resp.status(200).json({
          message: "user is registred",
          token,
          user: tokenPayload,
        });
        // const downloadsPath = path.join(
        //   os.homedir(),
        //   "Downloads",
        //   "form_data.txt"
        // );

        // const driveCPath = path.join(
        //   "C:",
        //   "Program Files",
        //   newFolderName,
        //   "Teals Soft"
        // );
        // if (!fs.existsSync(driveCPath)) {
        //   fs.mkdirSync(driveCPath, { recursive: true });
        // }
        // const driveCPath = path.join("C:", "Program Files", "Teals Soft");
        // if (!fs.existsSync(driveCPath)) {
        //   fs.mkdirSync(driveCPath);
        // }
        // if (!fs.existsSync(driveCPath)) {
        //   fs.mkdirSync(driveCPath, { recursive: true });
        // }
        // C:\Program Files
        // const newFolderName = email.replace("@gmail.com", "") + user.id;
        // const subFolderPath = path.join(driveCPath, newFolderName);

        // if (!fs.existsSync(subFolderPath)) {
        //   fs.mkdirSync(subFolderPath);
        // }

        console.log("user is registred", user.name);
        // resp.json({ message: "user is registred" });

        // const filePath = path.join(driveCPath, "teal record.txt");
      } catch (error) {
        console.log("Internal server Error", error);
        resp.json({ message: "user is registred" });
      }

      // return resp.json({ facing_err: "Email already exists" });
    }
  } catch (error) {
    console.log("Internal server Error", error);
    resp.json({ err: "Internal server Error", error });
  }
};

export { RegregistrationUser };
