import React, { useState } from "react";
import Sidebar from "../components/Sidebar"; // ✅ import your main Sidebar

const users = [
  { id: 1, name: "Aarav Sharma" },
  { id: 2, name: "Priya Mehta" },
  { id: 3, name: "Jennie" },
];

const messagesData = {
  1: [
    { sender: "you", text: "Hey Aarav! Is the flat still available?" },
    { sender: "them", text: "Yes! It's still available." },
  ],
  2: [
    { sender: "you", text: "Hi Priya, I like your profile." },
    { sender: "them", text: "Thanks! Want to know more about me?" },
  ],
  3: [
    { sender: "you", text: "Hey Jennie!" },
    { sender: "them", text: "Hi there!" },
  ],
};

const Chat = () => {
  const [selectedUserId, setSelectedUserId] = useState(1);
  const [newMessage, setNewMessage] = useState("");
  const [messages, setMessages] = useState(messagesData);

  const handleSend = () => {
    if (!newMessage.trim()) return;
    const updatedMessages = {
      ...messages,
      [selectedUserId]: [
        ...(messages[selectedUserId] || []),
        { sender: "you", text: newMessage },
      ],
    };
    setMessages(updatedMessages);
    setNewMessage("");
  };

  return (
    <div className="flex min-h-screen">
      {/* ✅ Main App Sidebar */}
      <Sidebar />

      {/* Chat Layout */}
      <div className="flex-1 flex bg-gradient-to-r from-[#F3F4F6] to-[#E0F2F1]">
        {/* Users List (secondary sidebar inside chat) */}
        <div className="w-1/4 bg-white border-r shadow-lg p-4">
          <h2 className="text-xl font-semibold mb-6 text-center text-[#00796B]">
            Chats
          </h2>
          {users.map((user) => (
            <div
              key={user.id}
              onClick={() => setSelectedUserId(user.id)}
              className={`p-3 rounded-lg cursor-pointer hover:bg-[#E0F2F1] transition ${
                selectedUserId === user.id ? "bg-[#B2DFDB]" : ""
              }`}
            >
              {user.name}
            </div>
          ))}
        </div>

        {/* Chat Window */}
        <div className="flex-1 flex flex-col justify-between">
          <div className="p-6 overflow-y-auto h-[85vh]">
            {(messages[selectedUserId] || []).map((msg, index) => (
              <div
                key={index}
                className={`mb-4 flex ${
                  msg.sender === "you" ? "justify-end" : "justify-start"
                }`}
              >
                <div
                  className={`px-4 py-2 rounded-2xl max-w-xs ${
                    msg.sender === "you"
                      ? "bg-[#4DB6AC] text-white"
                      : "bg-gray-200 text-gray-800"
                  }`}
                >
                  {msg.text}
                </div>
              </div>
            ))}
          </div>

          {/* Input */}
          <div className="border-t px-6 py-4 bg-white flex items-center gap-4">
            <input
              type="text"
              placeholder="Type a message..."
              value={newMessage}
              onChange={(e) => setNewMessage(e.target.value)}
              className="flex-1 border rounded-full px-4 py-2 outline-none"
            />
            <button
              onClick={handleSend}
              className="bg-[#00796B] text-white px-6 py-2 rounded-full hover:bg-[#004D40] transition-all"
            >
              Send
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Chat;
