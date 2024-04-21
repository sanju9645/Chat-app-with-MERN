import { generatePasswordHash, generatePropfilePic } from '../auth.lib.js';
import { sendCustomErrorResponse } from '../utils.lib.js';
import User from '../../models/user.model.js';

export const userById = async (id) => {
  const user = await User.findOne({ _id : id }).select( "-password");

  return user;
}

export const userByUsername = async (username) => {
  const user = await User.findOne({ username });
  return user;
}

export const createUserFromRequestBody = async (req, res) => {
  const { fullName, username, gender } = req.body;

  const hashedPassword = await generatePasswordHash(req, res);

  const newUser = new User({
    fullName,
    username,
    password: hashedPassword,
    gender,
    profilePic: generatePropfilePic(req, res)
  });

  if (newUser) {
    return await newUser.save();
  }

  return false;
}

export const allUsers = async () => {
  const users = await User.find().select("-password");
  return users;
}

export const allUsersExceptCurrentUser = async (req, res) => {
  const loggedInUserId = req.user._id;
  const filteredUsers = await User.find({ _id : { $ne: loggedInUserId }}).select("-password");

  return filteredUsers;
}
