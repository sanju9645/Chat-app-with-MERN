import { secureExecute, sendCustomErrorResponse, sendCustomSuccessResponse } from '../lib/utils.lib.js';
import {allUsersExceptCurrentUser} from '../lib/ops/user.ops.js';

export const userSidebarGet = (req, res) => {
  const errMessage = "Error in userSidebarGet controller";

  secureExecute(req, res, errMessage, async (req, res) => {
    const filteredUsers = await allUsersExceptCurrentUser(req, res);

    res.status(200).json(filteredUsers);
  });
};