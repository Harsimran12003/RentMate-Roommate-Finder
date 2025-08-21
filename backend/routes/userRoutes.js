import express from "express";
import { registerUser , loginUser , getUserProfile , updateUserProfile } from "../controllers/userController.js";
import upload from "../middleware/upload.js";
import protect from "../middleware/authMiddleware.js";

const router = express.Router();

router.post("/register", upload.single("profilePhoto"), registerUser);
router.post("/login", loginUser);
router.get("/profile", protect, getUserProfile);
router.put("/profile", protect, upload.single("profilePhoto"), updateUserProfile);


export default router;
