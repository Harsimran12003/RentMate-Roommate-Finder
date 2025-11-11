import React, { useState, useEffect } from "react";
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
  const [mobileOpen, setMobileOpen] = useState(false);
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

  useEffect(() => {
    localStorage.setItem("sidebarCollapsed", JSON.stringify(collapsed));
  }, [collapsed]);

  return (
    <>
      {/* ✅ Mobile Toggle Button (only visible when sidebar is hidden) */}
      {!mobileOpen && (
        <button
          onClick={() => setMobileOpen(true)}
          className="md:hidden fixed top-4 left-4 z-50 bg-blue-500 text-white p-3 rounded-lg shadow-lg"
        >
          <FaBars />
        </button>
      )}

      {/* Sidebar */}
      <div
        className={`fixed md:static z-40 h-screen ${
          collapsed ? "w-20" : "w-64"
        } bg-gradient-to-b from-blue-400 via-blue-500 to-blue-600 text-white flex flex-col py-6 px-3 shadow-xl transition-all duration-300 rounded-r-3xl 
        ${mobileOpen ? "translate-x-0" : "-translate-x-full md:translate-x-0"} 
        md:sticky top-0`}
      >
        {/* Top Section */}
        <div className="flex items-center justify-between px-2 mb-10">
          {!collapsed && (
            <div className="flex items-center space-x-2">
              <img src="/logo1.png" alt="RentMate Logo" className="w-28 h-auto" />
            </div>
          )}
          <button
            onClick={() =>
              window.innerWidth < 768
                ? setMobileOpen(false)
                : setCollapsed(!collapsed)
            }
            className="text-white hover:bg-blue-500 p-2 rounded-lg cursor-pointer"
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
                onClick={() => window.innerWidth < 768 && setMobileOpen(false)}
                className={`flex items-center w-full ${
                  collapsed ? "justify-center" : "px-4 justify-start"
                } py-3 rounded-xl transition-all duration-300 relative group ${
                  location.pathname === item.path
                    ? "bg-white text-blue-600 shadow-md"
                    : "text-white hover:bg-blue-500 hover:text-white"
                }`}
              >
                <span className="text-lg">{item.icon}</span>
                {!collapsed && <span className="ml-3 font-medium">{item.label}</span>}
                {collapsed && (
                  <span className="absolute left-full ml-3 px-3 py-1 bg-black text-white text-xs rounded opacity-0 group-hover:opacity-100 transition whitespace-nowrap">
                    {item.label}
                  </span>
                )}
              </Link>
            </li>
          ))}
        </ul>

        {/* Logout */}
        <div className="mt-auto">
          <button
            onClick={() => navigate("/")}
            className={`flex items-center w-full cursor-pointer ${
              collapsed ? "justify-center" : "px-4 justify-start"
            } py-3 rounded-xl transition-all duration-300 relative group text-red-400 hover:bg-red-600 hover:text-white`}
          >
            <FaSignOutAlt />
            {!collapsed && <span className="ml-3 font-medium">Logout</span>}
          </button>
        </div>
      </div>
    </>
  );
};

export default Sidebar;
