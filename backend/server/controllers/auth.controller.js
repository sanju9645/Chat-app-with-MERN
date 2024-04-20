import { 
  validateSignupData, 
  generateTokenAndSetCookie, 
  authenticateUsernameAndPassword, 
  sendUserDataResponse 
} from '../lib/auth.lib.js';
import { secureExecute, sendCustomErrorResponse, sendCustomSuccessResponse } from '../lib/utils.lib.js';
import { createUserFromRequestBody } from '../lib/ops/user.ops.js';


export const signupPost = (req, res) => {
  const errMessage = "Error in signup controller";

  secureExecute(req, res, errMessage, async (req, res) => {
    if (await validateSignupData(req, res)) {
      const newUser = await createUserFromRequestBody(req, res);

      if (newUser) {
        generateTokenAndSetCookie(newUser._id, res);
        sendUserDataResponse(req, res, newUser);
      } else {
        sendCustomErrorResponse(res, "Invalid user data");
        return;
      }
    }
  });
};

export const loginPost = (req, res) => {
  const errMessage = "Error in login controller";

  secureExecute(req, res, errMessage, async (req, res) => {
    const user = await authenticateUsernameAndPassword(req, res);

    if (user) {
      sendUserDataResponse(req, res, user);
    }
  });
};

export const logoutPost = (req, res) => {
  const errMessage = "Error in logout controller";

  secureExecute(req, res, errMessage, async (req, res) => {
    res.cookie("jwt", "", { maxAge:0 });
    res.clearCookie('jwt');
    sendCustomSuccessResponse(res, "Logged out successfully");
  });
};
