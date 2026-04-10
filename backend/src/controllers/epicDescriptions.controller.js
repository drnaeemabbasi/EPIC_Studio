import fs from "fs";
import path from "path";
import csv from "csv-parser";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const getEpicDescriptions = (req, resp) => {
  const dictionary = {};
  const csvPath = path.join(__dirname, "..", "data", "EPIC1102_Variable_Reference.csv");

  fs.createReadStream(csvPath)
    .pipe(csv())
    .on("data", (data) => {
      // The headers are: Variable_Code, Description, Min_Value, Max_Value, Unknown_Value, Data_Type, Allowed_Values
      if (data.Variable_Code) {
        dictionary[data.Variable_Code] = {
          description: data.Description || "",
          min: data.Min_Value || "",
          max: data.Max_Value || "",
          unknown: data.Unknown_Value || "",
          type: data.Data_Type || "",
          allowed: data.Allowed_Values || ""
        };
      }
    })
    .on("end", () => {
      resp.json(dictionary);
    })
    .on("error", (err) => {
      console.error("Error reading descriptions CSV", err);
      resp.status(500).json({ error: "Failed to read internal validation database" });
    });
};

export { getEpicDescriptions };
