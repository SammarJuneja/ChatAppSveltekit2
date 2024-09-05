import Chat from "../../lib/modals/chat.js";
import Message from "../../lib/modals/message.js";
import User from "../../lib/modals/user.js";
import authMiddleware from "../middleware.js";
import { Router } from "express";
import { body, oneOf } from 'express-validator';
import { getUser, getAllUsers, modifyUser, getUserChats, getUserFriends } from "../controllers/userController.js";

const router = Router();

router.get(
  "/get/:userId", 
//   authMiddleware,
  getUser
);

router.get(
    "/get/chats/:userId",
    getUserChats
)

router.get(
  "/get/users", 
//   authMiddleware,
  getAllUsers
);

router.get(
  "/get/friends/:userId",
  getUserFriends
)

router.post(
  "/user/edit",
  [
    oneOf([
      body("newUsername")
        .trim().escape()
        .isLength({ min: 3, max: 30 }).withMessage('Username must be between 3 and 30 characters long')
        .isAlphanumeric().withMessage('Username must be alphanumeric')
        .not().contains(' ').withMessage('Username cannot contain spaces')
        .custom(async username => {
          const user = await findOne({ username });
          if (user) throw new Error("Username is already taken");
        }),
      body('newEmail')
        .trim().escape()
        .isEmail().withMessage('Invalid E-mail address')
        .custom(async email => {
          const user = await findOne({ email });
          if (user) throw new Error("An account with this email already exist");
        }),
    ], {
      message: 'Must include one of the following: newUsername|newEmail'
    })
  ],
//   authMiddleware,
  modifyUser
);

export { router };