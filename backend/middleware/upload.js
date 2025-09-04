import multer from "multer";
import path from "path";

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/"); 
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname)); 
  },
});

// File filter (only images allowed)
const fileFilter = (req, file, cb) => {
  const filetypes = /\.(jpeg|jpg|png|gif|avif|svg|mp4|mp3|wav|webm)$/i;
  const mimetypes = /^(image\/|video\/|audio\/)/;

  const extname = filetypes.test(path.extname(file.originalname).toLowerCase());
  const mimetype = mimetypes.test(file.mimetype);

  if (extname && mimetype) {
    cb(null, true);
  } else {
    cb(new Error("Only images, audio, and video files are allowed"));
  }
};

const upload = multer({ storage, fileFilter });

export default upload;
