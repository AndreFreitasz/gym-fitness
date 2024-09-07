import express from "express";
import { postWeightRecord } from "../controllers/weightsRecords.js";
import { searchUserData } from "../controllers/weightsRecords.js";
import { deleteWeightRecord } from "../controllers/weightsRecords.js";
import { searchDatesWeightsByExercise } from "../controllers/weightsRecords.js";

const router = express.Router();

router.post("/postWeightRecord", postWeightRecord);

router.get("/searchUserData", searchUserData);

router.delete("/deleteWeightRecord", deleteWeightRecord);

router.get("/searchDatesWeightsByExercise", searchDatesWeightsByExercise);


export default router;