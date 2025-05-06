import express from "express";

import {
  getTextFileDataById,
  updateTextFileDataById,
  addTextFileRow,
} from "../controllers/getTextFileData.controller.js";
const getTextFileDataRouter = express.Router();
// getTextFileDataRouter.post("/:userid/", getTextFileDataById);
getTextFileDataRouter.post("/:userid", getTextFileDataById);
getTextFileDataRouter.post("/updatedata/:userid", updateTextFileDataById);
getTextFileDataRouter.post("/addRow/:userid", addTextFileRow);

export { getTextFileDataRouter };
