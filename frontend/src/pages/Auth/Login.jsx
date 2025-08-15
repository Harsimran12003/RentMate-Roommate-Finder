import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import loginIllustration from "/public/house.gif";
import Navbar from "../../components/Navbar";

const Login = () => {
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-blue-100 to-white">
      {/* Navbar */}
      <Navbar />

      {/* Login Content */}
      <div className="flex flex-1 items-center justify-center px-4">
        <div className="flex w-[70%] h-[440px] max-w-5xl rounded-3xl overflow-hidden shadow-2xl bg-white/40 backdrop-blur-lg">
          {/* Left Image Side */}
          <div className="w-1/2 hidden md:flex items-center justify-center bg-white p-6">
            <img
              src={loginIllustration}
              alt="Login"
              className="max-w-full h-auto"
            />
          </div>

          {/* Right Form Side */}
          <div className="w-full md:w-1/2 p-10">
            <h2 className="text-2xl font-bold mb-6 text-gray-800">
              Welcome Back 👋
            </h2>
            <form className="space-y-6">
              <div>
                <label className="block mb-2 text-gray-700">Email</label>
                <input
                  type="email"
                  placeholder="you@example.com"
                  className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-400"
                />
              </div>
              <div>
                <label className="block mb-2 text-gray-700">Password</label>
                <div className="relative">
                  <input
                    type={showPassword ? "text" : "password"}
                    placeholder="••••••••"
                    className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-400"
                  />
                  <button
                    type="button"
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500"
                    onClick={() => setShowPassword((prev) => !prev)}
                    tabIndex={-1}
                  >
                    {showPassword ? (
                      // Eye Open Icon
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-5 w-5"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                        />
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M2.458 12C3.732 7.943 7.523 5 12 5c4.477 0 
                             8.268 2.943 9.542 7-1.274 4.057-5.065 
                             7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
                        />
                      </svg>
                    ) : (
                      // Eye Closed Icon
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-5 w-5"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M13.875 18.825A10.05 10.05 0 0112 19
                             c-4.477 0-8.268-2.943-9.542-7a9.956 
                             9.956 0 012.442-4.362M6.634 
                             6.634A9.956 9.956 0 0112 5c4.477 
                             0 8.268 2.943 9.542 7a9.96 9.96 
                             0 01-4.293 5.255M3 3l18 18"
                        />
                      </svg>
                    )}
                  </button>
                </div>
              </div>
              <button
                type="button"
                onClick={() => navigate(`/dashboard`)}
                className="w-full py-3 bg-blue-500 hover:bg-blue-600 text-white rounded-xl text-lg font-semibold transition-all"
              >
                Login
              </button>
            </form>
            <p className="mt-6 text-center text-gray-600">
              Don't have an account?{" "}
              <Link to="/register" className="text-blue-500 hover:underline">
                Register Now
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
