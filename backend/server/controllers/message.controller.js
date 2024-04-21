import { secureExecute, sendCustomErrorResponse, sendCustomSuccessResponse } from '../lib/utils.lib.js';
import { sendMessage } from '../lib/ops/message.ops.js';
import {onversationWithMessages} from '../lib/ops/conversation.ops.js'

export const sendMessagePost = (req, res) => {
  const errMessage = "Error in sendMessage controller";

  secureExecute(req, res, errMessage, async (req, res) => {
    const newMessage = await sendMessage(req, res);
    res.status(200).json(newMessage);
  });
};

export const messagesGet = (req, res) => {
  const errMessage = "Error in messagesGet controller";

  secureExecute(req, res, errMessage, async (req, res) => {
    const {id: receiverId} = req.params;
    const senderId = req.user._id;
    
    const conversation = await onversationWithMessages(senderId, receiverId);

    const messages = conversation ? conversation.messages : [];

    res.status(200).json(messages);
  });
};

