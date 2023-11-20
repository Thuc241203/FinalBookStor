import express from "express";
import {
  getAll,
  get,
  create,
  update,
  remove,
  getAllProducts,
} from "../controllers/product.js";
import { checkPermission } from "../middlewares/checkPimission.js";
const router = express.Router();

router.get("/products", getAll);
router.get("/all-products", getAllProducts);
router.get("/products/:id", get);
router.post("/products", checkPermission, create);
router.put("/products/:id", checkPermission, update);
router.delete("/products/:id", checkPermission, remove);
export default router;
