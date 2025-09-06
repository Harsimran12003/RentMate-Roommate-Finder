import Expense from "../models/Expense.js";
import User from "../models/User.js";

// Add Expense
export const addExpense = async (req, res) => {
  try {
    const { title, amount, paidBy, groupId, date } = req.body;

    if (!title || !amount || !paidBy || !groupId || !date) {
      return res.status(400).json({ message: "All fields are required" });
    }

    // ✅ Convert paidBy fullName → ObjectId
    const user = await User.findOne({ fullName: paidBy });
    if (!user) {
      return res.status(400).json({ message: `User not found: ${paidBy}` });
    }

    const expense = new Expense({
      title,
      amount,
      paidBy: user._id,
      groupId,
      date,
    });

    await expense.save();

    // ✅ Populate before sending
    const populated = await expense.populate([
      { path: "paidBy", select: "fullName email" },
      { path: "groupId", select: "name" }
    ]);

    res.status(201).json(populated);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get expenses for a group
export const getExpensesByGroup = async (req, res) => {
  try {
    const expenses = await Expense.find({ groupId: req.params.groupId })
      .populate("paidBy", "fullName email")
      .populate("groupId", "name");

    res.json(expenses);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Delete expense
export const deleteExpense = async (req, res) => {
  try {
    await Expense.findByIdAndDelete(req.params.id);
    res.json({ message: "Expense deleted" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
