import axios from "axios";

const API = "http://localhost:5000/api";

export const getMatches = async (userId, token) => {
  const res = await axios.get(`${API}/matches/${userId}`, {
    headers: { Authorization: `Bearer ${token}` },
  });
  return res.data;
};
