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