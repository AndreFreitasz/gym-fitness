import express from "express";
import {exercises} from "../controllers/exercises.js";

const router = express.Router();

router.get("/exercises", exercises);

export default router;