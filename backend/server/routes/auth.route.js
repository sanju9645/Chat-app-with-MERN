import express from "express";
import { signupPost, loginPost, logoutPost } from "../controllers/auth.controller.js";

const router = express.Router();

router.post("/signup", signupPost);

router.post("/login", loginPost);

router.post("/logout", logoutPost);


export default router;
