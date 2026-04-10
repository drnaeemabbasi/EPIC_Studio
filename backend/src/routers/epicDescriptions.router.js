import express from "express";
import { getEpicDescriptions } from "../controllers/epicDescriptions.controller.js";

const epicDescriptionsRouter = express.Router();

epicDescriptionsRouter.get("/fetchDescriptions", getEpicDescriptions);

export default epicDescriptionsRouter;
