import Group from "../models/Group.js";
import User from "../models/User.js";

// ✅ Create Group (frontend sends usernames, backend resolves -> ObjectIds)
export const createGroup = async (req, res) => {
  try {
    const { name, members } = req.body; 

    if (!name || !members || members.length === 0) {
      return res.status(400).json({ message: "Name and members are required" });
    }

    // Convert usernames → ObjectIds
    const users = await User.find({ fullName: { $in: members } });

    if (users.length !== members.length) {
      const foundNames = users.map((u) => u.fullName);
      const missing = members.filter((m) => !foundNames.includes(m));
      return res.status(400).json({ message: `Users not found: ${missing.join(", ")}` });
    }

    const userIds = users.map((u) => u._id);

    const group = new Group({
      name,
      members: userIds,
      createdBy: req.user._id, // from auth middleware
    });

    await group.save();

    // Return populated members so frontend immediately sees names
    const populated = await group.populate("members", "fullName email");

    res.status(201).json(populated);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// ✅ Get all groups where logged-in user is a member
export const getUserGroups = async (req, res) => {
  try {
    const groups = await Group.find({ members: req.user._id })
      .populate("members", "fullName email");
    res.json(groups);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// ✅ Get members of a group
export const getGroupMembers = async (req, res) => {
  try {
    const group = await Group.findById(req.params.id)
      .populate("members", "fullName email");
    if (!group) return res.status(404).json({ message: "Group not found" });
    res.json(group.members);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// ✅ Delete group
export const deleteGroup = async (req, res) => {
  try {
    const group = await Group.findById(req.params.id);
    if (!group) return res.status(404).json({ message: "Group not found" });

    if (group.createdBy.toString() !== req.user._id.toString()) {
      return res.status(403).json({ message: "Not authorized" });
    }

    await group.deleteOne();
    res.json({ message: "Group deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// ✅ Search users (for selecting group members)
export const searchUsers = async (req, res) => {
  try {
    const { q } = req.query;
    if (!q) return res.status(400).json({ message: "Query required" });

    const users = await User.find({
      $or: [
        { fullName: new RegExp(q, "i") },
        { email: new RegExp(q, "i") },
      ],
    }).select("fullName email");

    res.json(users);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
