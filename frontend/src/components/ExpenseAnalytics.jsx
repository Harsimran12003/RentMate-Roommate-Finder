import React from "react";
import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  Legend,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  ResponsiveContainer,
} from "recharts";

const ExpenseAnalytics = ({ expenses, groupedExpenses }) => {
  const paidByData = Object.values(
    expenses.reduce((acc, exp) => {
      const key = exp.paidBy?.fullName || exp.paidBy || "Unknown";
      acc[key] = acc[key] || { name: key, value: 0 };
      acc[key].value += Number(exp.amount) || 0;
      return acc;
    }, {})
  );

  const monthlyData = Object.entries(groupedExpenses).map(([month, data]) => ({
    month,
    total: data.total,
  }));

  const colors = ["#1565C0", "#00ACC1", "#FF7043", "#66BB6A", "#9C27B0"];

  return (
    <div className="bg-white dark:bg-gray-800 shadow-xl rounded-2xl p-6 mt-10 w-full">
      <h2 className="text-xl font-semibold mb-6 text-[#0D47A1] dark:text-[#80D8FF] text-center">
        Expense Analytics
      </h2>

      <div className="flex flex-col lg:flex-row flex-wrap gap-10 justify-center items-center">
        {/* Pie Chart */}
        <div className="w-full sm:w-[90%] md:w-[70%] lg:w-[45%]">
          <h3 className="text-lg font-medium mb-2 text-center text-gray-800 dark:text-gray-200">
            Expenses by Member
          </h3>
          {paidByData.length > 0 ? (
            <div className="w-full h-64 sm:h-80">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={paidByData}
                    dataKey="value"
                    nameKey="name"
                    cx="50%"
                    cy="50%"
                    outerRadius="70%"
                    label
                  >
                    {paidByData.map((entry, index) => (
                      <Cell
                        key={`cell-${index}`}
                        fill={colors[index % colors.length]}
                      />
                    ))}
                  </Pie>
                  <Tooltip />
                  <Legend />
                </PieChart>
              </ResponsiveContainer>
            </div>
          ) : (
            <p className="text-gray-500 dark:text-gray-400 text-center">
              No data available.
            </p>
          )}
        </div>

        {/* Bar Chart */}
        <div className="w-full sm:w-[90%] md:w-[70%] lg:w-[45%]">
          <h3 className="text-lg font-medium mb-2 text-center text-gray-800 dark:text-gray-200">
            Monthly Totals
          </h3>
          {monthlyData.length > 0 ? (
            <div className="w-full h-64 sm:h-80">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={monthlyData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="month" />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Bar dataKey="total" fill="#1565C0" />
                </BarChart>
              </ResponsiveContainer>
            </div>
          ) : (
            <p className="text-gray-500 dark:text-gray-400 text-center">
              No data available.
            </p>
          )}
        </div>
      </div>
    </div>
  );
};

export default ExpenseAnalytics;
