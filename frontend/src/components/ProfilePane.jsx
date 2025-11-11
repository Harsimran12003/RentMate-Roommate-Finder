import React from "react";
import { motion } from "framer-motion";
import { X, FileText } from "lucide-react";
import { useNavigate } from "react-router-dom";

const ProfilePane = ({ match, onClose }) => {
  const currentUser = JSON.parse(localStorage.getItem("user"));
  const navigate = useNavigate();

  if (!match) return null;


  const getFileUrl = (filePath) => {
    if (!filePath || filePath === "undefined" || filePath === "") return null;
    if (filePath.startsWith("http")) return filePath;
    return `http://localhost:5000${filePath.startsWith("/") ? filePath : `/${filePath}`}`;
  };

  const policeVerification = getFileUrl(match.policeVerification);

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
                ? getFileUrl(match.profilePhoto)
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
                  "policeVerification",
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

        {/* Police Verification Document */}
        <div className=" pt-4">
          <h4 className="font-semibold mb-2 flex items-center gap-2">
            <FileText className="w-5 h-5 text-gray-600" />
            Police Verification Document
          </h4>

          {policeVerification ? (
            <div className="flex flex-col items-center gap-2">
              {policeVerification.toLowerCase().includes(".pdf") ? (
                <iframe
                  src={policeVerification}
                  title="Police Verification Document"
                  className="w-full h-50 border rounded-md shadow-sm"
                ></iframe>
              ) : (
                <img
                  src={policeVerification}
                  alt="Police Verification"
                  className="w-full h-40 object-cover rounded-md shadow-sm"
                />
              )}

              <button
                onClick={() => window.open(policeVerification, "_blank")}
                className="bg-blue-400 hover:bg-blue-600 text-white px-2 py-1 rounded-md text-sm shadow-md transition cursor-pointer "
              >
                Open Document
              </button>
            </div>
          ) : (
            <p className="text-gray-500 text-sm italic">
              No police verification document uploaded.
            </p>
          )}
        </div>


        {/* Start Chat Button */}
        <button
          onClick={async () => {
            const res = await fetch("http://localhost:5000/api/chats", {
              method: "POST",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify({
                senderId: currentUser.id,
                receiverId: match._id,
              }),
            });
            const chat = await res.json();
            navigate(`/chat/${chat._id}`);
          }}
          className="mt-8 w-full bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded-lg shadow-md transition cursor-pointer"
        >
          Start Chat
        </button>
      </div>
    </motion.div>
  );
};

export default ProfilePane;
