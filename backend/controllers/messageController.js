import Message from "../models/Message.js";
import Chat from "../models/Chat.js";

// Get all messages in a chat
export const getMessages = async (req, res) => {
  try {
    const messages = await Message.find({ chatId: req.params.chatId });
    res.status(200).json(messages);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Send a new message
export const sendMessage = async (req, res) => {
  const { chatId, senderId, text, fileUrl } = req.body;

  try {
    const newMessage = new Message({ chatId, senderId, text, fileUrl });
    const savedMessage = await newMessage.save();

    // update chat's last message
    await Chat.findByIdAndUpdate(
      chatId,
      { lastMessage: savedMessage._id },
      { new: true }
    );

    res.status(201).json(savedMessage);
  } catch (err) {
    console.error("Error saving message:", err);
    res.status(500).json({ error: err.message });
  }
};
