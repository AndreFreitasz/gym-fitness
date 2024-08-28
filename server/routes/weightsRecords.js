import express from "express";
import { postWeightRecord } from "../controllers/weightsRecords.js";

const router = express.Router();

router.post("/postWeightRecord", postWeightRecord);


export default router;