import express from "express";
import dotenv from "dotenv";
import cors from "cors";

import connectDB from "./config/db.js";


import authRoutes from "./routes/authRoutes.js";
import postRoutes from "./routes/postRoutes.js";
import userRoutes from "./routes/userRoutes.js";
import uploadRoutes from "./routes/uploadRoutes.js";
import notificationRoutes from "./routes/notificationRoutes.js";

dotenv.config();

const app = express();

// Database
connectDB();

// Middlewares
app.use(cors());
app.use(express.json());

// Test Route
app.get("/", (req, res) => {
  res.send("Backend is Running 🚀");
});

/*
=========================
API ROUTES
=========================
*/

// Authentication
app.use("/api/auth", authRoutes);

// Posts
app.use("/api/post", postRoutes);

// Users
app.use("/api/user", userRoutes);

app.use("/api/upload", uploadRoutes);

app.use("/api/notification", notificationRoutes);

// Server
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});