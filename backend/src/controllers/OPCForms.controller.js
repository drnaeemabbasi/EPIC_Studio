import fs from "fs";
import path from "path";
import { getModelForFile } from "../services/modelDefinition.service.js";
import { getFilePath } from "../utils/filePath.js";

const fetchOPCFormData = async (req, resp) => {
  try {
    const siteName = req.query.siteName || "umstead";
    const filePathFromEnv = getFilePath();
    if (!filePathFromEnv) return resp.status(500).json({ error: "FilePath is not defined." });

    const driveCPath = path.join(filePathFromEnv);
    const filePath = path.join(driveCPath, `${siteName}.opc`);
    
    if (!fs.existsSync(filePath)) return resp.status(404).json({ message: `Site file ${siteName}.opc not found` });

    const data = fs.readFileSync(filePath, "utf8");
    const lines = data.split("\n");

    const siteInfo1 = lines[0] || "";
    const siteInfo2 = lines[1] || "";

    const model = await getModelForFile("filename.OPC");
    if (!model) return resp.status(500).json({ error: "Model for .OPC not found" });

    // Identify the first line in the model (e.g., Line 3 for 3-n)
    const lineNums = Object.keys(model.lines).map(Number).sort((a,b) => a-b);
    const firstModelLineNum = lineNums[0] || 1;
    const skipLines = firstModelLineNum - 1;

    const resultRows = lines.slice(skipLines).filter(l => l.trim()).map((line) => {
      const values = line.trim().split(/\s+/);
      const rowData = {};
      model.lines[firstModelLineNum].forEach((varDef) => {
        rowData[varDef.Variable_Code] = values[varDef.Field - 1] || null;
      });
      return rowData;
    });

    resp.json({ data: resultRows, siteInfo1, siteInfo2, siteName });
  } catch (err) {
    resp.status(500).json({ error: err.message });
  }
};

const fetchSITFormData = async (req, resp) => {
  try {
    const siteName = req.query.siteName || "umstead";
    const filePathFromEnv = getFilePath();
    if (!filePathFromEnv) return resp.status(500).json({ error: "FilePath is not defined." });

    const driveCPath = path.join(filePathFromEnv);
    const filePath = path.join(driveCPath, `${siteName}.sit`);

    if (!fs.existsSync(filePath)) return resp.status(404).json({ message: `Site file ${siteName}.sit not found` });

    const data = fs.readFileSync(filePath, "utf8");
    const lines = data.split("\n");

    const siteInfo1 = lines[0] || "";
    const siteInfo2 = lines[1] || "";
    const siteInfo3 = lines[2] || "";

    const model = await getModelForFile("filename.SIT");
    if (!model) return resp.status(500).json({ error: "Model for .SIT not found" });

    const resultRows = [];
    const descriptions = {};

    // Get all line numbers from the model that are >= 4
    const lineNums = Object.keys(model.lines).map(Number).sort((a,b) => a-b);
    
    lineNums.forEach((lineNum) => {
      // If user wants lines 1-3 as headers, we only show parameters for Line 4 onwards in the grid
      if (lineNum >= 4 && lines[lineNum - 1]) {
        const values = lines[lineNum - 1].trim().split(/\s+/);
        const rowData = { id: lineNum }; // Carry line number as ID
        model.lines[lineNum].forEach((varDef) => {
          rowData[varDef.Variable_Code] = values[varDef.Field - 1] || null;
          descriptions[varDef.Variable_Code] = varDef.Description;
        });
        resultRows.push(rowData);
      }
    });

    resp.json({ data: resultRows, descriptions, siteInfo1, siteInfo2, siteInfo3, siteName });
  } catch (err) {
    resp.status(500).json({ error: err.message });
  }
};

