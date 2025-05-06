import express from "express";
import {
  fetchOPCFormData,
  updateOPCFormData,
  fetchSITFormData,
  updateSITFormData,
  updateOPCFileWithNewRows,
  fetchSOLFormData,
  updateSOLFormData,
  checking,
} from "../controllers/OPCForms.controller.js";
const OPCFormsRouter = express.Router();
OPCFormsRouter.get("/checking", checking);

OPCFormsRouter.get("/fetchOPCFormData", fetchOPCFormData);
OPCFormsRouter.put("/updateOPCFormData", updateOPCFormData);

OPCFormsRouter.get("/fetchSITFormData", fetchSITFormData);
OPCFormsRouter.put("/updateSITFormData", updateSITFormData);
OPCFormsRouter.put("/updateOPCFileWithNewRows", updateOPCFileWithNewRows);

OPCFormsRouter.get("/fetchSOLFormData", fetchSOLFormData);
OPCFormsRouter.put("/updateSOLFormData", updateSOLFormData);

export { OPCFormsRouter };
