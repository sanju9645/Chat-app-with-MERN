import bcrypt from "bcryptjs";
import jwt from 'jsonwebtoken';

import { isProdEnv, sendCustomErrorResponse } from './utils.lib.js';
import { userByUsername } from './ops/user.ops.js';

export const validateSignupData = async (req, res) => {
  const { username, password, confirmPassword } = req.body;

  if (password !== confirmPassword) {
    sendCustomErrorResponse(res, "Password don't match");
    return;
  }
  const user = await userByUsername(username);

  if (user) {
    sendCustomErrorResponse(res, "Username already exists");
    return;
  }
  
  return true;
}

export const generatePasswordHash = async (req, res) => {
  const { password } = req.body;

  const salt = await bcrypt.genSalt(11);
  const hashedPassword = await bcrypt.hash(password, salt);

  return hashedPassword;
}

export const generatePropfilePic = (req, res) => {
  const { gender, username } = req.body;

  // https://avatar-placeholder.iran.liara.run/document/#username
  const boyProfilePic = `https://avatar.iran.liara.run/public/boy?username=${username}`;
  const girlProfilePic = `https://avatar.iran.liara.run/public/girl?username=${username}`;
  
  return gender === "male" ? boyProfilePic : girlProfilePic;
}

export const generateTokenAndSetCookie = (userId, res) => {
  const token = jwt.sign({ userId }, process.env.JWT_SECRET, {
    expiresIn: `${process.env.JWT_TOKEN_EXPIRY_DAYS}d`,
  });

  res.cookie("jwt", token, {
    maxAge: Number(process.env.JWT_TOKEN_EXPIRY_DAYS) * 24 * 60 * 60 * 1000, // MS
    httpOnly: true, // optional: ensures the cookie is only accessible through HTTP(S) requests, prevent XSS attacks - cross-site scripting attacks
    sameSite : "strict", // CSRF attacks - cross-site request forgery attacks
    secure: isProdEnv()
  });
}

export const authenticateUsernameAndPassword = async (req, res) => {
  const { username, password } = req.body;
  const user = await userByUsername(username);

  const isPasswordCorrect = await bcrypt.compare(password, user?.password || "");

  if (!user || !isPasswordCorrect) {
    sendCustomErrorResponse(res, "Invalid username or password");
    return;
  } else {
    generateTokenAndSetCookie(user._id, res);
    return user;
  }
}

export const sendUserDataResponse = (req, res, userData, additionalData = []) => {
  const responseData = {
    _id: userData._id,
    fullName: userData.fullName,
    username: userData.username,
    profilePic: userData.profilePic,
    ...Object.fromEntries(additionalData) // Convert array of key-value pairs to object
  };

  return res.status(201).json(responseData);
};
