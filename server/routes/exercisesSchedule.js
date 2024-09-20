import express from "express";
import { postExerciseSchedule } from "../controllers/exerciseSchedule.js";
import { searchDaysOfWeek } from "../controllers/exerciseSchedule.js";
import { searchExercisesSchedule } from "../controllers/exerciseSchedule.js";

const router = express.Router();

router.post("/postExerciseSchedule", postExerciseSchedule);
router.get("/searchDaysOfWeek", searchDaysOfWeek);
router.get("/searchExercisesSchedule", searchExercisesSchedule);

export default router;
