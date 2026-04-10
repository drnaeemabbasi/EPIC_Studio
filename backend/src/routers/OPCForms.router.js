import express from "express";
import {
  fetchOPCFormData,
  updateOPCFormData,
  fetchSITFormData,
  updateSITFormData,
  fetchSOLFormData,
  updateSOLFormData,
} from "../controllers/OPCForms.controller.js";

const OPCFormsRouter = express.Router();

OPCFormsRouter.get("/fetchOPCFormData", fetchOPCFormData);
OPCFormsRouter.put("/updateOPCFormData", updateOPCFormData);

OPCFormsRouter.get("/fetchSITFormData", fetchSITFormData);
OPCFormsRouter.put("/updateSITFormData", updateSITFormData);

// Map the old newRows route to the modernized update function
OPCFormsRouter.put("/updateOPCFileWithNewRows", updateOPCFormData);

OPCFormsRouter.get("/fetchSOLFormData", fetchSOLFormData);
OPCFormsRouter.put("/updateSOLFormData", updateSOLFormData);

export { OPCFormsRouter };
