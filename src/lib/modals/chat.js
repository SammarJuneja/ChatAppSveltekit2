import { Schema, Types, model } from "mongoose";

const chatSchema = new Schema({
  participants: [{
    type: Types.ObjectId,
    ref: 'User',
    required: true
  }],
  lastMessage: {
    type: Types.ObjectId,
    ref: 'Message'
  },
  lastMessageDate: {
    type: Date,
    default: Date.now
  }
});

const Chat = model("Chat", chatSchema);

export default Chat;