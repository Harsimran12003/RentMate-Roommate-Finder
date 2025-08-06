import React from "react";

const Profile = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-100 to-purple-200 py-10 px-4 flex justify-center items-center">
      <div className="bg-white shadow-xl rounded-3xl p-8 max-w-4xl w-full flex flex-col md:flex-row items-center gap-10">
        {/* Profile Picture */}
        <div className="flex flex-col items-center">
          <img
            src=""
            alt=""
            className="w-40 h-40 rounded-full border-4 border-blue-400 shadow-md"
          />
          <h2 className="mt-4 text-2xl font-semibold text-gray-800"></h2>
          <p className="text-gray-500">Room Seeker</p>
        </div>

        {/* User Details */}
        <div className="flex-1 w-full">
          <h3 className="text-xl font-semibold text-gray-700 mb-6 border-b pb-2">
            Profile Information
          </h3>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            <div>
              <label className="block text-gray-600 mb-1">Email</label>
              <input
                type="email"
                value="xyz@example.com"
                readOnly
                className="w-full p-3 border border-gray-300 rounded-lg bg-gray-100 focus:outline-none"
              />
            </div>

            <div>
              <label className="block text-gray-600 mb-1">Phone</label>
              <input
                type="text"
                value="+91 9876543210"
                readOnly
                className="w-full p-3 border border-gray-300 rounded-lg bg-gray-100 focus:outline-none"
              />
            </div>

            <div>
              <label className="block text-gray-600 mb-1">City</label>
              <input
                type="text"
                value="Ludhiana"
                readOnly
                className="w-full p-3 border border-gray-300 rounded-lg bg-gray-100 focus:outline-none"
              />
            </div>

            <div>
              <label className="block text-gray-600 mb-1">Occupation</label>
              <input
                type="text"
                value="Student"
                readOnly
                className="w-full p-3 border border-gray-300 rounded-lg bg-gray-100 focus:outline-none"
              />
            </div>
          </div>

          {/* Future: Add edit button */}
          <div className="mt-6 text-right">
            <button
              className="bg-blue-500 hover:bg-blue-600 text-white px-6 py-2 rounded-lg shadow-md transition"
              disabled
            >
              Edit Profile 
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
