import axios from "axios";

const API_URL = "http://localhost:5000/api/properties";

// Get token helper
const getAuthHeaders = () => {
  const token = localStorage.getItem("token");
  return token ? { Authorization: `Bearer ${token}` } : {};
};

// Fetch all or filtered properties
export const fetchProperties = async (state, city) => {
  const url = `${API_URL}?state=${state}&city=${city}`;
  const { data } = await axios.get(url, { headers: getAuthHeaders() });
  return data;
};

// Fetch logged-in user's properties
export const fetchMyProperties = async () => {
  const { data } = await axios.get(`${API_URL}/my`, { headers: getAuthHeaders() });
  return data;
};

// Add new property
export const addProperty = async (newProperty) => {
  const formData = new FormData();

  Object.keys(newProperty).forEach((key) => {
    if (key === "tags" && Array.isArray(newProperty.tags)) {
      newProperty.tags.forEach((tag) => formData.append("tags[]", tag));
    } else if (newProperty[key]) {
      formData.append(key, newProperty[key]);
    }
  });

  const { data } = await axios.post(API_URL, formData, {
    headers: { ...getAuthHeaders(), "Content-Type": "multipart/form-data" },
  });

  return data;
};

// Update property
export const updateProperty = async (id, updatedProperty) => {
  const formData = new FormData();

  Object.keys(updatedProperty).forEach((key) => {
    if (key === "tags" && Array.isArray(updatedProperty.tags)) {
      updatedProperty.tags.forEach((tag) => formData.append("tags[]", tag));
    } else if (key === "image" && !updatedProperty.image) {
      // Skip image if not updated
      return;
    } else if (updatedProperty[key]) {
      formData.append(key, updatedProperty[key]);
    }
  });

  const { data } = await axios.put(`${API_URL}/${id}`, formData, {
    headers: { ...getAuthHeaders(), "Content-Type": "multipart/form-data" },
    withCredentials: true,
  });

  return data;
};

// Delete property
export const deleteProperty = async (id) => {
  await axios.delete(`${API_URL}/${id}`, { headers: getAuthHeaders() });
};


// Fetch single property with tenant details
export const getPropertyById = async (id) => {
  try {
    const res = await axios.get(`${API_URL}/${id}`);
    return res.data;
  } catch (err) {
    console.error("Error fetching property:", err);
    throw err;
  }
};
