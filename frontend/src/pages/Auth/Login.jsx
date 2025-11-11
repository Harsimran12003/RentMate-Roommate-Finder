import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { loginUser } from "../../services/userService";
import loginIllustration from "/public/house.png";
import Navbar from "../../components/Navbar";

const Login = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    try {
      const data = await loginUser({ email, password });
      localStorage.setItem("token", data.token);
      localStorage.setItem("user", JSON.stringify(data.user));
      navigate("/dashboard");
    } catch (err) {
      setError(err.response?.data?.message || "Login failed");
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-blue-100 to-white">
      <Navbar />

      <div className="flex flex-1 items-center justify-center px-4 py-8 sm:py-12">
        {/* Main Card */}
        <div className="flex flex-col md:flex-row w-full md:w-[80%] lg:w-[70%] xl:w-[60%] rounded-3xl overflow-hidden shadow-2xl bg-white/50 backdrop-blur-lg">

          {/* Left Illustration */}
          <div className="hidden md:flex w-1/2 items-center justify-center bg-white p-6">
            <img
              src={loginIllustration}
              alt="Login Illustration"
              className="w-3/4 max-w-[350px] h-auto"
            />
          </div>

          {/* Right Form */}
          <div className="w-full md:w-1/2 p-6 sm:p-8 md:p-10 flex flex-col justify-center">
            <h2 className="text-3xl font-bold mb-6 text-gray-800 text-center md:text-left">
              Welcome Back 👋
            </h2>

            {error && <p className="text-red-500 mb-4 text-center md:text-left">{error}</p>}

            <form onSubmit={handleSubmit} className="space-y-5">
              {/* Email */}
              <div>
                <label className="block mb-2 text-gray-700">Email</label>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="you@example.com"
                  className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-400"
                  required
                />
              </div>

              {/* Password */}
              <div>
                <label className="block mb-2 text-gray-700">Password</label>
                <div className="relative">
                  <input
                    type={showPassword ? "text" : "password"}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="••••••••"
                    className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-400"
                    required
                  />
                  <button
                    type="button"
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500"
                    onClick={() => setShowPassword((prev) => !prev)}
                    tabIndex={-1}
                  >
                    {showPassword ? (
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

              {/* Submit Button */}
              <button
                type="submit"
                className="w-full py-3 bg-blue-500 hover:bg-blue-600 text-white rounded-xl text-lg font-semibold transition-all"
              >
                Login
              </button>
            </form>

            {/* Footer Text */}
            <p className="mt-6 text-center text-gray-600 text-sm sm:text-base">
              Don't have an account?{" "}
              <Link to="/register" className="text-blue-500 hover:underline font-medium">
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
