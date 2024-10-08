import Chat from "../../lib/modals/chat.js";
import Message from "../../lib/modals/message.js";
import User from "../../lib/modals/user.js";
import authMiddleware from "../middleware.js";
import { getUserChats, startChat, sendMessage, editMessage, addReaction, deleteMessage } from "../controllers/chatController.js";
import { Router } from "express";
import { body } from "express-validator";

const router = Router();
// chat id 665c52fa0e66697107164be2
// user id 665c52570e66697107164bda

router.get(
  "/get/:userId", 
//   authMiddleware,
  getUserChats
);

router.post(
  "/start",
  [
    body("userid")
    .notEmpty().withMessage("User was not found")
    .custom(async (userid) => {
      const userGet = await User.findOne({
        _id: userid
      });
      if (!userGet) {
        throw new Error("User with provided id was not found");
      }
    }),
  ],
  // authMiddleware, 
  startChat
);

router.post(
  "/message/send",
  [
    body("chatId")
    .trim().escape()
    .notEmpty().withMessage("ChatId was not provided")
    .custom(async (chatId) => {
      const chatGet = await Chat.findOne({
        _id: chatId
      });
      if (!chatGet) {
        throw new Error("Chat with provided id was not found");
      }
    }),
    body("message")
    .trim().escape()
    .notEmpty().withMessage("You can\'t send empty message")
  ],
  authMiddleware,
  sendMessage
);

router.put(
  "/reaction/add",
  [
    body("messageId")
    .trim().escape()
    .notEmpty().withMessage("MessageId was not provided")
    .custom(async (messageId) => {
        const messageGet = await Message.findOne({
            _id: messageId
        });
        if (!messageGet) {
            throw new Error("Message with provided id was not found");
        }
    }),
    body("reaction")
    .trim().escape()
    .notEmpty().withMessage("Cannot add empty reaction"),
  ],
  authMiddleware,
  addReaction
);

router.put(
  "/message/edit",
  [
    body("messageId")
    .trim().escape()
    .notEmpty().withMessage("MessageId was not provided")
    .custom(async (messageId) => {
      const messageGet = await Message.findOne({
        _id: messageId
      });
      if (!messageGet) {
        throw new Error("Message with provided id was not found")
      }
    }),
    body("message")
    .trim().escape(),
  ],
  authMiddleware,
  editMessage
);

router.delete(
  "/message/delete/:messageId",
  authMiddleware,
  deleteMessage
);

export { router };