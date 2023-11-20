import express, { Router } from "express";
import { getAll, get, create, update, remove } from "../controllers/category.js";
import { checkPermission } from "../middlewares/checkPimission.js";
const router = express.Router();

router.get("/categories", getAll);
router.get("/categories/:id", get);
router.post("/categories", checkPermission, create);
router.put("/categories/:id", checkPermission, update);
router.delete("/categories/:id", checkPermission, remove);
export default router;
