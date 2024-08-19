import express from "express";
import { postExercises } from "../controllers/exercise.js";
import { searchGroupsMuscles } from "../controllers/exercise.js";

const router = express.Router();

router.post("/postExercises", postExercises);

router.get("/searchGroupsMuscles", searchGroupsMuscles);

export default router;