import React from "react";

const MessageBubble = ({ msg, currentUser, setPreviewImage }) => {
  const isSender = (msg.senderId?._id || msg.senderId) === currentUser.id;

  const formatTime = (dateString) =>
    new Date(dateString).toLocaleTimeString([], {
      hour: "numeric",
      minute: "2-digit",
      hour12: true,
    });

  return (
    <div className={`mb-3 flex ${isSender ? "justify-end" : "justify-start"}`}>
      <div
        className={`px-4 py-2 rounded-2xl max-w-md relative text-sm leading-relaxed ${
          isSender ? "bg-[#4DB6AC] text-white" : "bg-gray-200 text-gray-800"
        }`}
      >
        {msg.text && <p className="pr-10">{msg.text}</p>}
        {msg.fileUrl && (
          <>
            {/\.(jpg|jpeg|png|gif|avif|svg)$/i.test(msg.fileUrl) ? (
              <img
                src={msg.fileUrl}
                alt="media"
                className="max-w-[220px] rounded-lg mt-2 mb-4 cursor-pointer"
                onClick={() => setPreviewImage(msg.fileUrl)}
              />
            ) : msg.fileUrl.endsWith(".mp4") ? (
              <video
                controls
                className="max-w-[220px] rounded-lg mt-2 mb-4"
              >
                <source src={msg.fileUrl} type="video/mp4" />
              </video>
            ) : msg.fileUrl.endsWith(".mp3") ? (
              <audio controls className="mt-2 mb-4">
                <source src={msg.fileUrl} type="audio/mp3" />
              </audio>
            ) : null}
          </>
        )}
        <span className="text-[10px] absolute bottom-1 right-2 opacity-70">
          {formatTime(msg.createdAt || msg.timestamp)}
        </span>
      </div>
    </div>
  );
};

export default MessageBubble;
