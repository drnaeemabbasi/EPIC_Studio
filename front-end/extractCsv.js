const fs = require('fs');
const path = require('path');

const srcFile = path.join(__dirname, 'src', 'service', 'main.model.js');
const destFile = path.join(__dirname, '..', 'backend', 'src', 'data', 'epic_descriptions.csv');

const content = fs.readFileSync(srcFile, 'utf8');

// Regex to flexibly capture contents of descriptions block
const descriptionsBlockRegex = /descriptions:\s*\{([\s\S]*?)\n    \}/g;

let match;
const dictionary = {};

while ((match = descriptionsBlockRegex.exec(content)) !== null) {
  const innerBlock = match[1];
  
  // Regex to capture key-value pairs (Key: "Value" or Key: 'Value')
  const pairRegex = /([A-Za-z0-9_().,]+)\s*:\s*(["'])([\s\S]*?)\2/g;
  let pairMatch;
  while ((pairMatch = pairRegex.exec(innerBlock)) !== null) {
    let key = pairMatch[1].trim();
    let value = pairMatch[3].trim();
    
    // Some keys might be named 'SCRP(1,1)' which is valid
    // Some might have single quotes inside, so we'll sanitize
    dictionary[key] = value.replace(/\r?\n\s*/g, ' ').replace(/"/g, '""'); 
  }
}

let csvLines = ['Variable_Code,Description'];
for (const [key, value] of Object.entries(dictionary)) {
    csvLines.push(`${key},"${value}"`);
}

fs.writeFileSync(destFile, csvLines.join('\n'));
console.log(`Successfully extracted ${Object.keys(dictionary).length} variable descriptions to ${destFile}`);
