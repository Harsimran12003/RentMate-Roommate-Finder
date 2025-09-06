import axios from "axios";

const API_URL = "http://localhost:5000/api/groups";

const getAuthHeaders = () => {
  const token = localStorage.getItem("token");
  return token ? { Authorization: `Bearer ${token}` } : {};
};

// ✅ Fetch all groups
export const fetchGroups = async () => {
  const res = await axios.get(API_URL, { headers: getAuthHeaders() });
  return res.data;
};

// ✅ Create new group
export const createGroup = async (groupData) => {
    console.log("📤 Sending groupData:", groupData); // 👈 add this

  const res = await axios.post(API_URL, groupData, { headers: getAuthHeaders() });
  return res.data;
};

// ✅ Fetch group members
export const fetchGroupMembers = async (groupId) => {
  const res = await axios.get(`${API_URL}/${groupId}/members`, { headers: getAuthHeaders() });
  return res.data;
};

// ✅ Delete a group
export const deleteGroup = async (groupId) => {
  const res = await axios.delete(`${API_URL}/${groupId}`, { headers: getAuthHeaders() });
  return res.data;
};

// ✅ Search users for dropdown
export const searchUsers = async (query) => {
  const res = await axios.get(`${API_URL}/search/users?q=${query}`, { headers: getAuthHeaders() });
  return res.data;
};
