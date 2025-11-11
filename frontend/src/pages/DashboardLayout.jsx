import React, { useEffect, useState } from "react";
import Sidebar from "../components/Sidebar";
import { getUserProfile } from "../services/userService";

const Dashboard = () => {
  const [user, setUser] = useState(null);
  const [showDisclaimer, setShowDisclaimer] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [tip, setTip] = useState("");
  const [habits, setHabits] = useState([
    { name: "Water plants 🌱", done: false },
    { name: "Pay rent 💰", done: false },
    { name: "Declutter room 🧹", done: false },
  ]);

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

  const hour = new Date().getHours();
  const greeting =
    hour < 12 ? "Good Morning" : hour < 18 ? "Good Afternoon" : "Good Evening";

  const toggleHabit = (index) => {
    const updatedHabits = [...habits];
    updatedHabits[index].done = !updatedHabits[index].done;
    setHabits(updatedHabits);
  };

  return (
    <div className="flex flex-col md:flex-row min-h-screen bg-gray-100 dark:bg-gray-900 text-gray-900 dark:text-white transition-colors">
      {/* Sidebar */}
      <Sidebar />

      {/* Main Dashboard */}
      <div className="flex-1 p-4 sm:p-6 md:p-8 space-y-5">
        {/* Greeting Section */}
        <div className="relative bg-gradient-to-r from-blue-400 to-blue-600 rounded-2xl shadow-lg p-6 md:p-8 flex flex-col md:flex-row items-center md:items-start">
          <div className="flex-1 text-center md:text-left">
            <h1 className="text-3xl sm:text-4xl font-bold text-white animate-pulse">
              {greeting}, {user.fullName}!
            </h1>
            <p className="text-white mt-2 opacity-90 text-sm sm:text-base">
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
            className="w-20 h-20 sm:w-28 sm:h-28 md:w-32 md:h-32 rounded-full object-cover border-4 border-white shadow-xl mt-4 md:mt-0 md:ml-6"
          />
        </div>

        {/* Getting Started Section */}
        <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-5 sm:p-6 animate-fadeIn">
          <h2 className="text-xl sm:text-2xl font-semibold mb-4">➡️ Getting Started</h2>
          <ol className="list-decimal list-inside space-y-3 text-gray-700 dark:text-gray-300 text-sm sm:text-base">
            <li>📝 Add your profile</li>
            <li>🏠 Browse available properties</li>
            <li>💬 Match with roommates and chat</li>
            <li>📅 Track your rent and expenses</li>
          </ol>
          <p className="mt-4 text-xs sm:text-sm text-gray-500 dark:text-gray-400">
            Follow these simple steps to get the most out of RentMate!
          </p>
        </div>

        {/* Disclaimer Section */}
        <div className="bg-white dark:bg-gray-800 shadow-md rounded-xl p-4 sm:p-6 animate-fadeIn transition-all duration-300">
          <div
            onClick={() => setShowDisclaimer(!showDisclaimer)}
            className="flex items-center justify-between cursor-pointer select-none"
          >
            <h2 className="text-lg sm:text-2xl font-semibold text-red-500">
              ⚠️ Disclaimer
            </h2>
            <span className="text-sm text-blue-600 dark:text-blue-400">
              {showDisclaimer ? "Hide" : "Read Disclaimer"}
            </span>
          </div>

          {showDisclaimer && (
            <p className="mt-3 text-gray-700 dark:text-gray-300 leading-relaxed text-sm sm:text-base transition-all duration-300">
              RentMate is under active development and may not be fully verified.
              Please verify all listings and profiles before making commitments.
              The developers are not liable for any misuse or discrepancies.
            </p>
          )}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
