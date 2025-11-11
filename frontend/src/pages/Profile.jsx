import React, { useEffect, useState } from "react";
import Sidebar from "../components/Sidebar";
import {
  getUserProfile,
  updateUserProfile,
  changeUserPassword,
} from "../services/profileService";

const API_BASE = "http://localhost:5000";

const normalizeUser = (raw = {}, fallbackPic = "") => {
  const toArrayFromMaybeCSV = (val) =>
    Array.isArray(val)
      ? val
      : val
      ? String(val).split(",").map((h) => h.trim()).filter(Boolean)
      : [];

  const absolutePhoto = raw.profilePhoto
    ? raw.profilePhoto.startsWith("http")
      ? raw.profilePhoto
      : `${API_BASE}${raw.profilePhoto}`
    : fallbackPic || "";

  return {
    name: raw.fullName || raw.name || "",
    email: raw.email || "",
    phone: raw.phone || "",
    city: raw.city || "",
    occupation: raw.occupation || "",
    age: raw.age ?? "",
    gender: raw.gender || "",
    roommateStatus: raw.roommateStatus || "Looking for roommate",
    hobbies: toArrayFromMaybeCSV(raw.hobbies),
    habits: Array.isArray(raw.habits)
      ? raw.habits
      : raw.habits
      ? [...raw.habits]
      : [],
    profilePic: absolutePhoto,
  };
};

