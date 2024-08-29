import express from "express";
import { postWeightRecord } from "../controllers/weightsRecords.js";
import { searchUserData } from "../controllers/weightsRecords.js";

const router = express.Router();

router.post("/postWeightRecord", postWeightRecord);

router.get("/searchUserData", searchUserData);


export default router;