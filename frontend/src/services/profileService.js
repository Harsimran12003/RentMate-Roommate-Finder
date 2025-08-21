import axios from "axios";

const API_URL = "http://localhost:5000/api/users";

// Update user profile
export const updateUserProfile = async (token, payload, file = null) => {
  let res;

  if (file) {
    const form = new FormData();
    Object.entries(payload).forEach(([k, v]) => form.append(k, v ?? ""));
    form.append("profilePhoto", file); 
    res = await axios.put(`${API_URL}/profile`, form, {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "multipart/form-data",
      },
    });
  } else {
    res = await axios.put(`${API_URL}/profile`, payload, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
  }

  return res.data;
};


// Fetch user profile
export const getUserProfile = async (token) => {
  const res = await axios.get(`${API_URL}/profile`, {
    headers: { Authorization: `Bearer ${token}` },
  });
  return res.data;
};
