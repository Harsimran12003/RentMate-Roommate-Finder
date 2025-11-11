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

const fileFilter = (req, file, cb) => {
  const filetypes = /\.(jpeg|jpg|png|gif|avif|svg|mp4|mp3|wav|webm|pdf)$/i;
  const mimetypes = /^(image\/|video\/|audio\/|application\/pdf)/;

  const extname = filetypes.test(path.extname(file.originalname).toLowerCase());
  const mimetype = mimetypes.test(file.mimetype);

  if (extname && mimetype) {
    cb(null, true);
  } else {
    cb(new Error("Only images, audio, video, and PDF files are allowed"));
  }
};

const upload = multer({ storage, fileFilter });

export default upload;