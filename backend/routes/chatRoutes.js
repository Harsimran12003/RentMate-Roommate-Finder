import express from "express";
import { createOrGetChat, getUserChats } from "../controllers/chatController.js";

const router = express.Router();

// POST /api/chats → Create or get existing chat
router.post("/", createOrGetChat);

// GET /api/chats/:userId → Get all chats of a user
router.get("/:userId", getUserChats);

export default router;
