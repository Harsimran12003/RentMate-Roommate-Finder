import React, { useState } from "react";

const AddExpenseForm = ({ members, onAddExpense }) => {
  const [newExpense, setNewExpense] = useState({
    title: "",
    amount: "",
    paidBy: "",
    date: "",
  });

  const handleSubmit = () => {
    if (!newExpense.title || !newExpense.amount || !newExpense.paidBy || !newExpense.date) return;
    onAddExpense(newExpense);
    setNewExpense({ title: "", amount: "", paidBy: "", date: "" });
  };

  return (
    <div className="bg-white shadow-xl rounded-2xl p-6 mb-10">
      <h2 className="text-xl font-semibold mb-4 text-[#0D47A1]">Add Expense</h2>
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <input
          type="text"
          placeholder="Title"
          value={newExpense.title}
          onChange={(e) => setNewExpense({ ...newExpense, title: e.target.value })}
          className="border p-2 rounded-lg"
        />
        <input
          type="number"
          placeholder="Amount"
          value={newExpense.amount}
          onChange={(e) => setNewExpense({ ...newExpense, amount: e.target.value })}
          className="border p-2 rounded-lg"
        />
        <select
          value={newExpense.paidBy}
          onChange={(e) => setNewExpense({ ...newExpense, paidBy: e.target.value })}
          className="border p-2 rounded-lg"
        >
          <option value="">Paid By</option>
          {members.map((m) => (
            <option key={m._id} value={m.fullName}>
              {m.fullName}
            </option>
          ))}
        </select>
        <input
          type="date"
          value={newExpense.date}
          onChange={(e) => setNewExpense({ ...newExpense, date: e.target.value })}
          className="border p-2 rounded-lg"
        />
      </div>
      <button
        onClick={handleSubmit}
        className="mt-4 px-6 py-2 bg-[#1976D2] text-white rounded-lg hover:bg-[#0D47A1] transition cursor-pointer"
      >
        Add
      </button>
    </div>
  );
};

export default AddExpenseForm;
