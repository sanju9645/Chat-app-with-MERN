import express from "express";

import { sendMessagePost,messagesGet } from "../controllers/message.controller.js";
import protectRoute from '../middleware/protectRoute.js';

const router = express.Router();

router.get("/:id", protectRoute, messagesGet);
router.post("/send/:id", protectRoute, sendMessagePost);

export default router;
