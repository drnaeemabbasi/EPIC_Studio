// utils/filePath.js
import path from 'path'; // ✅ lowercase "path", not "Path"
 
let dynamicFilePath = path.resolve(process.env.FILE_PATH);
 
function setFilePath(newPath) {
  console.log('Setting dynamic file path:', newPath);
  dynamicFilePath = newPath;
}
 
function getFilePath() {
  console.log(path.resolve(process.env.FILE_PATH))
  return dynamicFilePath || path.resolve(process.env.FILE_PATH);
}
 
export { setFilePath, getFilePath };
 
 