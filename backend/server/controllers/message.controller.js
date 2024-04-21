import { secureExecute } from '../lib/utils.lib.js';
import { sendMessage } from '../lib/ops/message.ops.js';
import {onversationWithMessages} from '../lib/ops/conversation.ops.js'
import { getReceiverSocketId, io } from "../config/socket.js";

export const sendMessagePost = (req, res) => {
  const errMessage = "Error in sendMessage controller";

  secureExecute(req, res, errMessage, async (req, res) => {
    const {id: receiverId} = req.params;
    const newMessage = await sendMessage(req, res);

    // SOCKET IO FUNCTIONALITY WILL GO HERE
		const receiverSocketId = getReceiverSocketId(receiverId);
		if (receiverSocketId) {
			// io.to(<socket_id>).emit() used to send events to specific client
			io.to(receiverSocketId).emit("newMessage", newMessage);
		}

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

