import express, { Router } from "express";
import { get, create, getAll } from "../controllers/feedback.js";
const router = express.Router();

router.get("/get-feedback/:id", get);
router.get("/get-all-feedbacks", getAll);
router.post("/create-feedback", create);
export default router;
