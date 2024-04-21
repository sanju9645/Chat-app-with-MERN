import { response } from "express";

export const secureExecute = (req, res, errMsg, callback) => {
  try {
    callback(req, res);
  } catch (error) {
    console.error(errMsg, error.message);
    sendCustomErrorResponse(res, "Internal Server Error", 500);
    return;
  }
}

export const isProdEnv = () => {
  return process.env.MODE_ENV !== "development";
}

export const sendCustomErrorResponse = (res, error, responseCode = 400) => {
  res.status(responseCode).json({ error });
  return;
}

export const sendCustomSuccessResponse = (res, message, responseCode = 200) => {
  return res.status(responseCode).json({ message });
}
