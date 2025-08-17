import React, { useState } from "react";
import Sidebar from "../components/Sidebar";

const Profile = () => {
  const initialUser = {
    name: "John Doe",
    email: "johndoe@example.com",
    phone: "+91 9876543210",
    city: "Ludhiana",
    occupation: "Student",
    age: 22,
    gender: "Male",
    budget: "₹10,000 / month",
    hobbies: ["Reading", "Gaming"],
    habits: ["Early riser", "Non-smoker"],
    profilePic: "",
  };

  const [user, setUser] = useState(initialUser);
  const [isEditing, setIsEditing] = useState(false);

  // For profile picture preview
  const handleProfilePicChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const imageUrl = URL.createObjectURL(file);
      setUser((prev) => ({ ...prev, profilePic: imageUrl }));
    }
  };

  const handleChange = (e) => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };

  const handleCheckboxChange = (field, value) => {
    setUser((prev) => {
      const updated = prev[field].includes(value)
        ? prev[field].filter((item) => item !== value)
        : [...prev[field], value];
      return { ...prev, [field]: updated };
    });
  };

  const handleSave = () => {
    setIsEditing(false);
    // here you can add API call to save updated user info
  };

  const hobbiesOptions = ["Reading", "Gaming", "Traveling", "Cooking", "Music"];
  const habitsOptions = ["Early riser", "Night owl", "Smoking", "Drinking", "Vegetarian", "Non-Vegetarian", "Fitness-enthusiast"];

  return (
    <div className="flex bg-gradient-to-br from-blue-100 via-white to-blue-50 min-h-screen">
      {/* Sidebar */}
      <Sidebar />

      {/* Main Content */}
      <div className="flex-1 p-6 flex items-center justify-center">
        <div className="w-full max-w-6xl bg-white shadow-2xl rounded-3xl p-8 grid grid-cols-1 lg:grid-cols-3 gap-10">
          
          {/* Left Profile Card */}
          <div className="col-span-1 flex flex-col items-center text-center">
            <div className="relative">
              <img
                src={user.profilePic || "https://via.placeholder.com/150"}
                alt={user.name}
                className="w-40 h-40 rounded-full border-4 border-blue-400 shadow-md object-cover"
              />
              {isEditing && (
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleProfilePicChange}
                  className="mt-3 text-sm text-gray-600"
                />
              )}
            </div>
            <h2 className="mt-4 text-2xl font-bold text-gray-800">{user.name}</h2>
            <p className="text-gray-500">{user.occupation}</p>

            {/* Quick Info */}
            <div className="mt-6 space-y-3 text-gray-600 text-sm">
              <p>📍 {user.city}</p>
              <p>📧 {user.email}</p>
              <p>📱 {user.phone}</p>
            </div>
          </div>

          {/* Right Profile Details */}
          <div className="col-span-2 flex flex-col justify-between">
            
            <div>
              <h3 className="text-xl font-semibold text-gray-700 mb-4 border-b pb-2">
                Profile Information
              </h3>
              <div className="grid grid-cols-2 gap-5 text-gray-700">
                {isEditing ? (
                  <>
                    <EditableField label="Name" name="name" value={user.name} onChange={handleChange} />
                    <EditableField label="Email" name="email" value={user.email} onChange={handleChange} />
                    <EditableField label="Phone" name="phone" value={user.phone} onChange={handleChange} />
                    <EditableField label="City" name="city" value={user.city} onChange={handleChange} />
                    <EditableField label="Age" name="age" value={user.age} onChange={handleChange} />
                    <EditableField label="Gender" name="gender" value={user.gender} onChange={handleChange} />
                    <EditableField label="Occupation" name="occupation" value={user.occupation} onChange={handleChange} />
                    <EditableField label="Budget" name="budget" value={user.budget} onChange={handleChange} />
                  </>
                ) : (
                  <>
                    <ProfileField label="Name" value={user.name} />
                    <ProfileField label="Email" value={user.email} />
                    <ProfileField label="Phone" value={user.phone} />
                    <ProfileField label="City" value={user.city} />
                    <ProfileField label="Age" value={user.age} />
                    <ProfileField label="Gender" value={user.gender} />
                    <ProfileField label="Occupation" value={user.occupation} />
                    <ProfileField label="Budget" value={user.budget} />
                  </>
                )}
              </div>

              {/* Hobbies & Habits */}
              <div className="grid grid-cols-2 gap-6 mt-6">
                <div>
                  <h4 className="text-lg font-semibold text-blue-600 mb-2">Hobbies</h4>
                  {isEditing ? (
                    <input
                      type="text"
                      name="hobbies"
                      value={user.hobbies.join(", ")}
                      onChange={e =>
                        setUser(prev => ({
                          ...prev,
                          hobbies: e.target.value.split(",").map(h => h.trim()).filter(h => h)
                        }))
                      }
                      className="w-full border rounded-lg px-2 py-1 mt-1"
                      placeholder="Enter hobbies separated by commas"
                    />
                  ) : (
                    <ul className="list-disc list-inside text-gray-700 space-y-1">
                      {user.hobbies.map((item, index) => (
                        <li key={index}>{item}</li>
                      ))}
                    </ul>
                  )}
                </div>
                <div>
                  <h4 className="text-lg font-semibold text-blue-600 mb-2">Habits</h4>
                  {isEditing ? (
                    <div className="space-y-2">
                      {habitsOptions.map((habit) => (
                        <label key={habit} className="flex items-center space-x-2">
                          <input
                            type="checkbox"
                            checked={user.habits.includes(habit)}
                            onChange={() => handleCheckboxChange("habits", habit)}
                          />
                          <span>{habit}</span>
                        </label>
                      ))}
                    </div>
                  ) : (
                    <ul className="list-disc list-inside text-gray-700 space-y-1">
                      {user.habits.map((item, index) => (
                        <li key={index}>{item}</li>
                      ))}
                    </ul>
                  )}
                </div>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="mt-6 text-right space-x-3">
              {isEditing ? (
                <>
                  <button
                    onClick={handleSave}
                    className="bg-green-500 hover:bg-green-600 text-white px-6 py-2 rounded-lg shadow-md transition"
                  >
                    Save
                  </button>
                  <button
                    onClick={() => setIsEditing(false)}
                    className="bg-gray-400 hover:bg-gray-500 text-white px-6 py-2 rounded-lg shadow-md transition"
                  >
                    Cancel
                  </button>
                </>
              ) : (
                <button
                  onClick={() => setIsEditing(true)}
                  className="bg-blue-500 hover:bg-blue-600 text-white px-6 py-2 rounded-lg shadow-md transition"
                >
                  Edit Profile
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

// Non-editable profile field
const ProfileField = ({ label, value }) => (
  <div>
    <p className="text-sm text-gray-500">{label}</p>
    <p className="font-medium text-gray-800">{value}</p>
  </div>
);

// Editable input field
const EditableField = ({ label, name, value, onChange }) => (
  <div>
    <p className="text-sm text-gray-500">{label}</p>
    <input
      type="text"
      name={name}
      value={value}
      onChange={onChange}
      className="w-full border rounded-lg px-2 py-1 mt-1"
    />
  </div>
);

export default Profile;
