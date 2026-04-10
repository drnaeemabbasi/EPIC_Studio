import fs from "fs";
import path from "path";
import { getModelForFile } from "../services/modelDefinition.service.js";
import { getFilePath } from "../utils/filePath.js";


const getEpicRunFile = async (req, resp) => {
  try {
    const filePathFromEnv = getFilePath();
    if (!filePathFromEnv) return resp.status(500).json({ error: "FilePath is not defined." });

    const driveCPath = path.join(filePathFromEnv);
    const filePath = path.join(driveCPath, "EPICRUN.dat");

    if (!fs.existsSync(filePath)) return resp.status(404).json({ error: "EPICRUN.dat not found" });

    const model = await getModelForFile("EPICRUN.DAT");
    if (!model) return resp.status(500).json({ error: "Model definition for EPICRUN.DAT not found" });

    const data = fs.readFileSync(filePath, "utf8");
    const lines = data.split("\n");

    // Process first line as rows
    const firstLineValues = lines[0].trim().split(/\s+/);
    const obj = { id: 1 };
    
    // Line 1 variables for EPICRUN
    const line1Model = model.lines[1] || [];
    line1Model.forEach((varDef) => {
      obj[varDef.Variable_Code] = firstLineValues[varDef.Field - 1] || null;
    });

    resp.json(obj);
  } catch (err) {
    resp.status(500).json({ error: err.message });
  }
};

const updateEpicRunFile = async (req, resp) => {
  const updates = req.body;
  if (!updates) return resp.status(400).json({ error: "Missing update data" });

  try {
    const filePathFromEnv = getFilePath();
    if (!filePathFromEnv) return resp.status(500).json({ error: "FilePath is not defined." });

    const filePath = path.join(filePathFromEnv, "EPICRUN.dat");
    const model = await getModelForFile("EPICRUN.DAT");
    const line1Model = model.lines[1] || [];

    const data = fs.readFileSync(filePath, "utf8");
    const lines = data.split("\n");

    const originalLine = lines[0];
    const values = originalLine.match(/\S+/g) || [];
    
    console.log("EPICRUN Updates received:", updates);
    console.log("EPICRUN Current values in file:", values);

    if (values.length > 0) {
        line1Model.forEach((varDef, index) => {
            if (updates[varDef.Variable_Code] !== undefined && index < values.length) {
              values[index] = updates[varDef.Variable_Code];
            }
        });

        console.log("EPICRUN New values to write:", values);

        let valIdx = 0;
        lines[0] = originalLine.replace(/\S+/g, () => values[valIdx++]);
        
        console.log("EPICRUN New line 0:", lines[0]);

        fs.writeFileSync(filePath, lines.join("\n"), "utf8");
        resp.json({ message: "EPICRUN.dat updated successfully" });
    } else {
        resp.status(400).json({ error: "EPICRUN.dat first line matches no values." });
    }
  } catch (err) {
    resp.status(500).json({ error: err.message });
  }
};

const getEpicCount = async (req, resp) => {
  try {
    const filePathFromEnv = getFilePath();
    if (!filePathFromEnv) return resp.status(500).json({ error: "FilePath is not defined." });

    const filePath = path.join(filePathFromEnv, "EPICCONT.dat");
    if (!fs.existsSync(filePath)) return resp.status(404).json({ error: "EPICCONT.dat not found" });

    const model = await getModelForFile("EPICCONT.DAT");
    if (!model) return resp.status(500).json({ error: "Model definition for EPICCONT.DAT not found" });

    const data = fs.readFileSync(filePath, "utf8");
    const lines = data.split("\n");

    const result = { descriptions: {} };
    Object.keys(model.lines).forEach((lineNum) => {
      const lineIdx = parseInt(lineNum, 10) - 1;
      if (lines[lineIdx]) {
        const values = lines[lineIdx].trim().split(/\s+/);
        const rowData = {};
        model.lines[lineNum].forEach((varDef) => {
          rowData[varDef.Variable_Code] = values[varDef.Field - 1] || null;
          result.descriptions[varDef.Variable_Code] = varDef.Description;
        });
        result[`row${lineNum}`] = rowData;
      }
    });

    resp.json(result);
  } catch (err) {
    resp.status(500).json({ error: err.message });
  }
};


