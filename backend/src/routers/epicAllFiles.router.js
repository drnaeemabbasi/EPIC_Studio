import express from "express";
import {
  getEpicFormData,
  updateEpicFormData,
  getEpicFormDataBySearch,
  getEpicFormSuggestions,
  getEpicFormLastID,
  addEpicFormRow,
} from "../controllers/epicAllFiles.controller.js";

const epicAllFilesRouters = express.Router();

epicAllFilesRouters.get("/", getEpicFormData);
epicAllFilesRouters.post("/updateEpicFile", updateEpicFormData); // Assuming it's a POST request

epicAllFilesRouters.get("/bySearch", getEpicFormDataBySearch);
epicAllFilesRouters.get("/suggestions", getEpicFormSuggestions);

epicAllFilesRouters.get("/fetchLastId", getEpicFormLastID);
epicAllFilesRouters.post("/addData", addEpicFormRow);

export { epicAllFilesRouters };
