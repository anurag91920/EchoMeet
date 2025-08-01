// app.js या server.js

import express from "express";
import { createServer } from "http";
import { Server } from "socket.io";
import mongoose from "mongoose";
import dotenv from "dotenv";
import cors from "cors";

import userRoutes from "./routes/users.routes.js";  // आपकी यूजर routes

dotenv.config();

const app = express();
const server = createServer(app);

// CORS config: केवल React frontend से requests allow करें
app.use(cors({
  origin: "http://localhost:3000",   // React app का URL
  methods: ["GET", "POST", "PUT", "DELETE"],
  credentials: true,                  // अगर आप cookies या authorization header भेज रहे हैं तो true करें
}));

// JSON और URL encoded body parsing
app.use(express.json({ limit: "40kb" }));
app.use(express.urlencoded({ extended: true, limit: "40kb" }));

// Static files serve करना है अगर कोई है तो
app.use(express.static("public"));

// Socket.io सेटअप
const io = new Server(server, {
  cors: {
    origin: "http://localhost:3000",
    methods: ["GET", "POST"],
    credentials: true,
  }
});

io.on("connection", (socket) => {
  console.log(`Socket connected: ${socket.id}`);

  socket.on("disconnect", () => {
    console.log(`Socket disconnected: ${socket.id}`);
  });
});

// Simple test route
app.get("/", (req, res) => {
  res.send("Server is running");
});

// API routes
app.use("/api/v1/users", userRoutes);

// MongoDB और server स्टार्ट करना
const start = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URL, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log("MongoDB connected");

    const PORT = process.env.PORT || 8000;
    server.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`);
    });
  } catch (err) {
    console.error("Failed to connect MongoDB", err);
    process.exit(1);
  }
};

start();

// export { io };  // अगर कहीं और socket.io चाहिए तो export करें
// app.js या server.js का अंत