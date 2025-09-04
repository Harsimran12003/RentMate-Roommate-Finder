import { Server } from "socket.io";
import Message from "../models/Message.js";
import Chat from "../models/Chat.js";

const socketHandler = (server) => {
  const io = new Server(server, {
    cors: {
      origin: "http://localhost:5173", 
      methods: ["GET", "POST"],
    },
  });

  io.on("connection", (socket) => {
    console.log("User connected:", socket.id);

    // User joins a chat room
    socket.on("joinChat", (chatId) => {
      socket.join(chatId);
    });

    // Handle sending a message
    socket.on("sendMessage", async (msgData) => {
      try {
        const newMsg = new Message(msgData);
        await newMsg.save();

        // update lastMessage and bump updatedAt
        await Chat.findByIdAndUpdate(
          newMsg.chatId,
          { lastMessage: newMsg._id, updatedAt: new Date() },
          { new: true }
        );

        io.to(msgData.chatId).emit("newMessage", newMsg);
      } catch (err) {
        console.error("Error saving message:", err);
      }
    });

    // Disconnect
    socket.on("disconnect", () => {
      console.log("Client disconnected:", socket.id);
    });
  });
};

export default socketHandler;
