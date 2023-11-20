import express from "express";
import { get, create } from "../controllers/slider.js";
import { checkPermission } from "../middlewares/checkPimission.js";

const router = express.Router();

router.get("/get-slider", get);
router.post("/create-slider", checkPermission, create);
export default router;
