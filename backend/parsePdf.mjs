import fs from 'fs';
import pdf from 'pdf-parse/lib/pdf-parse.js';

try {
  let dataBuffer = fs.readFileSync('C:/Users/an/Documents/EPIC_Studio-main/epic_1102/epic-user-manual-2024-10.pdf');
  const data = await pdf(dataBuffer);
  fs.writeFileSync('manual.txt', data.text);
  console.log("Extracted text successfully. Length:", data.text.length);
} catch (e) {
  console.error("Error:", e);
}
