import axios from "axios";

const API_URL = "http://localhost:5000/api/expenses";

const getAuthHeaders = () => {
  const token = localStorage.getItem("token");
  return token ? { Authorization: `Bearer ${token}` } : {};
};

// ✅ Fetch expenses for a group
export const fetchExpenses = async (groupId) => {
  const res = await axios.get(`${API_URL}/${groupId}`, { headers: getAuthHeaders() });
  return res.data;
};

// ✅ Add a new expense
export const addExpense = async (expense) => {
  const res = await axios.post(API_URL, expense, { headers: getAuthHeaders() });
  return res.data;
};

// ✅ Delete expense
export const deleteExpense = async (id) => {
  const res = await axios.delete(`${API_URL}/${id}`, { headers: getAuthHeaders() });
  return res.data;
};