const Profile = () => {
  const [user, setUser] = useState({
    name: "",
    email: "",
    phone: "",
    city: "",
    occupation: "",
    age: "",
    gender: "",
    roommateStatus: "Looking for roommate",
    hobbies: [],
    habits: [],
    profilePic: "",
  });
  const [isEditing, setIsEditing] = useState(false);
  const [loading, setLoading] = useState(true);
  const [message, setMessage] = useState("");
  const [profileFile, setProfileFile] = useState(null);
  const [isPasswordModalOpen, setIsPasswordModalOpen] = useState(false);

  const [passwords, setPasswords] = useState({
    current: "",
    new: "",
    confirm: "",
  });

  const token = localStorage.getItem("token");

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const data = await getUserProfile(token);
        setUser((prev) => normalizeUser(data, prev.profilePic));
      } catch (err) {
        setMessage(err.message || "Failed to load profile");
      } finally {
        setLoading(false);
      }
    };
    fetchProfile();
  }, [token]);

  const handleProfilePicChange = (e) => {
    const file = e.target.files?.[0];
    if (file) {
      setProfileFile(file);
      const preview = URL.createObjectURL(file);
      setUser((prev) => ({ ...prev, profilePic: preview }));
    }
  };

  const handleChange = (e) => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };

  const handleCheckboxChange = (field, value) => {
    setUser((prev) => {
      const exists = prev[field].includes(value);
      const updated = exists
        ? prev[field].filter((v) => v !== value)
        : [...prev[field], value];
      return { ...prev, [field]: updated };
    });
  };

  const handleSave = async () => {
    try {
      const payload = {
        fullName: user.name,
        email: user.email,
        phone: user.phone,
        city: user.city,
        occupation: user.occupation,
        age: user.age,
        gender: user.gender,
        roommateStatus: user.roommateStatus,
        hobbies: (user.hobbies || []).join(", "),
        habits: user.habits || [],
      };

      const res = await updateUserProfile(token, payload, profileFile || null);

      const savedUser = res.user || res;
      setUser((prev) => normalizeUser(savedUser, prev.profilePic));
      setProfileFile(null);
      setIsEditing(false);
      setMessage("");
      alert("Profile updated successfully!");
    } catch (err) {
      console.error("Error updating profile:", err);
      setMessage(err.message || "Failed to update profile");
    }
  };

  const handlePasswordSave = async () => {
    if (passwords.new !== passwords.confirm) {
      alert("New password and confirmation do not match.");
      return;
    }
    try {
      await changeUserPassword(token, passwords.current, passwords.new);
      alert("Password changed successfully!");
      setPasswords({ current: "", new: "", confirm: "" });
      setIsPasswordModalOpen(false);
    } catch (err) {
      alert(err.response?.data?.message || "Failed to change password");
    }
  };

  const habitsOptions = [
    "Early riser",
    "Night owl",
    "Smoking",
    "Drinking",
    "Vegetarian",
    "Non-Vegetarian",
    "Fitness-enthusiast",
  ];

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        Loading profile...
      </div>
    );
  }

  return (
    <div className="flex bg-gradient-to-br from-blue-50 via-white to-blue-100 min-h-screen">
      <Sidebar />
      <div className="flex-1 p-4 sm:p-6 flex items-center justify-center overflow-auto">
        <div className="w-full max-w-6xl bg-white shadow-2xl rounded-3xl p-6 sm:p-10 grid grid-cols-1 lg:grid-cols-3 gap-8 sm:gap-10">
          {/* Left Profile Card */}
          <div className="col-span-1 relative bg-gray-50 rounded-2xl shadow-md overflow-hidden text-center">
            <div className="h-24 sm:h-28 bg-gradient-to-r from-blue-300 via-blue-400 to-blue-500"></div>

            <div className="absolute top-12 sm:top-14 left-1/2 -translate-x-1/2">
              <img
                src={user?.profilePic || "/default-avatar.png"}
                alt={user.name || "Profile photo"}
                className="w-24 h-24 sm:w-28 sm:h-28 rounded-full border-4 border-white shadow-md object-cover"
                onError={(e) => (e.currentTarget.src = "/default-avatar.png")}
              />
              {isEditing && (
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleProfilePicChange}
                  className="mt-3 text-sm text-gray-600 block mx-auto"
                />
              )}
            </div>

            <div className="mt-20 sm:mt-24 px-4 pb-6">
              <h2 className="text-lg sm:text-xl font-bold text-gray-800">{user.name}</h2>
              <p className="text-gray-500 text-sm sm:text-base">{user.occupation}</p>
              <div className="mt-4 space-y-1 text-gray-600 text-sm">
                <p>📍 {user.city}</p>
                <p>📧 {user.email}</p>
                <p>📱 {user.phone}</p>
              </div>

              <button
                onClick={() => setIsPasswordModalOpen(true)}
                className="mt-5 bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-lg shadow-md transition text-sm sm:text-base"
              >
                Change Password
              </button>
            </div>
          </div>

          {/* Right Profile Details */}
          <div className="col-span-2 flex flex-col justify-between">
            {message && (
              <p className="text-center text-sm text-red-500">{message}</p>
            )}

            <div>
              <h3 className="text-lg sm:text-xl font-semibold text-gray-700 mb-4 border-b pb-2">
                Profile Information
              </h3>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-5 text-gray-700">
                {isEditing ? (
                  <>
                    {["name", "email", "phone", "city", "age", "gender", "occupation"].map((field) => (
                      <EditableField
                        key={field}
                        label={field.charAt(0).toUpperCase() + field.slice(1)}
                        name={field}
                        value={user[field]}
                        onChange={handleChange}
                      />
                    ))}

                    <div>
                      <p className="text-sm text-gray-500">Roommate Status</p>
                      <div className="mt-2 flex flex-col sm:flex-row gap-2 sm:gap-4">
                        <label className="flex items-center gap-2 text-sm">
                          <input
                            type="radio"
                            name="roommateStatus"
                            value="Looking for roommate"
                            checked={user.roommateStatus === "Looking for roommate"}
                            onChange={handleChange}
                          />
                          Looking for roommate
                        </label>
                        <label className="flex items-center gap-2 text-sm">
                          <input
                            type="radio"
                            name="roommateStatus"
                            value="All settled"
                            checked={user.roommateStatus === "All settled"}
                            onChange={handleChange}
                          />
                          All settled
                        </label>
                      </div>
                    </div>
                  </>
                ) : (
                  <>
                    {[
                      ["Name", user.name],
                      ["Email", user.email],
                      ["Phone", user.phone],
                      ["City", user.city],
                      ["Age", user.age],
                      ["Gender", user.gender],
                      ["Occupation", user.occupation],
                      ["Roommate Status", user.roommateStatus],
                    ].map(([label, value]) => (
                      <ProfileField key={label} label={label} value={value} />
                    ))}
                  </>
                )}
              </div>

              {/* Hobbies & Habits */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mt-6">
                <div>
                  <h4 className="text-lg font-semibold text-blue-600 mb-2">
                    Hobbies
                  </h4>
                  {isEditing ? (
                    <input
                      type="text"
                      name="hobbies"
                      value={(user.hobbies || []).join(", ")}
                      onChange={(e) =>
                        setUser((prev) => ({
                          ...prev,
                          hobbies: e.target.value
                            .split(",")
                            .map((h) => h.trim())
                            .filter(Boolean),
                        }))
                      }
                      className="w-full border rounded-lg px-2 py-1 mt-1 text-sm"
                      placeholder="Enter hobbies separated by commas"
                    />
                  ) : (
                    <ul className="list-disc list-inside text-gray-700 space-y-1 text-sm">
                      {(user.hobbies || []).map((item, index) => (
                        <li key={index}>{item}</li>
                      ))}
                    </ul>
                  )}
                </div>
                <div>
                  <h4 className="text-lg font-semibold text-blue-600 mb-2">
                    Habits
                  </h4>
                  {isEditing ? (
                    <div className="space-y-2 text-sm">
                      {habitsOptions.map((habit) => (
                        <label key={habit} className="flex items-center space-x-2">
                          <input
                            type="checkbox"
                            checked={(user.habits || []).includes(habit)}
                            onChange={() => handleCheckboxChange("habits", habit)}
                          />
                          <span>{habit}</span>
                        </label>
                      ))}
                    </div>
                  ) : (
                    <ul className="list-disc list-inside text-gray-700 space-y-1 text-sm">
                      {(user.habits || []).map((item, index) => (
                        <li key={index}>{item}</li>
                      ))}
                    </ul>
                  )}
                </div>
              </div>
            </div>

            {/* Buttons */}
            <div className="mt-6 text-right space-x-2 sm:space-x-3">
              {isEditing ? (
                <>
                  <button
                    onClick={handleSave}
                    className="bg-green-500 hover:bg-green-600 text-white px-4 sm:px-6 py-2 rounded-lg shadow-md transition text-sm sm:text-base"
                  >
                    Save
                  </button>
                  <button
                    onClick={() => setIsEditing(false)}
                    className="bg-gray-400 hover:bg-gray-500 text-white px-4 sm:px-6 py-2 rounded-lg shadow-md transition text-sm sm:text-base"
                  >
                    Cancel
                  </button>
                </>
              ) : (
                <button
                  onClick={() => setIsEditing(true)}
                  className="bg-blue-500 hover:bg-blue-600 text-white px-4 sm:px-6 py-2 rounded-lg shadow-md transition text-sm sm:text-base"
                >
                  Edit Profile
                </button>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Password Modal */}
      {isPasswordModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50 p-4">
          <div className="bg-white rounded-2xl shadow-2xl p-6 sm:p-8 w-full max-w-md relative">
            <h2 className="text-lg sm:text-xl font-bold text-gray-800 mb-4">
              Change Password
            </h2>

            <input
              type="password"
              placeholder="Current Password"
              value={passwords.current}
              onChange={(e) =>
                setPasswords({ ...passwords, current: e.target.value })
              }
              className="w-full border rounded-lg px-3 py-2 mb-3 text-sm"
            />
            <input
              type="password"
              placeholder="New Password"
              value={passwords.new}
              onChange={(e) =>
                setPasswords({ ...passwords, new: e.target.value })
              }
              className="w-full border rounded-lg px-3 py-2 mb-3 text-sm"
            />
            <input
              type="password"
              placeholder="Confirm New Password"
              value={passwords.confirm}
              onChange={(e) =>
                setPasswords({ ...passwords, confirm: e.target.value })
              }
              className="w-full border rounded-lg px-3 py-2 mb-4 text-sm"
            />

            <div className="flex justify-end gap-3 text-sm sm:text-base">
              <button
                onClick={() => setIsPasswordModalOpen(false)}
                className="px-4 py-2 bg-gray-300 rounded-lg hover:bg-gray-400 transition"
              >
                Cancel
              </button>
              <button
                onClick={handlePasswordSave}
                className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition"
              >
                Save
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

const ProfileField = ({ label, value }) => (
  <div>
    <p className="text-xs sm:text-sm text-gray-500">{label}</p>
    <p className="font-medium text-gray-800 text-sm sm:text-base">
      {String(value ?? "")}
    </p>
  </div>
);

const EditableField = ({ label, name, value, onChange }) => (
  <div>
    <p className="text-xs sm:text-sm text-gray-500">{label}</p>
    <input
      type="text"
      name={name}
      value={String(value ?? "")}
      onChange={onChange}
      className="w-full border rounded-lg px-2 py-1 mt-1 text-sm"
    />
  </div>
);

export default Profile;
