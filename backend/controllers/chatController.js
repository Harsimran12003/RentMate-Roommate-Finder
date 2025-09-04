import Chat from "../models/Chat.js";

// Create or get existing chat
export const createOrGetChat = async (req, res) => {
  const { senderId, receiverId } = req.body;

  try {
    // Check if chat already exists
    let chat = await Chat.findOne({
      members: { $all: [senderId, receiverId] },
    });

    if (!chat) {
      chat = new Chat({ members: [senderId, receiverId] });
      await chat.save();
    }

    res.status(200).json(chat);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Get all chats of a user
export const getUserChats = async (req, res) => {
  try {
    const chats = await Chat.find({
      members: { $in: [req.params.userId] },
    })
      .populate("members", "id fullName email profilePhoto")
      .populate("lastMessage", "text fileUrl createdAt senderId")
      .sort({ updatedAt: -1 });

    res.status(200).json(chats);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
