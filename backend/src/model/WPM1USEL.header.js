const columnNames = [
  "Z",
  "BD",
  "U",
  "FC",
  "SAN",
  "SIL",
  "WON",
  "PH",
  "SMB",
  "WOC",
  "CAC",
  "CEC",
  "ROK",
  "CNDS",
  "PKRZ",
  "RSD",
  "BDD",
  "PSP",
  "SATC",
  "HCL",
  "WP",
  "EXCK",
  "ECND",
  "STFR",
  "ST",
  "WLS",
  "WLM",
  "WLSL",
  "WLSC",
  "WLMC",
  "WLSLC",
  "WLSLNC",
  "WBMC",
  "WHSC",
  "WHPC",
  "WLSN",
  "WLMN",
  "WBMN",
  "WHSN",
  "WHPN",
  "FE26",
  "SULF",
  "ASHZ",
  "CGO2",
  "CGCO2",
  "CGN2O",
];
// Read the file
const filePathFromEnv = getFilePath();

// Ensure the file path is defined
if (!filePathFromEnv) {
  return resp.status(500).json({ error: "FilePath is not defined." });
}
const driveCPath = path.join(filePathFromEnv);
const filePath = path.join(driveCPath, "umstead.sol");

fs.readFile(filePath, "utf8", (err, data) => {
  if (err) {
    return resp.status(500).json({ error: "Error reading file" });
  }

  const lines = data.trim().split("\n");
  const lines2 = data.trim().split(/\s+/);

  console.log("lines2", lines2, "lines", lines);

  const result = {};
  let lineCount = 1;

  // Skip first three lines
  const relevantLines = lines.slice(3);

  // Process lines in chunks of 10
  for (let i = 0; i < relevantLines.length; i += 10) {
    const chunk = relevantLines.slice(i, i + 10);
    const jsonLine = {};

    // Parse each row in the chunk
    chunk.forEach((row, rowIndex) => {
      const values = row.trim().split(/\s+/); // Split values by whitespace
      values.forEach((value, colIndex) => {
        const key = `val${colIndex + 1}`;
        jsonLine[`${key}-${rowIndex + 1}`] = parseFloat(value);
      });
    });

    result[`line${lineCount}`] = jsonLine;
    lineCount++;
  }

  // Function to process lines
  const processLines = (lines) => {
    const columns = {
      Column1: [],
      Column2: [],
      Column3: [],
      Column4: [],
      Column5: [],
    };

    lines.forEach((line) => {
      // Split the line into values and remove extra spaces
      const values = line.trim().split(/\s+/);
      // Ensure we only take 5 columns
      if (values.length >= 5) {
        columns.Column1.push(parseFloat(values[0]));
        columns.Column2.push(parseFloat(values[1]));
        columns.Column3.push(parseFloat(values[2]));
        columns.Column4.push(parseFloat(values[3]));
        columns.Column5.push(parseFloat(values[4]));
      }
    });

    return columns;
  };

  // Process the lines
  const jsonData = processLines(lines);

  // Output the JSON result
  const outputPath = "output_grouped.json";
  fs.writeFileSync(outputPath, JSON.stringify(jsonData), "utf8");

  resp.json({ jsonData });
});

// // Define the column names

  //  const filePathFromEnv = getFilePath();

// // Ensure the file path is defined
// if (!filePathFromEnv) {
//   return resp.status(500).json({ error: "FilePath is not defined." });
// }
// const driveCPath = path.join(filePathFromEnv);
// const filePath = path.join(driveCPath, "umstead.sol");
// // Read the .dat file
// fs.readFile(filePath, "utf8", (err, data) => {
//   if (err) {
//     console.error("Error reading file:", err);
//     return resp.status(500).json({ error: "Error reading file." });
//   }
//   // Split the data into rows
//   const rows = data
//     .split("\n")
//     .map((row) => row.trim())
//     .filter((row) => row);
//   // Split the rows into columns and transpose the data (rows to columns)
//   const transposedData = columnNames.map((col, colIndex) => {
//     return rows.map((row) => {
//       const values = row.split(/\s+/); // Split the row by whitespace
//       return values[colIndex] ? parseFloat(values[colIndex]) : null; // Get the value for the column
//     });
//   });
//   // Create a JSON object with keys as column names
//   const result = columnNames.reduce((acc, colName, index) => {
//     acc[colName] = transposedData[index]; // Add the column data to the result object
//     return acc;
//   }, {});
//   console.log(transposedData, rows);
//   // Creating final rows with headers and corresponding values
//   const finalRows = transposedData.map((line) => {
//     // Ensure the line is a string before calling trim()
//     if (typeof line === "string") {
//       const values = line.trim().split(/\s+/); // Split line into an array of values
//       let obj = {};
//       // Map each header to its corresponding value
//       columnNames.forEach((header, valueIndex) => {
//         obj[header] = values[valueIndex] || null; // Use null if there's no corresponding value
//       });
//       return obj;
//     }
//     return {}; // If line is not a string, return an empty object
//   });
//   // Log the result for debugging (can be removed later)
//   // Return the result as a JSON response
//   return resp.json(finalRows);
// });
