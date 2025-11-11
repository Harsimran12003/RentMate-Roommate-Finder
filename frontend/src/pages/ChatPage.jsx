import React, { useEffect, useState, useRef } from "react";
import { useParams } from "react-router-dom";
import { io } from "socket.io-client";
import Sidebar from "../components/Sidebar";
import ChatList from "../components/ChatList";
import ChatHeader from "../components/ChatHeader";
import MessageBubble from "../components/MessageBubble";
import ChatInput from "../components/ChatInput";
import EmojiPicker from "emoji-picker-react";
import { IoClose } from "react-icons/io5";
import { fetchChats, fetchMessages, uploadFile } from "../services/chatService";

const socket = io("http://localhost:5000");

const ChatPage = () => {
  const { chatId: paramChatId } = useParams();
  const [chats, setChats] = useState([]);
  const [selectedChat, setSelectedChat] = useState(null);
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState("");
  const [file, setFile] = useState(null);
  const [preview, setPreview] = useState(null);
  const [showEmojiPicker, setShowEmojiPicker] = useState(false);
  const [previewImage, setPreviewImage] = useState(null);
  const [isRecording, setIsRecording] = useState(false);

  const mediaRecorderRef = useRef(null);
  const audioChunksRef = useRef([]);
  const bottomRef = useRef(null);

  const [mobileOpen, setMobileOpen] = useState(false); // <-- mobile chat list toggle

  const currentUser = JSON.parse(localStorage.getItem("user")) || {};

  // --- Preview Handler ---
  const handleFileChange = (file) => {
    if (!file) return;
    const url = URL.createObjectURL(file);
    setFile(file);
    setPreview({ file, url, type: file.type });
  };

  const removePreview = () => {
    setFile(null);
    setPreview(null);
  };

  // --- Select chat from URL ---
  useEffect(() => {
    if (paramChatId) {
      setSelectedChat((prev) =>
        prev?._id === paramChatId ? prev : { _id: paramChatId }
      );
      setMobileOpen(false); // close list on navigation (mobile)
    }
  }, [paramChatId]);

  // --- Fetch chats ---
  useEffect(() => {
    if (!currentUser?.id) return;
    fetchChats(currentUser.id).then((data) => {
      setChats(data);
      if (paramChatId) {
        setSelectedChat(data.find((c) => c._id === paramChatId));
      }
    });
  }, [currentUser?.id, paramChatId]);

  // --- Fetch messages & socket listener ---
  useEffect(() => {
    if (!selectedChat?._id) return;
    socket.emit("joinChat", selectedChat._id);

    fetchMessages(selectedChat._id).then((msgs) => setMessages(msgs));

    const onNewMessage = (msg) => {
      if (msg.chatId === selectedChat._id) {
        setMessages((prev) => [...prev, msg]);
      }
    };
    socket.on("newMessage", onNewMessage);

    return () => socket.off("newMessage", onNewMessage);
  }, [selectedChat?._id]);

  // --- Auto scroll ---
  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  // --- Format headers / grouping (unchanged) ---
  const formatDateLabel = (dateString) => {
    const date = new Date(dateString);
    const now = new Date();

    const isToday =
      date.getDate() === now.getDate() &&
      date.getMonth() === now.getMonth() &&
      date.getFullYear() === now.getFullYear();

    const yesterday = new Date();
    yesterday.setDate(now.getDate() - 1);

    if (isToday) return "Today";
    if (date.toDateString() === yesterday.toDateString()) return "Yesterday";
    return date.toLocaleDateString();
  };

  const groupedMessages = (Array.isArray(messages) ? messages : []).reduce(
    (groups, msg) => {
      const date = new Date(msg.createdAt || msg.timestamp).toDateString();
      if (!groups[date]) groups[date] = [];
      groups[date].push(msg);
      return groups;
    },
    {}
  );

  const sortedDates = Object.keys(groupedMessages).sort(
    (a, b) => new Date(a) - new Date(b)
  );

  const getMembers = (chat) => chat?.members || chat?.participants || [];
  const getOtherUser = (chat) =>
    getMembers(chat).find((m) => m._id !== currentUser?.id);

  // --- Send message ---
  const handleSend = async () => {
    if (!selectedChat?._id) return;
    if (!newMessage.trim() && !file) return;

    let uploadedUrl = null;
    if (file) {
      uploadedUrl = await uploadFile(file);
    }

    const msgData = {
      chatId: selectedChat._id,
      senderId: currentUser.id,
      text: newMessage,
      fileUrl: uploadedUrl,
      createdAt: new Date().toISOString(),
    };

    socket.emit("sendMessage", msgData);

    setNewMessage("");
    setFile(null);
    setPreview(null);
    setShowEmojiPicker(false);
  };

  // --- Recording ---
  const startRecording = async () => {
    const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
    mediaRecorderRef.current = new MediaRecorder(stream);
    audioChunksRef.current = [];

    mediaRecorderRef.current.ondataavailable = (e) => {
      if (e.data.size > 0) {
        audioChunksRef.current.push(e.data);
      }
    };

    mediaRecorderRef.current.onstop = () => {
      const blob = new Blob(audioChunksRef.current, { type: "audio/mp3" });
      const audioFile = new File([blob], `recording-${Date.now()}.mp3`, {
        type: "audio/mp3",
      });
      handleFileChange(audioFile);
    };

    mediaRecorderRef.current.start();
    setIsRecording(true);
  };

  const stopRecording = () => {
    mediaRecorderRef.current?.stop();
    setIsRecording(false);
  };

  return (
    <div className="flex min-h-screen bg-white">
      {/* Hide main sidebar on small screens, keep for md+ */}
      <div className="hidden md:block">
        <Sidebar />
      </div>

      {/* Chat List: visible on md, on mobile shows as overlay controlled by mobileOpen */}
      <ChatList
        mobileOpen={mobileOpen}
        onClose={() => setMobileOpen(false)}
      />

      {/* Main chat area */}
      <div className="flex-1 flex flex-col bg-gradient-to-r from-[#F3F4F6] to-[#E0F2F1] h-screen relative">
        <ChatHeader
          otherUser={getOtherUser(selectedChat)}
          onOpenList={() => setMobileOpen(true)} // opens mobile chat list
        />

        {selectedChat?._id ? (
          <>
            {/* Messages */}
            <div className="flex-1 p-4 md:p-6 overflow-y-auto space-y-6 custom-scrollbar">
              {sortedDates.map((date, i) => (
                <div key={i}>
                  <div className="sticky top-2 z-10 mb-5 flex justify-center">
                    <span className="bg-gray-300 text-gray-800 px-3 py-1 rounded-full text-sm shadow-md">
                      {formatDateLabel(date)}
                    </span>
                  </div>
                  {groupedMessages[date].map((msg, index) => (
                    <MessageBubble
                      key={index}
                      msg={msg}
                      currentUser={currentUser}
                      setPreviewImage={setPreviewImage}
                    />
                  ))}
                </div>
              ))}
              <div ref={bottomRef} />
            </div>

            {/* File/Audio Preview */}
            {preview && (
              <div className="relative w-full max-w-xs mx-4 md:mx-6 mb-2 p-2 rounded-lg border bg-gray-50 shadow-md">
                <button
                  onClick={removePreview}
                  className=" bg-red-500 text-white rounded-full p-1 hover:bg-red-600 cursor-pointer float-right "
                >
                  <IoClose size={16} />
                </button>

                {preview.type.startsWith("image/") && (
                  <img
                    src={preview.url}
                    alt="preview"
                    className="max-h-40 rounded-md object-cover "
                  />
                )}
                {preview.type.startsWith("video/") && (
                  <video src={preview.url} controls className="max-h-40 rounded-md" />
                )}
                {preview.type.startsWith("audio/") && (
                  <audio src={preview.url} controls className="w-full h-[70px]" />
                )}
              </div>
            )}

            {/* Input */}
            <ChatInput
              newMessage={newMessage}
              setNewMessage={setNewMessage}
              handleSend={handleSend}
              showEmojiPicker={showEmojiPicker}
              setShowEmojiPicker={setShowEmojiPicker}
              isRecording={isRecording}
              startRecording={startRecording}
              stopRecording={stopRecording}
              setFile={setFile}
            />

            {/* Emoji Picker */}
            {showEmojiPicker && (
              <div className="absolute bottom-28 left-4 md:left-10 bg-white shadow-lg rounded-lg z-50">
                <EmojiPicker
                  onEmojiClick={(emoji) =>
                    setNewMessage((p) => p + emoji?.emoji)
                  }
                />
              </div>
            )}

            {/* Image Full Preview */}
            {previewImage && (
              <div
                className="fixed inset-0 bg-black bg-opacity-70 flex items-center justify-center z-50"
                onClick={() => setPreviewImage(null)}
              >
                <img
                  src={previewImage}
                  alt="preview"
                  className="max-w-[90%] max-h-[90%] rounded-lg"
                />
              </div>
            )}
          </>
        ) : (
          <div className="flex-1 flex items-center justify-center text-gray-500">
            Select a chat to start messaging
          </div>
        )}
      </div>
    </div>
  );
};

export default ChatPage;
