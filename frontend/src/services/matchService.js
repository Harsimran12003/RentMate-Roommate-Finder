import axios from "axios";

const API = "https://rent-mate-backend.vercel.app/api";

export const getMatches = async (userId, token) => {
  const res = await axios.get(`${API}/matches/${userId}`, {
    headers: { Authorization: `Bearer ${token}` },
  });
  return res.data;
};
