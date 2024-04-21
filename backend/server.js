import path from "path";
import express from "express";
import dotenv from "dotenv";
import cookieParsor from "cookie-parser";

import authRoutes from "./server/routes/auth.route.js";
import messageRoutes from "./server/routes/message.route.js";
import userRoutes from "./server/routes/user.route.js";

import connectDB from "./server/config/mongoDb.js";

import { app, server } from "./server/config/socket.js";

/**
 * -------------- GENERAL SETUP ----------------
 */

// Setting up variables
const PORT = process.env.PORT || 3000;

const __dirname = path.resolve();

// Gives us access to variables set in the .env file via `process.env.VARIABLE_NAME` syntax
dotenv.config();

/**
 * -------------- MIDDLEWARES ----------------
 */
app.use(express.json()); // to parse the incoming requests with JSON payloads (from req.body)
app.use(cookieParsor());

app.use("/api/auth", authRoutes);
app.use("/api/messages", messageRoutes);
app.use("/api/users", userRoutes);



/**
 * -------------- SERVER ----------------
 */

// Server listens on http://localhost:PORT
server.listen(PORT, async () => {
  await connectDB();
  console.log(`APP listening on port ${PORT}`);
});

