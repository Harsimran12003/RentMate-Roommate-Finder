
import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { SunIcon, MoonIcon } from "@heroicons/react/24/outline";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [darkMode, setDarkMode] = useState(
    localStorage.getItem("theme") === "dark"
  );

  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add("dark");
      localStorage.setItem("theme", "dark");
    } else {
      document.documentElement.classList.remove("dark");
      localStorage.setItem("theme", "light");
    }
  }, [darkMode]);

  return (
    <nav className="bg-white dark:bg-gray-900 shadow-md sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <div className="flex-shrink-0">
            <Link to="/" className="text-2xl font-bold text-[#00ACC1] dark:text-white">
              RentMate
            </Link>
          </div>

          {/* Desktop Menu */}
          <div className="hidden md:flex space-x-6">
            <Link to="/profile" className="text-gray-700 dark:text-gray-200 hover:text-[#00ACC1] transition">
              Profile
            </Link>
            <Link to="/properties" className="text-gray-700 dark:text-gray-200 hover:text-[#00ACC1] transition">
              Properties
            </Link>
            <Link to="/matches" className="text-gray-700 dark:text-gray-200 hover:text-[#00ACC1] transition">
              Matches
            </Link>
            <Link to="/chat" className="text-gray-700 dark:text-gray-200 hover:text-[#00ACC1] transition">
              Chat
            </Link>
          </div>

          {/* Right Icons */}
          <div className="flex items-center space-x-4">
            <button
              onClick={() => setDarkMode(!darkMode)}
              className="text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white transition"
            >
              {darkMode ? <SunIcon className="h-6 w-6" /> : <MoonIcon className="h-6 w-6" />}
            </button>
            <button
              className="md:hidden focus:outline-none text-gray-700 dark:text-gray-300"
              onClick={() => setIsOpen(!isOpen)}
            >
              ☰
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="md:hidden px-4 pb-4 space-y-2 bg-white dark:bg-gray-800">
          <Link to="/profile" className="block text-gray-700 dark:text-gray-200 hover:text-[#00ACC1]">
            Profile
          </Link>
          <Link to="/properties" className="block text-gray-700 dark:text-gray-200 hover:text-[#00ACC1]">
            Properties
          </Link>
          <Link to="/matches" className="block text-gray-700 dark:text-gray-200 hover:text-[#00ACC1]">
            Matches
          </Link>
          <Link to="/chat" className="block text-gray-700 dark:text-gray-200 hover:text-[#00ACC1]">
            Chat
          </Link>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
