import express from "express";
import { uploadImage } from "../controllers/upload.js";
import upload from '../middlewares/uploader.js';
const router = express.Router();

router.post('/upload',upload.array('file',3), uploadImage);
export default router