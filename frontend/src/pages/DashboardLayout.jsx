import React from "react";
import { Link, Outlet, useLocation } from "react-router-dom";
import { FaHome, FaUser, FaComments, FaMoneyBill, FaBuilding, FaSignOutAlt } from "react-icons/fa";

const DashboardLayout = () => {
  const location = useLocation();
  const current = location.pathname;

  const navItems = [
    { name: "Dashboard", path: "/dashboard", icon: <FaHome /> },
    { name: "Profile", path: "/profile", icon: <FaUser /> },
    { name: "Properties", path: "/properties", icon: <FaBuilding /> },
    { name: "Matches", path: "/match", icon: <FaComments /> },
    { name: "Chat", path: "/chat", icon: <FaComments /> },
    { name: "Expenses", path: "/expenses", icon: <FaMoneyBill /> },
  ];

  return (
    <div className="flex min-h-screen bg-gray-100">
      {/* Sidebar */}
      <aside className="w-64 bg-[#00796B] text-white p-6 space-y-6 shadow-lg">
        <h1 className="text-3xl font-bold mb-10">RentMate</h1>

        <nav className="space-y-4">
          {navItems.map((item) => (
            <Link
              key={item.path}
              to={item.path}
              className={`flex items-center gap-3 px-4 py-2 rounded-lg transition hover:bg-[#004D40] ${
                current === item.path ? "bg-[#004D40]" : ""
              }`}
            >
              {item.icon}
              {item.name}
            </Link>
          ))}
        </nav>

        <div className="mt-auto">
          <Link
            to="/logout"
            className="flex items-center gap-3 px-4 py-2 rounded-lg transition hover:bg-red-600 bg-red-500"
          >
            <FaSignOutAlt />
            Logout
          </Link>
        </div>
      </aside>

      {/* Main Content */}
      <div className="flex-1 flex flex-col">
        {/* Topbar */}
        <header className="bg-white shadow px-6 py-4 flex justify-between items-center">
          <h2 className="text-xl font-semibold text-gray-800">
            {navItems.find((item) => item.path === current)?.name || "Dashboard"}
          </h2>
          <div className="text-gray-600">Welcome, User 👋</div>
        </header>

        {/* Page Content */}
        <main className="p-6 bg-gray-50 flex-1 overflow-y-auto">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default DashboardLayout;
