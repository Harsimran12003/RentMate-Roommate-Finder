import express from "express";
import { getMatches } from "../controllers/matchController.js";
import protect from "../middleware/authMiddleware.js";

const router = express.Router();

// GET /api/matches/:userId
router.get("/:userId", protect, getMatches);

export default router;
