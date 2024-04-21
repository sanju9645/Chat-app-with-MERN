import Message from '../../models/message.model.js';

import {getOrCreateConversation} from './conversation.ops.js';

export const messageById = async (id) => {
  const message = await Message.findOne({ _id : id });

  return message;
}

export const sendMessage = async (req, res) => {
  const message = req.body.message;
  const {id: receiverId} = req.params;
  const senderId = req.user._id;
  
  const conversation = await getOrCreateConversation(senderId, receiverId);

  const newMessage = new Message({
    senderId,
    receiverId,
    message,
    conversationId : conversation._id
  });

  if (newMessage) {
    conversation.messages.push(newMessage._id);
  }

  /*
  await conversation.save();
  await newMessage.save();

  This will be time consuming, because it will be executed in sequentially
  */
  await Promise.all([conversation.save(), newMessage.save()]);

  return newMessage;
}
