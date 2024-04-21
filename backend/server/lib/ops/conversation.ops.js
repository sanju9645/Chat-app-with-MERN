import Conversation from '../../models/conversation.model.js';

export const conversationById = async (id) => {
  const conversation = await Conversation.findOne({ _id : id });

  return conversation;
}

export const conversationBySenderAndReceiver = async (senderId, receiverId) => {
  const conversation = await Conversation.findOne({ participants : { $all: [ senderId, receiverId ] } });

  return conversation;
}

export const conversationCreate = async (senderId, receiverId) => {
  const conversation = await Conversation.create({ participants : [ senderId, receiverId ] });

  return conversation;
}

export const getOrCreateConversation = async (senderId, receiverId) => {
  // Check if conversation already exists
  let conversation = await conversationBySenderAndReceiver(senderId, receiverId);

  // If conversation doesn't exist, create a new one
  if (!conversation) {
    conversation = await conversationCreate(senderId, receiverId);
  }

  return conversation;
};

export const onversationWithMessages = async (senderId, receiverId) => {
  const conversation = await Conversation.findOne({ participants : { $all: [ senderId, receiverId ] } }).populate("messages");

  return conversation;
}
