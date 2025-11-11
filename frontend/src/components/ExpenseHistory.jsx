import React from "react";

const ExpenseHistory = ({ groupedExpenses, loading, total, onDelete }) => (
  <div className="bg-white dark:bg-gray-800 shadow-xl rounded-2xl p-6 w-full">
    <h2 className="text-xl font-semibold mb-4 text-[#0D47A1] dark:text-[#80D8FF] text-center sm:text-left">
      Expense History
    </h2>

    {loading ? (
      <p className="text-center text-gray-500 dark:text-gray-400">Loading...</p>
    ) : Object.keys(groupedExpenses).length === 0 ? (
      <p className="text-gray-500 dark:text-gray-400 text-center">No expenses yet.</p>
    ) : (
      Object.entries(groupedExpenses).map(([month, data]) => (
        <div key={month} className="mb-8 overflow-x-auto">
          <h3 className="text-lg font-semibold text-[#1565C0] dark:text-[#4FC3F7] mb-2 text-center sm:text-left">
            {month} <span className="text-gray-600 dark:text-gray-300">(Total: ₹{data.total})</span>
          </h3>

          <table className="w-full min-w-[600px] table-auto border-collapse">
            <thead>
              <tr className="bg-[#E3F2FD] dark:bg-gray-700 text-[#0D47A1] dark:text-[#BBDEFB]">
                <th className="p-2 text-sm sm:text-base">Title</th>
                <th className="p-2 text-sm sm:text-base">Amount (₹)</th>
                <th className="p-2 text-sm sm:text-base">Paid By</th>
                <th className="p-2 text-sm sm:text-base">Date</th>
                <th className="p-2 text-sm sm:text-base">Actions</th>
              </tr>
            </thead>
            <tbody>
              {data.items.map((exp) => (
                <tr
                  key={exp._id}
                  className="text-center hover:bg-gray-100 dark:hover:bg-gray-700 transition"
                >
                  <td className="p-2 text-sm sm:text-base break-words">{exp.title}</td>
                  <td className="p-2 text-sm sm:text-base">{exp.amount}</td>
                  <td className="p-2 text-sm sm:text-base">{exp.paidBy?.fullName || "Unknown"}</td>
                  <td className="p-2 text-sm sm:text-base">
                    {new Date(exp.date).toLocaleDateString()}
                  </td>
                  <td className="p-2">
                    <button
                      onClick={() => onDelete(exp._id)}
                      className="px-3 py-1 bg-red-500 hover:bg-red-600 text-white rounded text-sm sm:text-base transition"
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

    <div className="mt-6 text-center sm:text-right text-lg font-medium text-[#0D47A1] dark:text-[#81D4FA]">
      Overall Total: ₹{total}
    </div>
  </div>
);

export default ExpenseHistory;
