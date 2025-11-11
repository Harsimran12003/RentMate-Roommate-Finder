import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Navbar from "../../components/Navbar";
import { registerUser } from "../../services/userService";

const Register = () => {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [profilePhoto, setProfilePhoto] = useState(null);
  const [policeVerification, setPoliceVerification] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

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

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));

    if (
      name === "confirmPassword" ||
      (name === "password" && formData.confirmPassword)
    ) {
      if (value !== formData.password && name === "confirmPassword") {
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
    setFormData((prev) => ({
      ...prev,
      habits: prev.habits.includes(habit)
        ? prev.habits.filter((h) => h !== habit)
        : [...prev.habits, habit],
    }));
  };

  const handlePhotoUpload = (e) => {
    const file = e.target.files[0];
    if (file) setProfilePhoto(file);
  };

  const handlePhotoDelete = () => setProfilePhoto(null);

  const handlePoliceVerificationUpload = (e) => {
    const file = e.target.files[0];
    if (file) setPoliceVerification(file);
  };

  const handlePoliceVerificationDelete = () => setPoliceVerification(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (formData.password !== formData.confirmPassword) {
      setError("Passwords do not match");
      return;
    }

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
      if (profilePhoto) submitData.append("profilePhoto", profilePhoto);
      if (policeVerification)
        submitData.append("policeVerification", policeVerification);

      await registerUser(submitData);
      navigate("/login");
    } catch (err) {
      setError(err.message || "Registration failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-100 to-white">
      <Navbar />

      <div className="flex justify-center px-4 py-8">
        <div className="w-full max-w-3xl bg-white/80 backdrop-blur-lg rounded-2xl shadow-2xl p-6 sm:p-8">
          <h2 className="text-2xl sm:text-3xl font-bold mb-6 text-gray-800 text-center">
            Create Your Account
          </h2>

          {/* Profile Photo Upload */}
          <div className="flex flex-col items-center mb-6">
            <div className="relative w-24 h-24 sm:w-28 sm:h-28">
              <img
                src={
                  profilePhoto
                    ? URL.createObjectURL(profilePhoto)
                    : "https://cdn-icons-png.flaticon.com/512/847/847969.png"
                }
                alt="Profile"
                className="w-full h-full rounded-full object-cover border-4 border-blue-400"
              />
              <label
                htmlFor="profile-upload"
                className="absolute bottom-0 right-0 bg-blue-500 w-7 h-7 sm:w-8 sm:h-8 flex items-center justify-center rounded-full cursor-pointer hover:bg-blue-600 transition"
                title="Upload photo"
              >
                <span className="text-white text-lg font-bold leading-none">
                  +
                </span>
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
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-4 w-4 text-white"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                  >
                    <path
                      fillRule="evenodd"
                      d="M6.707 6.293a1 1 0 00-1.414 1.414L8.586 10l-3.293 3.293a1 1 0 
                      101.414 1.414L10 11.414l3.293 3.293a1 1 0 
                      001.414-1.414L11.414 10l3.293-3.293a1 1 0 
                      00-1.414-1.414L10 8.586 6.707 6.293z"
                      clipRule="evenodd"
                    />
                  </svg>
                </button>
              )}
            </div>
            <p className="mt-2 text-gray-600 text-sm">Upload Profile Photo</p>
          </div>

          {/* Registration Form */}
          <form
            className="grid grid-cols-1 sm:grid-cols-2 gap-4"
            onSubmit={handleSubmit}
          >
            {/* Full Name */}
            <InputField
              label="Full Name"
              name="fullName"
              value={formData.fullName}
              onChange={handleChange}
              placeholder="Your Name"
              required
            />

            <InputField
              label="Email"
              name="email"
              type="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="you@example.com"
              required
            />

            {/* Password */}
            <PasswordField
              label="Password"
              name="password"
              value={formData.password}
              show={showPassword}
              toggle={() => setShowPassword(!showPassword)}
              onChange={handleChange}
            />

            <PasswordField
              label="Confirm Password"
              name="confirmPassword"
              value={formData.confirmPassword}
              show={showConfirmPassword}
              toggle={() => setShowConfirmPassword(!showConfirmPassword)}
              onChange={handleChange}
              error={error}
            />

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
                <option>Male</option>
                <option>Female</option>
                <option>Other</option>
              </select>
            </div>

            {/* Phone, Age, City, etc. */}
            <InputField
              label="Phone Number"
              name="phone"
              type="tel"
              value={formData.phone}
              onChange={handleChange}
              placeholder="9999999999"
              pattern="[0-9]{10}"
              required
            />
            <InputField
              label="Age"
              name="age"
              type="number"
              value={formData.age}
              onChange={handleChange}
              placeholder="22"
            />
            <InputField
              label="City"
              name="city"
              value={formData.city}
              onChange={handleChange}
              placeholder="New Delhi"
            />
            <InputField
              label="Occupation"
              name="occupation"
              value={formData.occupation}
              onChange={handleChange}
              placeholder="Software Engineer"
            />
            <InputField
              label="Hobbies"
              name="hobbies"
              value={formData.hobbies}
              onChange={handleChange}
              placeholder="Reading, Traveling"
            />

            {/* Habits */}
            <div className="col-span-1 sm:col-span-2">
              <label className="block mb-2 text-gray-800 font-semibold">
                Habits
              </label>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
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
                    <span className="text-gray-700 text-sm sm:text-base">
                      {habit}
                    </span>
                  </label>
                ))}
              </div>
            </div>

            {/* Police Verification Upload */}
            <div className="col-span-1 sm:col-span-2">
              <label className="block mb-1 text-gray-800 font-semibold">
                Police Verification Document
              </label>
              <div className="flex flex-col sm:flex-row items-center gap-3">
                <input
                  type="file"
                  accept=".pdf, image/*"
                  onChange={handlePoliceVerificationUpload}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-400"
                />
                {policeVerification && (
                  <button
                    type="button"
                    onClick={handlePoliceVerificationDelete}
                    className="px-3 py-1 bg-red-500 text-white rounded-lg hover:bg-red-600 w-full sm:w-auto"
                  >
                    Remove
                  </button>
                )}
              </div>
              {policeVerification && (
                <p className="text-sm text-gray-600 mt-1 truncate">
                  File selected: {policeVerification.name}
                </p>
              )}
            </div>

            {/* Submit */}
            <div className="col-span-1 sm:col-span-2">
              <button
                type="submit"
                disabled={loading}
                className="w-full py-2 bg-blue-500 hover:bg-blue-600 text-white rounded-lg text-lg font-semibold transition-all disabled:opacity-50"
              >
                {loading ? "Registering..." : "Register"}
              </button>
            </div>
          </form>

          <p className="mt-4 text-center text-gray-600 text-sm sm:text-base">
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

// Reusable components
const InputField = ({ label, ...props }) => (
  <div>
    <label className="block mb-1 text-gray-800 font-semibold">{label}</label>
    <input
      {...props}
      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-400"
    />
  </div>
);

const PasswordField = ({ label, show, toggle, error, ...props }) => (
  <div>
    <label className="block mb-1 text-gray-800 font-semibold">{label}</label>
    <div className="relative">
      <input
        type={show ? "text" : "password"}
        {...props}
        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-400"
      />
      <button
        type="button"
        className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500"
        onClick={toggle}
      >
        {show ? (
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
    {error && <p className="text-red-500 text-sm mt-1">{error}</p>}
  </div>
);

export default Register;
