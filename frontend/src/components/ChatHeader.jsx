import React from "react";
import { FaBars } from "react-icons/fa";

const ChatHeader = ({ otherUser, onOpenList = () => {} }) => {
  return (
    <div className="px-4 md:px-6 py-3 border-b bg-white flex items-center gap-3 sticky top-0 z-20">
      {/* Mobile menu button */}
      <button
        onClick={onOpenList}
        className="md:hidden p-2 rounded-md bg-gray-100 hover:bg-gray-200"
        aria-label="Open chats"
      >
        <FaBars />
      </button>

      <img
        src={
          otherUser?.profilePhoto
            ? `http://localhost:5000${otherUser.profilePhoto}`
            : "/default-avatar.png"
        }
        alt={otherUser?.fullName || "User"}
        className="w-10 h-10 rounded-full object-cover"
      />
      <div className="font-semibold truncate">{otherUser?.fullName || "User"}</div>
    </div>
  );
};

export default ChatHeader;
