import axios from "axios";

const API_URL = "http://localhost:5000/api/users"; 

// Register user
export const registerUser = async (formData) => {
  try {
    const response = await axios.post("http://localhost:5000/api/users/register", formData, {
  headers: { "Content-Type": "multipart/form-data" },
});
    return response.data;
  } catch (error) {
    console.error("Error registering user:", error.response?.data || error.message);
    throw error.response?.data || { message: "Server error" };
  }
};

// Login user
export const loginUser = async (credentials) => {
  const res = await axios.post(`${API_URL}/login`, credentials);
  return res.data;
};


export const getUserProfile = async () => {
  const token = localStorage.getItem("token");

  if (!token) {
    throw new Error("No token found");
  }

  const res = await fetch("http://localhost:5000/api/users/profile", {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  if (!res.ok) {
    throw new Error("Failed to fetch profile");
  }

  return res.json();
};

// Update user profile
export const updateProfile = async (token, updatedData) => {
  const res = await axios.put(`${API}/profile`, updatedData, {
    headers: { Authorization: `Bearer ${token}` },
  });
  return res.data;
};