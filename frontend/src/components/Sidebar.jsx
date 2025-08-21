import React, { useState } from "react";
import {
  FaHome,
  FaUser,
  FaBuilding,
  FaHeart,
  FaComments,
  FaMoneyBill,
  FaSignOutAlt,
  FaBars,
} from "react-icons/fa";
import { Link, useLocation, useNavigate } from "react-router-dom";

const Sidebar = () => {
  const [collapsed, setCollapsed] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  const menuItems = [
    { id: "home", path: "/dashboard", label: "Home", icon: <FaHome /> },
    { id: "profile", path: "/profile", label: "Profile", icon: <FaUser /> },
    { id: "properties", path: "/properties", label: "Properties", icon: <FaBuilding /> },
    { id: "matches", path: "/match", label: "Matches", icon: <FaHeart /> },
    { id: "chat", path: "/chat", label: "Chat", icon: <FaComments /> },
    { id: "expenses", path: "/expenses", label: "Expenses", icon: <FaMoneyBill /> },
  ];

  return (
    <div
      className={`h-screen ${
        collapsed ? "w-20" : "w-64"
      } bg-gradient-to-b from-blue-400 via-blue-500 to-blue-600 text-white flex flex-col py-6 px-3 shadow-xl transition-all duration-300 rounded-r-3xl`}
    >
      {/* Top Section with RentMate Logo */}
      <div className="flex items-center justify-between px-2 mb-10">
        {!collapsed && (
          <div className="flex items-center space-x-2">
            <img src="/favicon.png" alt="RentMate Logo" className="w-10 h-10 rounded-[3px]" />
            <h2 className="text-xl font-bold tracking-wide">RentMate</h2>
          </div>
        )}
        <button
          onClick={() => setCollapsed(!collapsed)}
          className="text-white hover:bg-blue-500 p-2 rounded-lg"
        >
          <FaBars />
        </button>
      </div>

      {/* Menu Items */}
      <ul className="flex-1 space-y-3">
        {menuItems.map((item) => (
          <li key={item.id}>
            <Link
              to={item.path}
              className={`flex items-center w-full ${
                collapsed ? "justify-center" : "px-4 justify-start"
              } py-3 rounded-xl transition-all duration-300 relative group ${
                location.pathname === item.path
                  ? "bg-white text-blue-600 shadow-md"
                  : "text-white-100 hover:bg-blue-500 hover:text-white"
              }`}
            >
              <span className="text-lg">{item.icon}</span>
              {!collapsed && (
                <span className="ml-3 font-medium">{item.label}</span>
              )}

              {/* Tooltip when collapsed */}
              {collapsed && (
                <span className="absolute left-full ml-3 px-3 py-1 bg-black text-white text-xs rounded opacity-0 group-hover:opacity-100 transition whitespace-nowrap">
                  {item.label}
                </span>
              )}
            </Link>
          </li>
        ))}
      </ul>

      {/* Logout Button */}
      <div className="mt-auto">
        <button
          onClick={() => navigate("/")}
          className={`flex items-center w-full ${
            collapsed ? "justify-center" : "px-4 justify-start"
          } py-3 rounded-xl transition-all duration-300 relative group text-red-400 hover:bg-red-600 hover:text-white`}
        >
          <FaSignOutAlt />
          {!collapsed && <span className="ml-3 font-medium">Logout</span>}
          {collapsed && (
            <span className="absolute left-full ml-3 px-3 py-1 bg-black text-white text-xs rounded opacity-0 group-hover:opacity-100 transition whitespace-nowrap">
              Logout
            </span>
          )}
        </button>
      </div>
    </div>
  );
};

export default Sidebar;
