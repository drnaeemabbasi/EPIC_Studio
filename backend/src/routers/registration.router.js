import express from "express";
import { RegregistrationUser } from "./../controllers/regitsration.controller.js";
const RegistrationRouter = express.Router();

RegistrationRouter.post("/", RegregistrationUser);

export { RegistrationRouter };
