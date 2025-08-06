import React, { useState } from "react";

const Expenses = () => {
  const [expenses, setExpenses] = useState([
    {
      id: 1,
      title: "Rent",
      amount: 12000,
      paidBy: "You",
      date: "2025-08-01",
    },
    {
      id: 2,
      title: "Electricity Bill",
      amount: 1500,
      paidBy: "Riya",
      date: "2025-08-03",
    },
  ]);

  const [newExpense, setNewExpense] = useState({
    title: "",
    amount: "",
    paidBy: "",
    date: "",
  });

  const handleAddExpense = () => {
    if (
      !newExpense.title.trim() ||
      !newExpense.amount ||
      !newExpense.paidBy.trim() ||
      !newExpense.date
    )
      return;

    setExpenses([
      ...expenses,
      {
        ...newExpense,
        id: Date.now(),
        amount: parseFloat(newExpense.amount),
      },
    ]);

    setNewExpense({ title: "", amount: "", paidBy: "", date: "" });
  };

  const total = expenses.reduce((sum, exp) => sum + exp.amount, 0);

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#F0F4F8] to-[#E6F2F5] px-8 py-10">
      <h1 className="text-3xl font-bold text-center mb-10 text-[#00796B]">
        Shared Expenses
      </h1>

      {/* Add Expense */}
      <div className="max-w-4xl mx-auto bg-white shadow-xl rounded-2xl p-6 mb-10">
        <h2 className="text-xl font-semibold mb-4 text-[#004D40]">Add Expense</h2>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <input
            type="text"
            placeholder="Title"
            value={newExpense.title}
            onChange={(e) =>
              setNewExpense({ ...newExpense, title: e.target.value })
            }
            className="border p-2 rounded-lg"
          />
          <input
            type="number"
            placeholder="Amount"
            value={newExpense.amount}
            onChange={(e) =>
              setNewExpense({ ...newExpense, amount: e.target.value })
            }
            className="border p-2 rounded-lg"
          />
          <input
            type="text"
            placeholder="Paid by"
            value={newExpense.paidBy}
            onChange={(e) =>
              setNewExpense({ ...newExpense, paidBy: e.target.value })
            }
            className="border p-2 rounded-lg"
          />
          <input
            type="date"
            value={newExpense.date}
            onChange={(e) =>
              setNewExpense({ ...newExpense, date: e.target.value })
            }
            className="border p-2 rounded-lg"
          />
        </div>
        <button
          onClick={handleAddExpense}
          className="mt-4 px-6 py-2 bg-[#00796B] text-white rounded-lg hover:bg-[#004D40] transition"
        >
          Add
        </button>
      </div>

      {/* Expense List */}
      <div className="max-w-4xl mx-auto bg-white shadow-xl rounded-2xl p-6">
        <h2 className="text-xl font-semibold mb-4 text-[#004D40]">Expense History</h2>
        {expenses.length === 0 ? (
          <p className="text-gray-500">No expenses yet.</p>
        ) : (
          <table className="w-full table-auto border-collapse">
            <thead>
              <tr className="bg-[#B2DFDB] text-[#004D40]">
                <th className="p-2">Title</th>
                <th className="p-2">Amount (₹)</th>
                <th className="p-2">Paid By</th>
                <th className="p-2">Date</th>
              </tr>
            </thead>
            <tbody>
              {expenses.map((exp) => (
                <tr
                  key={exp.id}
                  className="text-center hover:bg-gray-100 transition"
                >
                  <td className="p-2">{exp.title}</td>
                  <td className="p-2">{exp.amount}</td>
                  <td className="p-2">{exp.paidBy}</td>
                  <td className="p-2">{exp.date}</td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
        <div className="mt-4 text-right text-lg font-medium text-[#004D40]">
          Total: ₹{total}
        </div>
      </div>
    </div>
  );
};

export default Expenses;
