// src/pages/Dashboard.jsx
import React, { useEffect, useState } from "react";
import Sidebar from "../components/Sidebar";
import { getUserProfile } from "../services/userService";
import {
  FaHome,
  FaUserFriends,
  FaComments,
  FaBuilding,
} from "react-icons/fa";

const Dashboard = () => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const data = await getUserProfile();
        setUser(data);
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
        Loading profile...
      </div>
    );

  if (error)
    return (
      <div className="flex items-center justify-center min-h-screen text-red-500">
        {error}
      </div>
    );

  return (
    <div className="flex bg-gray-100 dark:bg-gray-900 min-h-screen text-gray-900 dark:text-white">
      {/* Sidebar */}
      <Sidebar />

      {/* Dashboard Content */}
      <div className="flex-1 p-8">
        {/* Welcome Section */}
        <div className="flex items-center bg-white dark:bg-gray-800 shadow-md rounded-xl p-6 mb-8">
          {/* Profile Photo */}
          <img
            src={
              user?.profilePhoto
                ? `http://localhost:5000${user.profilePhoto}`
                : "https://via.placeholder.com/80"
            }
            alt="Profile"
            className="w-20 h-20 rounded-full object-cover border-4 border-blue-500 shadow-md mr-6"
          />
          <div>
            <h1 className="text-3xl font-bold">
              Welcome, {user?.fullName} 
            </h1>
            <p className="text-gray-500 dark:text-gray-400 mt-1">
              Last login:{" "}
              {user?.lastLogin
                ? new Date(user.lastLogin).toLocaleString()
                : "First time login"}
            </p>
          </div>
        </div>

        {/* Stats Section */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <div className="bg-white dark:bg-gray-800 shadow rounded-xl p-6 text-center hover:shadow-lg transition">
            <FaBuilding className="text-3xl text-blue-500 mx-auto mb-2" />
            <h2 className="text-lg font-semibold">Properties</h2>
            <p className="text-2xl font-bold text-blue-600">
              {user?.properties?.length || 0}
            </p>
          </div>

          <div className="bg-white dark:bg-gray-800 shadow rounded-xl p-6 text-center hover:shadow-lg transition">
            <FaUserFriends className="text-3xl text-green-500 mx-auto mb-2" />
            <h2 className="text-lg font-semibold">Matches</h2>
            <p className="text-2xl font-bold text-green-600">
              {user?.matches?.length || 0}
            </p>
          </div>

          <div className="bg-white dark:bg-gray-800 shadow rounded-xl p-6 text-center hover:shadow-lg transition">
            <FaComments className="text-3xl text-yellow-500 mx-auto mb-2" />
            <h2 className="text-lg font-semibold">Chats</h2>
            <p className="text-2xl font-bold text-yellow-600">
              {user?.chats?.length || 0}
            </p>
          </div>

          <div className="bg-white dark:bg-gray-800 shadow rounded-xl p-6 text-center hover:shadow-lg transition">
            <FaHome className="text-3xl text-purple-500 mx-auto mb-2" />
            <h2 className="text-lg font-semibold">Total Rent Spent</h2>
            <p className="text-2xl font-bold text-purple-600">
              ₹{user?.expenses || 0}
            </p>
          </div>
        </div>

        {/* Recent Activity Section */}
        <div className="mt-10 bg-white dark:bg-gray-800 rounded-xl p-6 shadow-md">
          <h2 className="text-xl font-semibold mb-4">Recent Activity</h2>
          <ul className="space-y-3 text-gray-600 dark:text-gray-300">
            <li>🏠 You added a new property.</li>
            <li>🤝 You matched with 2 new roommates.</li>
            <li>💬 You started a new chat.</li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
