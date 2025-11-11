import User from "../models/User.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

// Register a new user 

export const registerUser = async (req, res) => {
  try {
    const {
      fullName,
      email,
      password,
      confirmPassword,
      gender,
      phone,
      age,
      city,
      occupation,
      hobbies,
      habits
    } = req.body;

    if (!fullName || !email || !password) {
      return res.status(400).json({ message: "Full name, email, and password are required" });
    }
    if (password !== confirmPassword) {
      return res.status(400).json({ message: "Passwords do not match" });
    }

    // Check if email already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: "Email already registered" });
    }

    // Hash password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const profilePhoto = req.files?.profilePhoto
      ? `/uploads/${req.files.profilePhoto[0].filename}`
      : "";
    const policeVerification = req.files?.policeVerification
      ? `/uploads/${req.files.policeVerification[0].filename}`
      : "";

const newUser = new User({
      fullName,
      email,
      password: hashedPassword,
      gender,
      phone,
      age,
      city,
      occupation,
      hobbies,
      habits,
      profilePhoto,
      policeVerification
    });


    const savedUser = await newUser.save();
    res.status(201).json({
      message: "User registered successfully",
      user: {
        id: savedUser._id,
        fullName: savedUser.fullName,
        email: savedUser.email,
        profilePhoto: savedUser.profilePhoto,
        policeVerification: savedUser.policeVerification,
      },
    });
  } catch (error) {
    res.status(500).json({ message: "Error registering user", error: error.message });
  }
};


// Login user
export const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    // 1. Check if user exists
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ message: "Invalid email or password" });
    }

    // 2. Compare password
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: "Invalid email or password" });
    }

    user.lastLogin = new Date();
    await user.save();

    // 3. Generate JWT
    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
      expiresIn: "1d",
    });

    res.json({
  message: "Login successful",
  token,
  user: {
    id: user._id,
    fullName: user.fullName,
    email: user.email,
    gender: user.gender,
    phone: user.phone,
    city: user.city,
    age: user.age,
    occupation: user.occupation,
    hobbies: user.hobbies,
    habits: user.habits,
    profilePhoto: user.profilePhoto,
    policeVerification: user.policeVerification, // ✅ Include this
  },
});
  } catch (error) {
    res.status(500).json({ message: "Error logging in", error });
  }
  
};

// Get user profile
export const getUserProfile = async (req, res) => {
  try {
    if (!req.user) {
      return res.status(401).json({ message: "User not found" });
    }
    res.json(req.user);
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};


// Update user profile
export const updateUserProfile = async (req, res) => {
  try {
    const updates = req.body;

    if (updates.habits) {
      if (typeof updates.habits === "string") {
        updates.habits = updates.habits.split(",").map(h => h.trim());
      }
    }
    
    if (req.file) {
      updates.profilePhoto = `/uploads/${req.file.filename}`;
    }

    const updatedUser = await User.findByIdAndUpdate(req.user._id, updates, {
      new: true,
    });

    res.json({
      message: "Profile updated successfully",
      user: updatedUser,
    });
  } catch (error) {
    console.error("Update profile error:", error);
    res.status(500).json({ message: "Error updating profile", error: error.message });
  }
};


// Change password
export const changePassword = async (req, res) => {
  try {
    const { currentPassword, newPassword } = req.body;

    if (!currentPassword || !newPassword) {
      return res.status(400).json({ message: "Both current and new passwords are required" });
    }

    const user = await User.findById(req.user._id);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // Verify current password
    const isMatch = await bcrypt.compare(currentPassword, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: "Current password is incorrect" });
    }

    // Hash new password
    const salt = await bcrypt.genSalt(10);
    user.password = await bcrypt.hash(newPassword, salt);

    await user.save();

    res.json({ message: "Password updated successfully" });
  } catch (error) {
    res.status(500).json({ message: "Error changing password", error: error.message });
  }
};



