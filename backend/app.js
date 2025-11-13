import express from "express";
import http from "http";
import mongoose from "mongoose";
import dotenv from "dotenv";
import cors from "cors";
import userRoutes from "./routes/userRoutes.js";
import propertyRoutes from "./routes/propertyRoutes.js";
import matchRoutes from "./routes/matchRoutes.js";
import messageRoutes from "./routes/messageRoutes.js";
import chatRoutes from "./routes/chatRoutes.js";
import expenseRoutes from "./routes/expenseRoutes.js";
import groupRoutes from "./routes/groupRoutes.js";
import uploadRoutes from "./routes/uploadRoutes.js";
import path from "path";
import { fileURLToPath } from "url";

// Load environment variables
dotenv.config();

const app = express();

// Middleware
app.use(
  cors({
    origin: process.env.CLIENT_URL || "http://localhost:5173",
    credentials: true,
  })
);
app.use(express.json());

// MongoDB connection
mongoose
  .connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("✅ MongoDB connected"))
  .catch((err) => console.error("❌ MongoDB connection error:", err));

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Static uploads folder
app.use("/uploads", express.static(path.join(__dirname, "uploads")));

// API Routes
app.use("/api/users", userRoutes);
app.use("/api/properties", propertyRoutes);
app.use("/api/matches", matchRoutes);
app.use("/api/messages", messageRoutes);
app.use("/api/upload", uploadRoutes);
app.use("/api/chats", chatRoutes);
app.use("/api/expenses", expenseRoutes);
app.use("/api/groups", groupRoutes);

// Root route
app.get("/", (req, res) => {
  res.send("🏠 RentMate API is running...");
});

// ✅ If running locally → start HTTP + Socket.IO server
if (process.env.NODE_ENV !== "production") {
  const server = http.createServer(app);
  const { default: socketHandler } = await import("./socket/socket.js");
  socketHandler(server);

  const PORT = process.env.PORT || 5000;
  server.listen(PORT, () =>
    console.log(`🚀 Server running locally on port ${PORT}`)
  );
}

// ✅ If on Vercel → export app only (no server.listen)
export default app;
