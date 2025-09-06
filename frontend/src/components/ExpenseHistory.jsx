import React from "react";

const ExpenseHistory = ({ groupedExpenses, loading, total, onDelete }) => (
  <div className="bg-white shadow-xl rounded-2xl p-6">
    <h2 className="text-xl font-semibold mb-4 text-[#0D47A1]">Expense History</h2>
    {loading ? (
      <p className="text-center text-gray-500">Loading...</p>
    ) : Object.keys(groupedExpenses).length === 0 ? (
      <p className="text-gray-500">No expenses yet.</p>
    ) : (
      Object.entries(groupedExpenses).map(([month, data]) => (
        <div key={month} className="mb-8">
          <h3 className="text-lg font-semibold text-[#1565C0] mb-2">
            {month} (Total: ₹{data.total})
          </h3>
          <table className="w-full table-auto border-collapse">
            <thead>
              <tr className="bg-[#E3F2FD] text-[#0D47A1]">
                <th className="p-2">Title</th>
                <th className="p-2">Amount (₹)</th>
                <th className="p-2">Paid By</th>
                <th className="p-2">Date</th>
                <th className="p-2">Actions</th>
              </tr>
            </thead>
            <tbody>
              {data.items.map((exp) => (
                <tr key={exp._id} className="text-center hover:bg-gray-100 transition">
                  <td className="p-2">{exp.title}</td>
                  <td className="p-2">{exp.amount}</td>
                  <td className="p-2">{exp.paidBy?.fullName || "Unknown"}</td>
                  <td className="p-2">{new Date(exp.date).toLocaleDateString()}</td>
                  <td className="p-2">
                    <button
                      onClick={() => onDelete(exp._id)}
                      className="px-3 py-1 bg-red-500 text-white rounded cursor-pointer"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ))
    )}
    <div className="mt-4 text-right text-lg font-medium text-[#0D47A1]">
      Overall Total: ₹{total}
    </div>
  </div>
);

export default ExpenseHistory;
