import express from "express";
import { addExpense, getExpensesByGroup, deleteExpense } from "../controllers/expenseController.js";

const router = express.Router();

// Add expense
router.post("/", addExpense);

// Get expenses for a group
router.get("/:groupId", getExpensesByGroup);

// Delete expense
router.delete("/:id", deleteExpense);

export default router;
