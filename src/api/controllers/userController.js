import { validationResult } from "express-validator";
import User from "../../lib/modals/user.js";

const getUser = async (req, res) => {
  try {
    const { userId } = req.params;
    const userGet = await User.findOne({
      username: userId
    });

    if (!userGet) {
      res.status(404).json({ error: "User not found" });
    } else {
      res.status(200).json({ userGet });
    }
  } catch (err) {
    res.status(500).json({ message: "Internal Server Error" });
  }
}

const getUserChats = async (req, res) => {
    try {
        const { userId } = req.params;
        const userGet = await User.findOne({
            _id: userId
        });

        if (!userGet) {
            res.status(404).json({ error: "User not found" });
        } else if (!userGet.friends) {
            res.status(404).json({ error: "User has no chats" });
        } else {
            res.status(200).json({ friends: userGet.chats });
        }
    } catch (err) {
        res.status(500).json({ message: "Internal Server Error" });
    }
}

const getUserFriends = async (req, res) => {
  try {
    const { userId } = req.params;
    const userGet = await User.findOne({
      _id: userId
    });

    if (!userGet) {
      res.status(404).json({ error: "User not found" });
    } else if (!userGet.friends) {
      res.status(404).json({ error: "User has no friends" });
    } else {
      res.status(200).json({ friends: userGet.friends });
    }
  } catch (err) {
    res.status(500).json({ message: "Internal Server Error" });
  }
}

const getAllUsers = async (req, res) => {
  try {
    const users = await find();
    res.status(200).json({ users });
  } catch (err) {
    res.status(500).json({ message: "Internal Server Error" });
  }
}

const modifyUser = async (req,res) => { 
  const errors = validationResult(req);
  if (!errors.isEmpty()) 
    return res.status(400).json({ errors: errors.array() });

  const { newUsername, newEmail } = req.body;

  const userId = req.userId;
  const dbUser = await findOne({ _id: userId });
  if (!dbUser)
    return res.status(500).json({ message: "An unexpected error has occured" });
  
  let result = [];
  if (newUsername && dbUser.username !== newUsername) {
    dbUser.username = newUsername;
    await dbUser.save();
    result.push({ message: `Username changed to ${newUsername} successfully` });
  } else if (newUsername) {
    return res.status(400).json({ error: "Your new username must be different from old username"});
  }
      
  if (newEmail && dbUser.email !== newEmail) {
    dbUser.email = newEmail;
    await dbUser.save();
    result.push({ message: `Email changed to ${newEmail} successfully` });
  } else if (newEmail) {
    return res.status(400).json({ error: "Your new email must be different from old email"});
  }

  res.status(200).json({ message: 'Success', data: result });
}

export { getUser, getAllUsers, modifyUser, getUserChats, getUserFriends };