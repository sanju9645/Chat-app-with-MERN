import { generatePasswordHash, generatePropfilePic } from '../auth.lib.js';
import { sendCustomErrorResponse } from '../utils.lib.js';
import User from '../../models/user.model.js';

export const userById = async (id) => {
  const user = await User.findOne({ _id : id });
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
