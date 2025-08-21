import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Navbar from "../../components/Navbar";
import { registerUser } from "../../services/userService";

const Register = () => {
  const navigate = useNavigate();

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [profilePhoto, setProfilePhoto] = useState(null);
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    password: "",
    confirmPassword: "",
    gender: "",
    phone: "",
    age: "",
    city: "",
    occupation: "",
    hobbies: "",
    habits: [],
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");


  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));

    // Check password match live
    if (
      name === "confirmPassword" ||
      (name === "password" && formData.confirmPassword)
    ) {
      if (name === "confirmPassword" && value !== formData.password) {
        setError("Passwords do not match");
      } else if (
        name === "password" &&
        formData.confirmPassword &&
        formData.confirmPassword !== value
      ) {
        setError("Passwords do not match");
      } else {
        setError("");
      }
    }
  };

  const handleCheckbox = (habit) => {
    setFormData((prev) => {
      if (prev.habits.includes(habit)) {
        return { ...prev, habits: prev.habits.filter((h) => h !== habit) };
      } else {
        return { ...prev, habits: [...prev.habits, habit] };
      }
    });
  };

  //  photo upload
  const handlePhotoUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      setProfilePhoto(file);
    }
  };

  // delete photo
  const handlePhotoDelete = () => {
    setProfilePhoto(null);
  };

  // submit form
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (formData.password !== formData.confirmPassword) {
      setError("Passwords do not match");
      return;
    }

    setError("");
    setLoading(true);

    try {

      const submitData = new FormData();
      Object.keys(formData).forEach((key) => {
        if (key === "habits") {
          formData.habits.forEach((habit) =>
            submitData.append("habits[]", habit)
          );
        } else {
          submitData.append(key, formData[key]);
        }
      });

      if (profilePhoto) {
        submitData.append("profilePhoto", profilePhoto);
      }

      navigate("/login");
      await registerUser(submitData);
    } catch (err) {
      setError(err.message || "Registration failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-100 to-white">
      <Navbar />

      <div className="flex items-center justify-center px-4 py-8">
        <div className="w-[80%] max-w-3xl rounded-2xl overflow-hidden shadow-2xl bg-white/70 backdrop-blur-lg p-8">
          <h2 className="text-3xl font-bold mb-6 text-gray-800 text-center">
            Create Your Account
          </h2>

          {/* Profile Photo Upload */}
          <div className="flex flex-col items-center mb-6">
            <div className="relative w-28 h-28">
              <img
                src={
                  profilePhoto
                    ? URL.createObjectURL(profilePhoto)
                    : "https://cdn-icons-png.flaticon.com/512/847/847969.png"
                }
                alt="Profile"
                className="w-28 h-28 rounded-full object-cover border-4 border-blue-400"
              />
              <label
                htmlFor="profile-upload"
                className="absolute bottom-0 right-0 bg-blue-500 p-2 rounded-full cursor-pointer hover:bg-blue-600 transition"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5 text-white"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path d="M4 3a2 2 0 00-2 2v2a2 2 0 002 2h1v6a2 2 0 002 2h6a2 2 0 002-2v-6h1a2 2 0 002-2V5a2 2 0 00-2-2H4z" />
                </svg>
              </label>
              <input
                id="profile-upload"
                type="file"
                accept="image/*"
                onChange={handlePhotoUpload}
                className="hidden"
              />
              {profilePhoto && (
                <button
                  type="button"
                  onClick={handlePhotoDelete}
                  className="absolute top-0 right-0 bg-red-500 p-1 rounded-full hover:bg-red-600 transition"
                  title="Delete photo"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-4 w-4 text-white"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                  >
                    <path
                      fillRule="evenodd"
                      d="M6.707 6.293a1 1 0 00-1.414 1.414L8.586 10l-3.293 3.293a1 1 0 101.414 1.414L10 11.414l3.293 3.293a1 1 0 001.414-1.414L11.414 10l3.293-3.293a1 1 0 00-1.414-1.414L10 8.586 6.707 6.293z"
                      clipRule="evenodd"
                    />
                  </svg>
                </button>
              )}
            </div>
            <p className="mt-2 text-gray-600 text-sm">Upload Profile Photo</p>
          </div>

          {/* Registration Form */}
          <form className="grid grid-cols-2 gap-4" onSubmit={handleSubmit}>
            {/* Full Name */}
            <div>
              <label className="block mb-1 text-gray-800 font-semibold">
                Full Name
              </label>
              <input
                type="text"
                name="fullName"
                value={formData.fullName}
                onChange={handleChange}
                placeholder="Your Name"
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-400"
                required
              />
            </div>

            {/* Email */}
            <div>
              <label className="block mb-1 text-gray-800 font-semibold">
                Email
              </label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="you@example.com"
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-400"
                required
              />
            </div>

            {/* Password */}
            <div>
              <label className="block mb-1 text-gray-800 font-semibold">
                Password
              </label>
              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  placeholder="••••••••"
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-400"
                  required
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

            {/* Confirm Password */}
            <div>
              <label className="block mb-1 text-gray-800 font-semibold">
                Confirm Password
              </label>
              <div className="relative">
                <input
                  type={showConfirmPassword ? "text" : "password"}
                  name="confirmPassword"
                  value={formData.confirmPassword}
                  onChange={handleChange}
                  placeholder="••••••••"
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-400"
                  required
                />
                <button
                  type="button"
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500"
                  onClick={() => setShowConfirmPassword((prev) => !prev)}
                  tabIndex={-1}
                >
                  {showConfirmPassword ? (
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
              {/* Error Message  */}
              {error && (
                <div className="text-red-500 text-sm mt-1">{error}</div>
              )}
            </div>

            {/* Gender */}
            <div>
              <label className="block mb-1 text-gray-800 font-semibold">
                Gender
              </label>
              <select
                name="gender"
                value={formData.gender}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-400"
                required
              >
                <option value="" disabled>
                  Select Gender
                </option>
                <option value="male">Male</option>
                <option value="female">Female</option>
                <option value="other">Other</option>
              </select>
            </div>

            {/* Phone */}
            <div>
              <label className="block mb-1 text-gray-800 font-semibold">
                Phone Number
              </label>
              <input
                type="tel"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                placeholder="9999999999"
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-400"
                pattern="[0-9]{10}"
                maxLength={10}
                minLength={10}
                title="Phone number must be exactly 10 digits"
                required
              />
            </div>

            {/* Age */}
            <div>
              <label className="block mb-1 text-gray-800 font-semibold">
                Age
              </label>
              <input
                type="number"
                name="age"
                value={formData.age}
                onChange={handleChange}
                placeholder="22"
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-400"
              />
            </div>

            {/* City */}
            <div>
              <label className="block mb-1 text-gray-800 font-semibold">
                City
              </label>
              <input
                type="text"
                name="city"
                value={formData.city}
                onChange={handleChange}
                placeholder="New Delhi"
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-400"
              />
            </div>

            {/* Occupation */}
            <div>
              <label className="block mb-1 text-gray-800 font-semibold">
                Occupation
              </label>
              <input
                type="text"
                name="occupation"
                value={formData.occupation}
                onChange={handleChange}
                placeholder="Software Engineer"
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-400"
              />
            </div>

            {/* Hobbies */}
            <div>
              <label className="block mb-1 text-gray-800 font-semibold">
                Hobbies
              </label>
              <input
                type="text"
                name="hobbies"
                value={formData.hobbies}
                onChange={handleChange}
                placeholder="Reading, Traveling"
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-400"
              />
            </div>

            {/* Habits */}
            <div className="col-span-2">
              <label className="block mb-2 text-gray-800 font-semibold">
                Habits
              </label>
              <div className="grid grid-cols-2 gap-2">
                {[
                  "Smoking",
                  "Drinking",
                  "Vegetarian",
                  "Non-Vegetarian",
                  "Fitness Enthusiast",
                  "Night Owl",
                  "Early Bird",
                ].map((habit) => (
                  <label key={habit} className="flex items-center space-x-2">
                    <input
                      type="checkbox"
                      checked={formData.habits.includes(habit)}
                      onChange={() => handleCheckbox(habit)}
                      className="w-4 h-4 text-blue-500 border-gray-300 rounded"
                    />
                    <span className="text-gray-700">{habit}</span>
                  </label>
                ))}
              </div>
            </div>

            {/* Submit */}
            <div className="col-span-2">
              <button
                type="submit"
                disabled={loading}
                className="w-full py-2 bg-blue-500 hover:bg-blue-600 text-white rounded-lg text-lg font-semibold transition-all disabled:opacity-50"
              >
                {loading ? "Registering..." : "Register"}
              </button>
            </div>
          </form>

          <p className="mt-4 text-center text-gray-600">
            Already have an account?{" "}
            <Link to="/login" className="text-blue-500 hover:underline">
              Login Now
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Register;
