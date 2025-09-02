import React from "react";
import { motion } from "framer-motion";
import { X } from "lucide-react";
import { useNavigate } from "react-router-dom";

const ProfilePane = ({ match, onClose }) => {
  const navigate = useNavigate();

  if (!match) return null;

  return (
    <motion.div
      initial={{ x: "100%" }}
      animate={{ x: 0 }}
      exit={{ x: "100%" }}
      transition={{ type: "spring", stiffness: 70 }}
      className="fixed top-0 right-0 h-full w-full sm:w-[450px] bg-white shadow-2xl z-50 overflow-y-auto"
    >
      {/* Header */}
      <div className="flex justify-between items-center p-4 border-b">
        <h2 className="text-xl font-bold">Profile Details</h2>
        <button onClick={onClose}>
          <X className="w-6 h-6 text-gray-600 hover:text-black cursor-pointer" />
        </button>
      </div>

      {/* Body */}
      <div className="p-6">
        <div className="flex flex-col items-center">
          <img
            src={
              match.profilePhoto
                ? match.profilePhoto.startsWith("http")
                  ? match.profilePhoto
                  : `http://localhost:5000${match.profilePhoto}`
                : "https://via.placeholder.com/400"
            }
            alt={match.fullName}
            className="w-28 h-28 rounded-full object-cover shadow-md"
          />
          <h3 className="text-xl font-semibold mt-4">{match.fullName}</h3>
        </div>

        <div className="mt-6">
          <h4 className="font-semibold mb-2">Details</h4>
          <div className="space-y-2">
            {Object.entries(match).map(([key, value]) => {
              if (
                [
                  "_id",
                  "profilePhoto",
                  "__v",
                  "password",
                  "email",
                  "phone",
                  "lastLogin",
                  "createdAt",
                  "updatedAt",
                  "score",
                ].includes(key)
              )
                return null;
              return (
                <p key={key} className="text-gray-700 text-sm">
                  <span className="font-medium capitalize">{key}: </span>
                  {Array.isArray(value) ? value.join(", ") : String(value)}
                </p>
              );
            })}
          </div>
        </div>

        <button
          onClick={() => navigate(`/chat/${match._id}`)}
          className="mt-8 w-full bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded-lg shadow-md transition cursor-pointer"
        >
          Start Chat
        </button>
      </div>
    </motion.div>
  );
};

export default ProfilePane;
