import express from "express";
import { postUsers } from "../controllers/user.js";

const router = express.Router();

router.post("/postUsers", postUsers);

export default router;
