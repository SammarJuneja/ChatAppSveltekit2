import { Schema, Types, model } from "mongoose";

const messageSchema = new Schema({
  chatId: {
    type: Types.ObjectId,
    required: true,
    ref: 'Chat'
  },
  sender: {
    type: Types.ObjectId,
    required: true,
    ref: 'User'
  },
  message: {
    type: String,
    required: true
  },
  attachment: [{
    type: String
  }],
  reaction: [{
    type: String
  }],
  status: {
    type: String,
    enum: ['sent', 'read'],
    default: 'sent'
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

const Message = model("Message", messageSchema);

export default Message;