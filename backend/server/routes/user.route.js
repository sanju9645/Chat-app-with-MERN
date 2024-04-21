import express from "express";

import protectRoute from '../middleware/protectRoute.js';
import { userSidebarGet } from "../controllers/user.controller.js";


const router = express.Router();

router.get("/", protectRoute, userSidebarGet);

export default router;
