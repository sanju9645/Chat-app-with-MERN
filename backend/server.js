import express from "express";
import dotenv from "dotenv";

import authRoutes from "./server/routes/auth.route.js";
import connectDB from "./server/config/mongoDb.js";

/**
 * -------------- GENERAL SETUP ----------------
 */

// Setting up variables
const app = express();
const PORT = process.env.PORT || 3000;

// Gives us access to variables set in the .env file via `process.env.VARIABLE_NAME` syntax
dotenv.config();

/**
 * -------------- MIDDLEWARES ----------------
 */
app.use(express.json()); // to parse the incoming requests with JSON payloads (from req.body)
app.use("/api/auth", authRoutes);



/**
 * -------------- SERVER ----------------
 */

// Server listens on http://localhost:PORT
app.listen(PORT, async () => {
  await connectDB();
  console.log(`APP listening on port ${PORT}`);
});

