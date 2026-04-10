import express from "express";
import { 
  reNameFile, 
  fetchFileNames, 
  fetchSites, 
  createSite, 
  deleteSite 
} from "../controllers/basic.controller.js";

const basicRoutes = express.Router();

basicRoutes.put("/reNameFile", reNameFile);
basicRoutes.get("/fetchFileNames", fetchFileNames);

// Site Management Routes
basicRoutes.get("/fetchSites", fetchSites);
basicRoutes.post("/createSite", createSite);
basicRoutes.delete("/deleteSite", deleteSite);

export { basicRoutes };
