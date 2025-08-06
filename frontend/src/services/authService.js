const API_BASE_URL = 'https://your-backend-url.com/api/auth'; // change to your actual backend URL

// Register User
export const registerUser = async (userData) => {
  try {
    const res = await fetch(`${API_BASE_URL}/register`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(userData),
    });

    const data = await res.json();
    if (!res.ok) throw new Error(data.message || 'Registration failed');
    return data;
  } catch (err) {
    throw err;
  }
};

// Login User
export const loginUser = async (credentials) => {
  try {
    const res = await fetch(`${API_BASE_URL}/login`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(credentials),
    });

    const data = await res.json();
    if (!res.ok) throw new Error(data.message || 'Login failed');
    return data;
  } catch (err) {
    throw err;
  }
};

// Logout (if token is stored in localStorage or cookies)
export const logoutUser = () => {
  localStorage.removeItem('token'); // or clear cookie if used
};
