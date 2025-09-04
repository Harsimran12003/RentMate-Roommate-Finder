import React from "react";

const ChatHeader = ({ otherUser }) => {
  return (
    <div className="px-6 py-3 border-b bg-white flex items-center gap-3 sticky top-0 z-10">
      <img
        src={
          otherUser?.profilePhoto ? 
          `http://localhost:5000${otherUser.profilePhoto}` 
          : "/default-avatar.png"
        }
        alt={otherUser?.fullName || "User"}
        className="w-10 h-10 rounded-full object-cover"
      />
      <div className="font-semibold">{otherUser?.fullName || "User"}</div>
    </div>
  );
};

export default ChatHeader;
