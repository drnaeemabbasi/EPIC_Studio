import express from "express";

import {
  getEpicRunFile,
  updateEpicRunFile,
  getEpicCount,
  updateEpicContFile,
  getParm1102Data,
  updatePARM1102Data,
} from "../controllers/EpicFiles.controller.js";

const epicRunFileRouter = express.Router();

epicRunFileRouter.get("/", getEpicRunFile);
epicRunFileRouter.put("/updateData", updateEpicRunFile);
epicRunFileRouter.put("/updateData/epicCont", updateEpicContFile);

epicRunFileRouter.get("/epicCount", getEpicCount);
epicRunFileRouter.get("/getParm1102Data", getParm1102Data);

epicRunFileRouter.put("/updatePARM1102", updatePARM1102Data);

export { epicRunFileRouter };