const updateEpicContFile = async (req, resp) => {
  const updates = req.body;
  if (!updates) return resp.status(400).json({ error: "Missing updates" });

  try {
    const filePathFromEnv = getFilePath();
    if (!filePathFromEnv) return resp.status(500).json({ error: "FilePath is not defined." });

    const filePath = path.join(filePathFromEnv, "EPICCONT.dat");
    const model = await getModelForFile("EPICCONT.DAT");

    const data = fs.readFileSync(filePath, "utf8");
    const lines = data.split("\n");

    Object.keys(model.lines).forEach((lineNum) => {
      const lineIdx = parseInt(lineNum, 10) - 1;
      const rowData = updates[`row${lineNum}`];
      if (lines[lineIdx] && rowData) {
        const originalLine = lines[lineIdx];
        const values = originalLine.match(/\S+/g) || [];

        if (values.length > 0) {
            model.lines[lineNum].forEach((varDef, index) => {
                if (rowData[varDef.Variable_Code] !== undefined && index < values.length) {
                   values[index] = rowData[varDef.Variable_Code];
                }
            });
            let vIdx = 0;
            lines[lineIdx] = originalLine.replace(/\S+/g, () => values[vIdx++]);
        }
      }
    });

    fs.writeFileSync(filePath, lines.join("\n"), "utf8");
    resp.json({ message: "EPICCONT.dat updated successfully" });
  } catch (err) {
    resp.status(500).json({ error: err.message });
  }
};


const getParm1102Data = async (req, resp) => {
  try {
    const filePathFromEnv = getFilePath();
    if (!filePathFromEnv) return resp.status(500).json({ error: "FilePath is not defined." });

    const filePath = path.join(filePathFromEnv, "PARM1102.dat");
    if (!fs.existsSync(filePath)) return resp.status(404).json({ error: "PARM1102.dat not found" });

    const model = await getModelForFile("PARM1102.DAT");
    if (!model) return resp.status(500).json({ error: "Model definition for PARM1102.DAT not found" });

    const data = fs.readFileSync(filePath, "utf8");
    const lines = data.split("\n");

    const result = { data: [], descriptions: {} };
    Object.keys(model.lines).forEach((lineNumStr) => {
      const lineNum = parseInt(lineNumStr, 10);
      const lineIdx = lineNum - 1;
      if (lines[lineIdx] !== undefined) {
        const values = lines[lineIdx].trim().split(/\s+/);
        const rowData = {};
        model.lines[lineNum].forEach((varDef) => {
          rowData[varDef.Variable_Code] = values[varDef.Field - 1] || null;
          result.descriptions[varDef.Variable_Code] = varDef.Description;
        });
        result.data.push(rowData);
      }
    });

    resp.json(result);
  } catch (err) {
    resp.status(500).json({ error: err.message });
  }
};

const updatePARM1102Data = async (req, resp) => {
  const newRows = req.body;
  if (!newRows) return resp.status(400).json({ error: "Missing data" });

  try {
    const filePathFromEnv = getFilePath();
    if (!filePathFromEnv) return resp.status(500).json({ error: "FilePath is not defined." });

    const filePath = path.join(filePathFromEnv, "PARM1102.dat");
    const model = await getModelForFile("PARM1102.DAT");

    const data = fs.readFileSync(filePath, "utf8");
    const lines = data.split("\n");

    Object.keys(model.lines).forEach((lineNumStr) => {
      const lineNum = parseInt(lineNumStr, 10);
      const lineIdx = lineNum - 1;
      const rowData = newRows[`newRow${lineNum}`];
      if (lines[lineIdx] !== undefined && rowData) {
        const originalLine = lines[lineIdx];
        const values = originalLine.match(/\S+/g) || [];

        if (values.length > 0) {
            model.lines[lineNum].forEach((varDef, index) => {
                if (rowData[varDef.Variable_Code] !== undefined && index < values.length) {
                   values[index] = rowData[varDef.Variable_Code];
                }
            });
            let vIdx = 0;
            lines[lineIdx] = originalLine.replace(/\S+/g, () => values[vIdx++]);
        }
      }
    });

    fs.writeFileSync(filePath, lines.join("\n"), "utf8");
    resp.json({ message: "PARM1102 data updated successfully" });
  } catch (err) {
    resp.status(500).json({ error: err.message });
  }
};


export {
  getEpicRunFile,
  updateEpicRunFile,
  getEpicCount,
  updateEpicContFile,
  getParm1102Data,
  updatePARM1102Data,
};
