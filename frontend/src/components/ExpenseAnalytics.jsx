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
    <div className="bg-white shadow-xl rounded-2xl p-6 mt-10">
      <h2 className="text-xl font-semibold mb-6 text-[#0D47A1] text-center">
        Expense Analytics
      </h2>
      <div className="flex flex-wrap gap-10 justify-center">
        {/* Pie Chart */}
        <div>
          <h3 className="text-lg font-medium mb-2 text-center">
            Expenses by Member
          </h3>
          {paidByData.length > 0 ? (
            <PieChart width={400} height={300}>
              <Pie
                data={paidByData}
                dataKey="value"
                nameKey="name"
                cx="50%"
                cy="50%"
                outerRadius={100}
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
          ) : (
            <p className="text-gray-500">No data available.</p>
          )}
        </div>

        {/* Bar Chart */}
        <div>
          <h3 className="text-lg font-medium mb-2 text-center">
            Monthly Totals
          </h3>
          {monthlyData.length > 0 ? (
            <BarChart width={500} height={300} data={monthlyData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="month" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Bar dataKey="total" fill="#1565C0" />
            </BarChart>
          ) : (
            <p className="text-gray-500">No data available.</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default ExpenseAnalytics;
