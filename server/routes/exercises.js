import express from "express";
import { postExercises } from "../controllers/exercise.js";

const router = express.Router();

router.post("/postExercises", postExercises);

export default router;