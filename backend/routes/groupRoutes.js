import express from "express";
import {
  createGroup,
  getUserGroups,
  getGroupMembers,
  deleteGroup,
  searchUsers,
} from "../controllers/groupController.js";
import protect from "../middleware/authMiddleware.js";

const router = express.Router();

// Create new group
router.post("/", protect, createGroup);

// Get all groups where user is a member
router.get("/", protect, getUserGroups);

// Get members of a specific group
router.get("/:id/members", protect, getGroupMembers);

// Delete a group
router.delete("/:id", protect, deleteGroup);

// Search users by name or email
router.get("/search/users", protect, searchUsers);

export default router;
