import jwt from 'jsonwebtoken';

import { secureExecute, sendCustomErrorResponse } from '../lib/utils.lib.js';
import { userById } from '../lib/ops/user.ops.js';


const protectRoute = (req, res, next) => {
  const errMessage = "Error in protectRoute middleware controller";

  secureExecute(req, res, errMessage, async (req, res) => {
    const token = req.cookies.jwt;

    if (!token) {
      sendCustomErrorResponse(res, "Unauthorized - No Token Provided", 401);
      return;
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    if (!decoded) {
      sendCustomErrorResponse(res, "Unauthorized - Invalid Token", 401);
      return;
    }

    const user = await userById(decoded.userId);

    if (!user) {
      sendCustomErrorResponse(res, "User not found", 401);
      return;
    }

    req.user = user;
    next();
  });
}

export default protectRoute;