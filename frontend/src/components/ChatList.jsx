import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

const ChatList = () => {
  const currentUser = JSON.parse(localStorage.getItem("user"));
  const [chats, setChats] = useState([]);
  const navigate = useNavigate();
  const { chatId } = useParams(); 

  useEffect(() => {
    if (!currentUser) return;
    fetch(`http://localhost:5000/api/chats/${currentUser.id}`)
      .then((res) => res.json())
      .then((data) => setChats(data))
      .catch((err) => console.error("Failed to load chats:", err));
  }, [currentUser]);

  return (
    <div className="p-4 sticky top-0 h-screen w-72 bg-gradient-to-b from-white to-gray-50 border-r shadow-sm overflow-y-auto">
      <h2 className="font-bold text-xl mb-6 text-gray-800">Chats</h2>
      <div className="space-y-3">
        {chats.length > 0 ? (
          chats.map((chat) => {
            const otherUser = chat.members.find((u) => u._id !== currentUser.id);

            // Highlight if active
            const isActive = chat._id === chatId;

            return (
              <div
                key={chat._id}
                onClick={() => navigate(`/chat/${chat._id}`)}
                className={`flex items-center gap-3 p-3 rounded-xl cursor-pointer transition-all duration-200
                  ${
                    isActive
                      ? "bg-blue-400 text-white shadow-md"
                      : "hover:bg-blue-50 hover:shadow-sm bg-white text-gray-900"
                  }`}
              >
                {/* Avatar */}
                <div
                  className={`h-12 w-12 rounded-full flex items-center justify-center font-semibold 
                  ${
                    isActive
                      ? "bg-white text-blue-600"
                      : "bg-gradient-to-tr from-blue-400 to-blue-600 text-white"
                  }`}
                >
                  {otherUser?.fullName
                    ? otherUser.fullName.charAt(0).toUpperCase()
                    : "?"}
                </div>

                {/* Chat Info */}
                <div className="flex-1 min-w-0">
                  <p
                    className={`font-medium text-sm truncate ${
                      isActive ? "text-white" : "text-gray-900"
                    }`}
                  >
                    {otherUser?.fullName || "Unknown"}
                  </p>
                  <p
                    className={`text-sm truncate ${
                      isActive ? "text-blue-100" : "text-gray-500"
                    }`}
                  >
                    {chat.lastMessage?.text ||
                      (chat.lastMessage?.fileUrl
                        ? "Attachment"
                        : "No messages yet")}
                  </p>
                </div>

                {/* Time */}
                <div
                  className={`text-xs whitespace-nowrap ${
                    isActive ? "text-blue-100" : "text-gray-400"
                  }`}
                >
                  {chat.lastMessage?.createdAt
                    ? new Date(chat.lastMessage.createdAt).toLocaleTimeString(
                        [],
                        {
                          hour: "2-digit",
                          minute: "2-digit",
                          hour12: true, 
                        }
                      )
                    : ""}
                </div>
              </div>
            );
          })
        ) : (
          <p className="text-gray-500 text-sm text-center mt-10">
            No chats yet. Start a conversation!
          </p>
        )}
      </div>
    </div>
  );
};

export default ChatList;
