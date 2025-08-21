import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    fullName: {
      type: String,
      required: true,
      trim: true,
    },
    email: {
      type: String,
      unique: true,
      required: true,
      lowercase: true,
      trim: true,
    },
    password: {
      type: String,
      required: true,
      minlength: 5, 
    },
    gender: {
      type: String,
    },
    phone: {
      type: String,
      trim: true,
    },
    age: {
      type: Number,
      min: 0,
    },
    city: {
      type: String,
      trim: true,
    },
    occupation: {
      type: String,
      trim: true,
    },
    hobbies: {
      type: String, 
      trim: true,
    },
    habits: {
      type: [String], 
      default: [],
    },
    budget: {
      type: Number, 
      min: 0,
      default: 0,
    },
    profilePhoto: {
      type: String,
      default: "",
    },
    lastLogin: {
      type: Date,
      default: null, 
    },
  },
  { timestamps: true } 
);

const User = mongoose.model("User", userSchema);
export default User;