const fetchSOLFormData = async (req, resp) => {
  try {
    const siteName = req.query.siteName || "umstead";
    const filePathFromEnv = getFilePath();
    if (!filePathFromEnv) return resp.status(500).json({ error: "FilePath is not defined." });

    const driveCPath = path.join(filePathFromEnv);
    const filePath = path.join(driveCPath, `${siteName}.sol`);

    if (!fs.existsSync(filePath)) return resp.status(404).json({ message: `Site file ${siteName}.sol not found` });

    const data = fs.readFileSync(filePath, "utf8");
    const lines = data.split("\n");

    const model = await getModelForFile("filename.SOL");
    if (!model) return resp.status(500).json({ error: "Model for .SOL not found" });

    // Standards: Header metadata
    const siteInfo1 = lines[0] || ""; // Site Name/Order (Line 1)

    const rows = [];
    const universalParams = {}; // Line 1, 2 & 3
    const mainData = {};
    const descriptions = {};

    Object.keys(model.lines).forEach((lineNum) => {
      const lineIdx = parseInt(lineNum, 10) - 1;
      if (lines[lineIdx]) {
        const lineContent = lines[lineIdx];
        
        // Populate descriptions catalog
        model.lines[lineNum].forEach((varDef) => {
            descriptions[varDef.Variable_Code] = varDef.Description;
        });

        if (lineIdx < 3) {
          // Lines 1, 2 & 3 treated as Universal Parameters
          const lineValues = lineContent.trim().split(/\s+/);
          
          model.lines[lineNum].forEach((varDef) => {
            let val = "";
            
            if (lineIdx === 0) {
               if (varDef.Field === 1) {
                  val = lineContent.substring(0, 20).trim();
               } else if (varDef.Field === 2) {
                  val = lineContent.substring(20, 60).trim();
               }
            } else {
               // Lines 2 and 3 are 8-char fields but space-delimited is safer
               val = lineValues[varDef.Field - 1] || "";
               
               // Fallback to fixed-width if split failed to find the field
               if (!val) {
                   const fieldWidth = 8;
                   const start = (varDef.Field - 1) * fieldWidth;
                   if (lineContent.length >= start) {
                       val = lineContent.substring(start, start + fieldWidth).trim();
                   }
               }
            }

            // ROBUSTNESS REFINEMENT: Sanitize integer fields for selection-inputs
            // Dropdown options in the UI are keyed to exact characters (e.g. "2") 
            // but legacy EPIC files often store them as reals (e.g. "2.00").
            if (varDef.Data_Type === "integer" && val && !isNaN(val)) {
                val = Math.floor(parseFloat(val)).toString();
            }

            universalParams[varDef.Variable_Code] = val || "";
          });
        } else {
          const colVar = model.lines[lineNum][0]; 
          const colValues = lineContent.trim().split(/\s+/); 
          colValues.forEach((val, colIdx) => {
             const colKey = `column${colIdx + 1}`;
             if (!mainData[colKey]) mainData[colKey] = {};
             mainData[colKey][colVar.Variable_Code] = val;
          });
        }
      }
    });

    resp.json({ 
      data: { rows, mainData }, 
      mainData, 
      universalParams,
      descriptions, 
      siteInfo1, 
      siteName 
    });
  } catch (err) {
    resp.status(500).json({ error: err.message });
  }
};

const updateOPCFormData = async (req, resp) => {
  const { formData, siteInfo1, siteInfo2, siteName: bodySiteName } = req.body;
  const siteName = bodySiteName || "umstead";
  try {
    const filePathFromEnv = getFilePath();
    if (!filePathFromEnv) return resp.status(500).json({ error: "FilePath is not defined." });

    const filePath = path.join(filePathFromEnv, `${siteName}.opc`);
    if (!fs.existsSync(filePath)) return resp.status(404).json({ message: `Site file ${siteName}.opc not found` });

    const model = await getModelForFile("filename.OPC");
    const data = fs.readFileSync(filePath, "utf8");
    let lines = data.split("\n");

    // Update first two lines
    if (siteInfo1 !== undefined) lines[0] = siteInfo1;
    if (siteInfo2 !== undefined) lines[1] = siteInfo2;

    const lineNums = Object.keys(model.lines).map(Number).sort((a,b) => a-b);
    const firstModelLineNum = lineNums[0] || 1;
    const skipLines = firstModelLineNum - 1;

    // Preserve first 2 lines (or whatever skipLines is) and then rebuild data part
    const headerPart = lines.slice(0, skipLines);
    const updatedDataLines = formData.map((rowData) => {
        const values = [];
        model.lines[firstModelLineNum].forEach((varDef) => {
            values.push(rowData[varDef.Variable_Code] || "0");
        });
        // Pad for fixed-width-like look, though space-separated is standard
        return values.map(v => String(v).padStart(8)).join("");
    });

    const finalContent = [...headerPart, ...updatedDataLines].join("\n");
    fs.writeFileSync(filePath, finalContent, "utf8");
    resp.json({ message: "Data updated successfully" });
  } catch (err) {
    resp.status(500).json({ error: err.message });
  }
};

