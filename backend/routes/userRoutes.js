import express from "express";
import { registerUser , loginUser , getUserProfile , updateUserProfile, changePassword } from "../controllers/userController.js";
import upload from "../middleware/upload.js";
import protect from "../middleware/authMiddleware.js";

const router = express.Router();

router.post(
  "/register",
  upload.fields([
    { name: "profilePhoto", maxCount: 1 },
    { name: "policeVerification", maxCount: 1 },
  ]),
  registerUser
);
router.post("/login", loginUser);
router.get("/profile", protect, getUserProfile);
router.put("/profile", protect, upload.single("profilePhoto"), updateUserProfile);
router.put("/change-password", protect, changePassword);

export default router;
