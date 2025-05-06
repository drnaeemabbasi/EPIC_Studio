import express from "express";
import { fetchFiles, updateFiles } from "../controllers/files.controller.js";
const filesRouters = express.Router();

filesRouters.get("/:fileFormat", fetchFiles);
filesRouters.put("/update", updateFiles);

export { filesRouters };
