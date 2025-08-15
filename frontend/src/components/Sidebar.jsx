import React, { useState, useEffect } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import {
  HomeIcon,
  UserCircleIcon,
  ChatBubbleLeftRightIcon,
  MoonIcon,
  SunIcon,
  BuildingOffice2Icon,
  UserGroupIcon,
  CurrencyRupeeIcon,
  Bars3BottomLeftIcon,
  ArrowRightOnRectangleIcon,
} from "@heroicons/react/24/outline";
import Logo from "/public/favicon.png";

const Sidebar = () => {
  const [isOpen, setIsOpen] = useState(true);
  const [darkMode, setDarkMode] = useState(
    localStorage.getItem("theme") === "dark"
  );
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    // Toggle custom dark class
    if (darkMode) {
      document.body.classList.add("custom-dark");
      localStorage.setItem("theme", "dark");
    } else {
      document.body.classList.remove("custom-dark");
      localStorage.setItem("theme", "light");
    }
  }, [darkMode]);

  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  };

  const handleLogout = () => {
    // Clear auth, then redirect (modify as needed)
    localStorage.removeItem("token");
    navigate("/login");
  };

  const navLinks = [
    { name: "Home", path: "/", icon: HomeIcon },
    { name: "Profile", path: "/profile", icon: UserCircleIcon },
    { name: "Properties", path: "/properties", icon: BuildingOffice2Icon },
    { name: "Matches", path: "/matches", icon: UserGroupIcon },
    { name: "Chat", path: "/chat", icon: ChatBubbleLeftRightIcon },
    { name: "Expenses", path: "/expenses", icon: CurrencyRupeeIcon },
  ];

  return (
    <>
      {/* Sidebar */}
      <div
        className={`fixed top-0 left-0 h-full bg-white dark:bg-gray-900 border-r border-gray-200 dark:border-gray-700 z-50 transform transition-transform duration-300 ease-in-out ${
          isOpen ? "w-64" : "w-20"
        }`}
      >
        {/* Logo and Toggle */}
        <div className="flex items-center justify-between px-4 py-3 border-b border-gray-200 dark:border-gray-700">
          <Link to="/" className="flex items-center gap-2">
            <img src={Logo} alt="RentMate Logo" className="h-8 w-8" />
            {isOpen && (
              <span className="text-xl font-bold text-gray-800 dark:text-white">
                RentMate
              </span>
            )}
          </Link>
          <button
            onClick={toggleSidebar}
            className="text-gray-600 dark:text-gray-300 focus:outline-none"
          >
            <Bars3BottomLeftIcon className="w-6 h-6" />
          </button>
        </div>

        {/* Navigation */}
        <div className="flex flex-col mt-4 space-y-2">
          {navLinks.map(({ name, path, icon: Icon }) => (
            <Link
              to={path}
              key={name}
              className={`flex items-center px-4 py-2 rounded-md mx-2 gap-3 font-medium transition duration-200 ${
                location.pathname === path
                  ? "bg-[#00ACC1] text-white"
                  : "text-gray-700 dark:text-gray-300 hover:bg-[#00ACC1]/10"
              }`}
            >
              <Icon className="w-5 h-5" />
              {isOpen && <span>{name}</span>}
            </Link>
          ))}
        </div>

        {/* Bottom Section */}
        <div className="absolute bottom-5 w-full px-4 flex flex-col gap-2">
          {/* Dark Mode Toggle */}
          <button
            onClick={() => setDarkMode(!darkMode)}
            className="w-full flex items-center justify-center gap-2 py-2 rounded-md text-sm font-medium text-gray-800 dark:text-gray-100 bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700 transition"
          >
            {darkMode ? (
              <>
                <SunIcon className="w-5 h-5" />
                {isOpen && <span>Light Mode</span>}
              </>
            ) : (
              <>
                <MoonIcon className="w-5 h-5" />
                {isOpen && <span>Dark Mode</span>}
              </>
            )}
          </button>

          {/* Logout Button */}
          <button
            onClick={handleLogout}
            className="w-full flex items-center justify-center gap-2 py-2 rounded-md text-sm font-medium text-red-600 bg-red-100 dark:bg-red-800 dark:text-white hover:bg-red-200 dark:hover:bg-red-700 transition"
          >
            <ArrowRightOnRectangleIcon className="w-5 h-5" />
            {isOpen && <span>Logout</span>}
          </button>
        </div>
      </div>

      {/* Content Padding */}
      <div className={`transition-all duration-300 ${isOpen ? "ml-64" : "ml-20"} p-4`}>
        {/* Page content here */}
      </div>
    </>
  );
};

export default Sidebar;
