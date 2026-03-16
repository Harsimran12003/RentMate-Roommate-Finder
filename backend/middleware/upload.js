import multer from "multer";
import { CloudinaryStorage } from "multer-storage-cloudinary";
import cloudinary from "../config/cloudinary.js";

const storage = new CloudinaryStorage({
  cloudinary: cloudinary,
  params: {
    folder: "rentmate",
    allowed_formats: ["jpg", "jpeg", "png", "pdf", "webp", "avif"],
  },
});

const upload = multer({ storage });

export default upload;