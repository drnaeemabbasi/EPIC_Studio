import fs from "fs";
import path from "path";
import csv from "csv-parser";

let cachedModel = null;

/**
 * Parses the EPIC1102_Variable_Reference.csv and caches it.
 */
export const loadModelDefinition = async () => {
    if (cachedModel) return cachedModel;

    const dataPath = path.resolve("src/data/EPIC1102_Variable_Reference.csv");
    const results = [];

    return new Promise((resolve, reject) => {
        if (!fs.existsSync(dataPath)) {
            console.error("CSV file not found:", dataPath);
            return reject(new Error("Variable reference CSV not found"));
        }

        fs.createReadStream(dataPath)
            .pipe(csv())
            .on("data", (data) => {
                // Trim all keys and values in the raw data object
                const trimmedData = {};
                Object.keys(data).forEach(key => {
                    trimmedData[key.trim()] = (data[key] || "").trim();
                });

                // Ensure Line and Field are numbers
                trimmedData.Line = parseInt(trimmedData.Line, 10);
                trimmedData.Field = parseInt(trimmedData.Field, 10);
                results.push(trimmedData);
            })
            .on("end", () => {
                // Group by Source_File
                const grouped = results.reduce((acc, row) => {
                    const fileName = row.Source_File.toUpperCase();
                    if (!acc[fileName]) acc[fileName] = { lines: {} };
                    
                    if (!acc[fileName].lines[row.Line]) {
                        acc[fileName].lines[row.Line] = [];
                    }
                    
                    acc[fileName].lines[row.Line].push(row);
                    return acc;
                }, {});

                // Sort fields within each line
                Object.keys(grouped).forEach(fileName => {
                    Object.keys(grouped[fileName].lines).forEach(lineNum => {
                        grouped[fileName].lines[lineNum].sort((a, b) => parseInt(a.Field) - parseInt(b.Field));
                    });
                });

                cachedModel = grouped;
                console.log("Model definition loaded successfully.");
                resolve(cachedModel);
            })
            .on("error", (err) => reject(err));
    });
};

/**
 * Gets the model definition for a specific EPIC file.
 * @param {string} fileName - E.g., 'EPICCONT.DAT'
 */
export const getModelForFile = async (fileName) => {
    const model = await loadModelDefinition();
    const normalizedFileName = fileName.toUpperCase();
    return model[normalizedFileName] || null;
};