const updateSITFormData = async (req, resp) => {
  const { formData, siteInfo1, siteInfo2, siteInfo3, siteName: bodySiteName } = req.body;
  const siteName = bodySiteName || "umstead";
  try {
    const filePathFromEnv = getFilePath();
    if (!filePathFromEnv) return resp.status(500).json({ error: "FilePath is not defined." });

    const filePath = path.join(filePathFromEnv, `${siteName}.sit`);
    if (!fs.existsSync(filePath)) return resp.status(404).json({ message: `Site file ${siteName}.sit not found` });

    const model = await getModelForFile("filename.SIT");
    const data = fs.readFileSync(filePath, "utf8");
    let lines = data.split("\n");

    // Reconstruct the 3-line header
    if (siteInfo1 !== undefined) lines[0] = siteInfo1;
    if (siteInfo2 !== undefined) lines[1] = siteInfo2;
    if (siteInfo3 !== undefined) lines[2] = siteInfo3;

    // SIT parameters are typically one instance per line
    // We Map Line 4 to index 3, Line 5 to index 4, etc.
    if (formData && Array.isArray(formData)) {
      formData.forEach((rowData) => {
        const lineNum = rowData.id; // Correct line number from fetch
        const lineIdx = lineNum - 1;
        
        if (model.lines[lineNum]) {
            const values = [];
            model.lines[lineNum].forEach((varDef) => {
                values.push(rowData[varDef.Variable_Code] || "0");
            });
            // Fixed width pad (8 chars is standard for EPIC values)
            lines[lineIdx] = values.map(v => String(v).padStart(8)).join("");
        }
      });
    }

    fs.writeFileSync(filePath, lines.join("\n"), "utf8");
    resp.json({ message: "Data updated successfully" });
  } catch (err) {
    resp.status(500).json({ error: err.message });
  }
};

const updateSOLFormData = async (req, resp) => {
  const { formMainData, universalParams, siteInfo1, siteName: bodySiteName } = req.body;
  const siteName = bodySiteName || "umstead";
  try {
    const filePathFromEnv = getFilePath();
    if (!filePathFromEnv) return resp.status(500).json({ error: "FilePath is not defined." });

    const driveCPath = path.join(filePathFromEnv);
    const filePath = path.join(driveCPath, `${siteName}.sol`);
    if (!fs.existsSync(filePath)) return resp.status(404).json({ message: `Site file ${siteName}.sol not found` });

    const model = await getModelForFile("filename.SOL");
    const data = fs.readFileSync(filePath, "utf8");
    const lines = data.split("\n");

    // Standard Line 1 header update
    if (siteInfo1 !== undefined) lines[0] = siteInfo1;

    // Handle Universal Parameters (Line 2 & 3)
    [2, 3].forEach((lineNum) => {
        const lineIdx = lineNum - 1;
        if (universalParams && model.lines[lineNum]) {
            const values = [];
            model.lines[lineNum].forEach((varDef) => {
               values.push(universalParams[varDef.Variable_Code] || "0");
            });
            lines[lineIdx] = values.map(v => String(v).padStart(8)).join("");
        }
    });

    // mainData contains horizon columns starting from Line 4
    if (formMainData) {
      const colKeys = Object.keys(formMainData); 
      Object.keys(model.lines).forEach((lineNum) => {
        const lineIdx = parseInt(lineNum, 10) - 1;
        if (lineIdx >= 3 && lines[lineIdx]) {
           const originalLine = lines[lineIdx];
           const values = originalLine.match(/\S+/g) || [];
           const varDef = model.lines[lineNum][0];
           
           colKeys.forEach((colKey, colIdx) => {
              if (formMainData[colKey] && formMainData[colKey][varDef.Variable_Code] !== undefined) {
                  values[colIdx] = formMainData[colKey][varDef.Variable_Code];
              }
           });
           
           // Use padStart(8) for fixed width values in main data to be safe
           lines[lineIdx] = values.map(v => String(v).padStart(8)).join("");
        }
      });
    }

    fs.writeFileSync(filePath, lines.join("\n"), "utf8");
    resp.json({ message: "Data updated successfully" });
  } catch (err) {
    resp.status(500).json({ error: err.message });
  }
};

export {
  fetchOPCFormData,
  updateOPCFormData,
  fetchSITFormData,
  updateSITFormData,
  fetchSOLFormData,
  updateSOLFormData,
};
