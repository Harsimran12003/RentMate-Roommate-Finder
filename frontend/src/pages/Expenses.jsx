import React, { useEffect, useState } from "react";
import Sidebar from "../components/Sidebar";
import {
  fetchGroups,
  createGroup,
  fetchGroupMembers,
  deleteGroup,
  searchUsers,
} from "../services/groupService";
import {
  fetchExpenses,
  addExpense,
  deleteExpense,
} from "../services/expensesService";

import GroupSection from "../components/GroupSection";
import AddExpenseForm from "../components/AddExpenseForm";
import ExpenseHistory from "../components/ExpenseHistory";
import ExpenseAnalytics from "../components/ExpenseAnalytics";

const Expenses = () => {
  const [groups, setGroups] = useState([]);
  const [selectedGroup, setSelectedGroup] = useState(null);
  const [members, setMembers] = useState([]);
  const [expenses, setExpenses] = useState([]);
  const [loading, setLoading] = useState(false);

  const currentUser = JSON.parse(localStorage.getItem("user"));

  // Utility: group expenses by month
  const groupByMonth = (expenses) => {
    const grouped = {};
    expenses.forEach((exp) => {
      const date = new Date(exp.date);
      const monthYear = date.toLocaleString("default", {
        month: "long",
        year: "numeric",
      });

      if (!grouped[monthYear]) {
        grouped[monthYear] = { total: 0, items: [] };
      }
      grouped[monthYear].items.push(exp);
      grouped[monthYear].total += Number(exp.amount) || 0;
    });
    return grouped;
  };

  // Load Groups
  useEffect(() => {
    const load = async () => {
      const data = await fetchGroups();
      setGroups(data);
      if (data.length > 0) setSelectedGroup(data[0]._id);
    };
    load();
  }, []);

  // Load Members
  useEffect(() => {
    if (!selectedGroup) return;
    const loadMembers = async () => {
      const data = await fetchGroupMembers(selectedGroup);
      setMembers(data);
    };
    loadMembers();
  }, [selectedGroup]);

  // Load Expenses
  useEffect(() => {
    if (!selectedGroup) return;
    const loadExpenses = async () => {
      setLoading(true);
      try {
        const data = await fetchExpenses(selectedGroup);
        setExpenses(data);
      } catch (err) {
        console.error("Error fetching expenses:", err);
      } finally {
        setLoading(false);
      }
    };
    loadExpenses();
  }, [selectedGroup]);

  // Add Expense
  const handleAddExpense = async (newExpense) => {
    const created = await addExpense({
      ...newExpense,
      amount: parseFloat(newExpense.amount),
      groupId: selectedGroup,
    });
    setExpenses([...expenses, created]);
  };

  // Delete Expense
  const handleDeleteExpense = async (id) => {
    if (!window.confirm("Delete this expense?")) return;
    await deleteExpense(id);
    setExpenses(expenses.filter((e) => e._id !== id));
  };

  const groupedExpenses = groupByMonth(expenses);
  const total = expenses.reduce((sum, exp) => sum + (Number(exp.amount) || 0), 0);

  return (
    <div className="flex flex-col md:flex-row min-h-screen">
      {/* Sidebar */}
      <div className="w-full md:w-64">
        <Sidebar />
      </div>

      {/* Main Content */}
      <div className="flex-1 bg-gradient-to-br from-blue-100 via-white to-blue-50 px-4 sm:px-6 md:px-8 py-8 overflow-x-hidden">
        <h1 className="text-3xl md:text-4xl font-bold text-center mb-8 text-[#1565C0]">
          Shared Expenses
        </h1>

        {/* Groups Section */}
        <div className="mb-8">
          <GroupSection
            groups={groups}
            setGroups={setGroups}
            selectedGroup={selectedGroup}
            setSelectedGroup={setSelectedGroup}
            currentUser={currentUser}
            createGroup={createGroup}
            deleteGroup={deleteGroup}
            searchUsers={searchUsers}
          />
        </div>

        {/* Expense Section */}
        {selectedGroup && (
          <div className="max-w-5xl mx-auto w-full space-y-8">
            <AddExpenseForm members={members} onAddExpense={handleAddExpense} />

            <div className="overflow-x-auto">
              <ExpenseHistory
                groupedExpenses={groupedExpenses}
                loading={loading}
                total={total}
                onDelete={handleDeleteExpense}
              />
            </div>

            <div className="w-full">
              <ExpenseAnalytics
                expenses={expenses}
                groupedExpenses={groupedExpenses}
              />
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Expenses;
