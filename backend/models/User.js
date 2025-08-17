import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  fullName: String,
  email: { type: String, unique: true },
  password: String,
  gender: String,
  phone: String,
  age: Number,
  city: String,
  occupation: String,
  hobbies: String,
  habits: [String],
  profilePhoto: String, 
});

const User = mongoose.model("User", userSchema);
export default User;
