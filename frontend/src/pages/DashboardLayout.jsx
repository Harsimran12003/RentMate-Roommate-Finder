// src/pages/Dashboard.jsx
import React, { useEffect, useState } from "react";
import Sidebar from "../components/Sidebar";
import { getUserProfile } from "../services/userService";

const Dashboard = () => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [tip, setTip] = useState("");
  const [habits, setHabits] = useState([
    { name: "Water plants 🌱", done: false },
    { name: "Pay rent 💰", done: false },
    { name: "Declutter room 🧹", done: false },
  ]);

  // List of daily tips
  const tips = [
    "🏡 Declutter one corner of your property today!",
    "💬 Reach out to a new roommate and say hi!",
    "📷 Update your profile photo for better matches!",
    "🛋️ Try rearranging your room for a fresh look!",
    "📅 Review your rent payments for this month!",
  ];

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const data = await getUserProfile();
        setUser(data);

        // Random tip of the day
        setTip(tips[Math.floor(Math.random() * tips.length)]);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchProfile();
  }, []);

  if (loading)
    return (
      <div className="flex items-center justify-center min-h-screen text-gray-600">
        Loading dashboard...
      </div>
    );

  if (error)
    return (
      <div className="flex items-center justify-center min-h-screen text-red-500">
        {error}
      </div>
    );

  // Get greeting based on time
  const hour = new Date().getHours();
  const greeting =
    hour < 12 ? "Good Morning" : hour < 18 ? "Good Afternoon" : "Good Evening";

  const toggleHabit = (index) => {
    const updatedHabits = [...habits];
    updatedHabits[index].done = !updatedHabits[index].done;
    setHabits(updatedHabits);
  };

  return (
    <div className="flex min-h-screen bg-gray-100 dark:bg-gray-900 text-gray-900 dark:text-white transition-colors">
      {/* Sidebar */}
      <Sidebar />

      {/* Main Dashboard */}
      <div className="flex-1 p-8 space-y-8">
        {/* Animated Greeting Section */}
        <div className="relative bg-gradient-to-r from-blue-400 to-blue-600 rounded-2xl shadow-lg p-8 flex items-center">
          <div>
            <h1 className="text-5xl md:text-4xl font-bold text-white animate-pulse">
              {greeting}, {user.fullName}!
            </h1>
            <p className="text-white mt-2 opacity-90">
              Last login:{" "}
              {user.lastLogin
                ? new Date(user.lastLogin).toLocaleString()
                : "First time login"}
            </p>
          </div>
          <img
            src={
              user.profilePhoto
                ? `http://localhost:5000${user.profilePhoto}`
                : "https://via.placeholder.com/100"
            }
            alt="Profile"
            className="w-24 h-24 md:w-32 md:h-32 rounded-full object-cover border-4 border-white shadow-xl absolute -right-0 top-1/2 transform -translate-y-1/2"
          />
        </div>

        {/* Daily Tip Card */}
        <div className="bg-white dark:bg-gray-800 shadow-md rounded-xl p-6 animate-fadeIn">
          <h2 className="text-2xl font-semibold mb-3">💡 Tip of the Day</h2>
          <p className="text-gray-700 dark:text-gray-300">{tip}</p>
        </div>

{/* // Quick How-To Card (Replacing Habit Tracker) */}
<div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-6 animate-fadeIn">
  <h2 className="text-2xl font-semibold mb-4">➡️ Getting Started</h2>
  <ol className="list-decimal list-inside space-y-3 text-gray-700 dark:text-gray-300">
    <li className="flex items-center gap-2">
      <span className="text-blue-500 text-lg">📝</span>
      Add your profile 
    </li>
    <li className="flex items-center gap-2">
      <span className="text-green-500 text-lg">🏠</span>
      Browse available properties
    </li>
    <li className="flex items-center gap-2">
      <span className="text-purple-500 text-lg">💬</span>
      Match with roommates and chat
    </li>
    <li className="flex items-center gap-2">
      <span className="text-yellow-500 text-lg">📅</span>
      Track your rent and expenses
    </li>
  </ol>
  <p className="mt-4 text-sm text-gray-500 dark:text-gray-400">
    Follow these simple steps to get the most out of RentMate!
  </p>
</div>

      </div>
    </div>
  );
};

export default Dashboard;
