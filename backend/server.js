import http from "http";
import app from "./app.js";
import socketHandler from "./socket/socket.js";

const PORT = process.env.PORT || 5000;

// Create HTTP server and attach socket.io
const server = http.createServer(app);
socketHandler(server);

// Start the server
server.listen(PORT, () => {
  console.log(`🚀 RentMate server running locally on port ${PORT}`);
});
