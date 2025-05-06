import express from "express";
import { reNameFile, fetchFileNames } from "../controllers/basic.controller.js";

const basicRoutes = express.Router();

basicRoutes.put("/reNameFile", reNameFile);
basicRoutes.get("/fetchFileNames", fetchFileNames);

export { basicRoutes };
