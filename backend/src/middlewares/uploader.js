import multer from "multer";
import { CloudinaryStorage } from "multer-storage-cloudinary";
import cloudinary from "../config/cloudinary.js";

const storage = new CloudinaryStorage({
  cloudinary: cloudinary,
  allowedFormats: ['jpg','png'],
  params:{
    folder: "frontend",
  },
})
const upload = multer({storage: storage});

export default upload;
