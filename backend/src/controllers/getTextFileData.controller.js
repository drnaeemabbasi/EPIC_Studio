import { Users } from "../models/users.models.js";
import fs from "fs";
import path from "path";
import os from "os";

// API to add a new row to the text file
const addTextFileRow = async (req, resp) => {
  let userid = req.params.userid;
  const newRow = req.body.newRow; // The new row to add

  if (!newRow) {
    return resp
      .status(400)
      .json({ error: "Invalid or missing 'newRow' in request body" });
  }

  if (userid.startsWith(":")) {
    userid = userid.substring(1); // Remove the first character (the colon)
  }

  const user = await Users.findOne({ where: { id: userid } });
  if (user) {
    const folderName = user.email.replace("@gmail.com", "") + user.id;

    const driveCPath = path.join("C:", "Teals Soft", folderName);
    const filePath = path.join(driveCPath, "1st_form_data.txt");

    fs.readFile(filePath, "utf8", (err, data) => {
      if (err) {
        return resp.status(500).json({ error: "Failed to read file" });
      }

      const lines = data.trim().split("\n");
      const headers = lines[0].split(/\s+/);

      // Validate if newRow contains the required fields (same as headers)
      const missingFields = headers.filter((header) => !(header in newRow));
      if (missingFields.length > 0) {
        return resp
          .status(400)
          .json({ error: `Missing fields: ${missingFields.join(", ")}` });
      }

      // Create the new row string
      const newRowData = headers
        .map((header) => newRow[header] || "")
        .join(" ");

      // Append the new row to the file content
      const updatedContent = [...lines, newRowData].join("\n");

      // Write the updated content back to the file
      fs.writeFile(filePath, updatedContent, "utf8", (err) => {
        if (err) {
          return resp
            .status(500)
            .json({ error: "Failed to write new row to file" });
        }
        resp.json({ message: "New row added successfully" });
      });
    });
  } else {
    resp.status(404).json({ error: "User not found" });
  }
};

// API to get text file data
const getTextFileDataById = async (req, resp) => {
  let userid = req.params.userid;

  if (userid.startsWith(":")) {
    userid = userid.substring(1); // Remove the first character (the colon)
  }

  const user = await Users.findOne({ where: { id: userid } });
  if (user) {
    const folderName = user.email.replace("@gmail.com", "") + user.id;
    const driveCPath = path.join("C:", "Teals Soft", folderName);
    const filePath = path.join(driveCPath, "1st_form_data.txt");

    fs.readFile(filePath, "utf8", (err, data) => {
      if (err) {
        return resp.status(500).json({ error: "Failed to read file" });
      }

      const lines = data.trim().split("\n");
      const headers = lines[0].split(/\s+/);

      const rows = lines.slice(1).map((line, index) => {
        const values = line.split(/\s+/);
        let obj = { id: index + 1 };
        headers.forEach((header, valueIndex) => {
          obj[header] = values[valueIndex];
        });
        return obj;
      });

      resp.json(rows);
    });
  } else {
    resp.status(404).json({ error: "User not found" });
  }
};

// API to update multiple text file data entries by id
const updateTextFileDataById = async (req, resp) => {
  let userid = req.params.userid;
  const { updates } = req.body; // Destructure updates from the request body

  // Check if updates is an array and has values
  if (!Array.isArray(updates) || updates.length === 0) {
    return resp
      .status(400)
      .json({ error: "Invalid or missing 'updates' array in request body" });
  }

  if (userid.startsWith(":")) {
    userid = userid.substring(1); // Remove the first character (the colon)
  }

  const user = await Users.findOne({ where: { id: userid } });
  if (user) {
    const folderName = user.email.replace("@gmail.com", "") + user.id;
    const driveCPath = path.join("C:", "Teals Soft", folderName);
    const filePath = path.join(driveCPath, "1st_form_data.txt");

    fs.readFile(filePath, "utf8", (err, data) => {
      if (err) {
        return resp.status(500).json({ error: "Failed to read file" });
      }

      const lines = data.trim().split("\n");
      const headers = lines[0].split(/\s+/);

      // Apply each update to the corresponding row
      const updatedLines = lines.slice(1).map((line, index) => {
        const currentIndex = index + 1;
        const update = updates.find((update) => update.id === currentIndex);

        if (update) {
          // Update the row with the new data
          const updatedRow = headers
            .map((header) => update.updatedData[header] || "")
            .join(" ");
          return updatedRow;
        }
        return line;
      });
      // Write the updated data back to the file
      const updatedContent = [lines[0], ...updatedLines].join("\n");

      fs.writeFile(filePath, updatedContent, "utf8", (err) => {
        if (err) {
          return resp.status(500).json({ error: "Failed to update file" });
        }
        resp.json({ message: "Data updated successfully" });
      });
    });
  } else {
    resp.status(404).json({ error: "User not found" });
  }
};

export { getTextFileDataById, updateTextFileDataById, addTextFileRow };
