// utils/filePath.js
import path from 'path';

let dynamicFilePath = process.env.FILE_PATH ? path.resolve(process.env.FILE_PATH) : null;

function setFilePath(newPath) {
  if (newPath) {
    console.log('Setting dynamic file path:', newPath);
    dynamicFilePath = path.resolve(newPath);
  }
}

function getFilePath() {
  const envPath = process.env.FILE_PATH ? path.resolve(process.env.FILE_PATH) : null;
  return dynamicFilePath || envPath;
}

export { setFilePath, getFilePath };