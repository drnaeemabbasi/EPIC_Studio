import fs from 'fs';

const files = [
  'C:/Users/an/Documents/EPIC_Studio-main/backend/src/model/main.model.js',
  'C:/Users/an/Documents/EPIC_Studio-main/backend/src/model/common.header.js',
  'C:/Users/an/Documents/EPIC_Studio-main/backend/src/model/main_backeup.js',
  'C:/Users/an/Documents/EPIC_Studio-main/front-end/src/service/main.model.js',
  'C:/Users/an/Documents/EPIC_Studio-main/front-end/src/pages/form/allformBackup.js'
];
files.forEach(file => {
  if (fs.existsSync(file)) {
    let content = fs.readFileSync(file, 'utf8');
    content = content.replace(/descriptions:\s*\{[\s\S]*?\n    \}/g, 'descriptions: {}');
    fs.writeFileSync(file, content);
    console.log(`Cleaned ${file}`);
  }
});
