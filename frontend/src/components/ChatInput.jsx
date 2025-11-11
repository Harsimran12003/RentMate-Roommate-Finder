import React, { useState, useEffect } from "react";
import { IoIosAttach, IoIosMic } from "react-icons/io";
import { IoSend } from "react-icons/io5";
import { FaStop } from "react-icons/fa";
import { IoClose } from "react-icons/io5";

const ChatInput = ({
  newMessage,
  setNewMessage,
  handleSend,
  showEmojiPicker,
  setShowEmojiPicker,
  isRecording,
  startRecording,
  stopRecording,
  setFile,
}) => {
  const [preview, setPreview] = useState(null);

  useEffect(() => {
    if (!preview) return;
    return () => URL.revokeObjectURL(preview.url);
  }, [preview]);

  const handleFileChange = (file) => {
    if (!file) return;
    const url = URL.createObjectURL(file);
    setPreview({ file, url, type: file.type });
    setFile(file);
  };

  const removePreview = () => {
    setPreview(null);
    setFile(null);
  };

  const handleSendClick = () => {
    handleSend();
    removePreview();
  };

  return (
    <div className="border-t px-4 md:px-6 py-3 bg-white flex flex-col gap-2 sticky bottom-0 z-10">
      {/* Preview Box */}
      {preview && (
        <div className="relative w-full max-w-xs p-2 rounded-lg border bg-gray-50 shadow-md">
          <button
            onClick={removePreview}
            className="absolute top-1 right-1 bg-red-500 text-white rounded-full p-1 hover:bg-red-600 cursor-pointer"
          >
            <IoClose size={16} />
          </button>

          {preview.type.startsWith("image/") && (
            <img
              src={preview.url}
              alt="preview"
              className="max-h-40 rounded-md object-cover"
            />
          )}
          {preview.type.startsWith("video/") && (
            <video src={preview.url} controls className="max-h-40 rounded-md" />
          )}
          {preview.type.startsWith("audio/") && (
            <audio src={preview.url} controls className="w-full" />
          )}
        </div>
      )}

      {/* Input Row */}
      <div className="flex items-center gap-3 flex-wrap">
        <button
          onClick={() => setShowEmojiPicker((s) => !s)}
          className="px-3 py-2 rounded-full bg-gray-200 hover:bg-gray-300 cursor-pointer"
          aria-label="Toggle emojis"
        >
          😄
        </button>

        <textarea
          rows={1}
          placeholder="Type a message..."
          value={newMessage}
          onChange={(e) => setNewMessage(e.target.value)}
          className="flex-1 min-h-[40px] max-h-40 border rounded-full px-4 py-2 outline-none resize-none"
        />

        {/* File Upload */}
        <input
          type="file"
          onChange={(e) => handleFileChange(e.target.files[0])}
          className="hidden"
          id="fileInput"
        />
        <label
          htmlFor="fileInput"
          className="cursor-pointer px-3 py-2 rounded-full bg-gray-200 hover:bg-gray-300"
          title="Attach file"
        >
          <IoIosAttach />
        </label>

        {/* Mic / Stop Recording */}
        {!isRecording ? (
          <button
            onClick={startRecording}
            className="px-3 py-2 rounded-full bg-[#00796B] text-white hover:bg-green-600 cursor-pointer"
            title="Record voice"
          >
            <IoIosMic />
          </button>
        ) : (
          <button
            onClick={stopRecording}
            className="px-3 py-2 rounded-full bg-green-500 text-white hover:bg-green-600 animate-pulse cursor-pointer"
            title="Stop recording"
          >
            <FaStop />
          </button>
        )}

        {/* Send Button */}
        <button
          onClick={handleSendClick}
          className="bg-[#00796B] text-white px-4 py-2 rounded-full hover:bg-[#004D40] transition-all cursor-pointer"
          title="Send"
        >
          <IoSend />
        </button>
      </div>
    </div>
  );
};

export default ChatInput;
