import { Router } from"express";
import { body, query, oneOf } from"express-validator";
const router = Router();
import { login, register } from "../controllers/authController.js";
import User from "../../lib/modals/user.js";

const passwordRegex = /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?\d)(?=.*?[#?!@$%^&*-]).{8,}$/;

const dummyProfile = {
  "username": "helllsswdwwddndsd",
  "email": "okolosdsddll1@gmail.com",
  "password": "182722@sasaS",
  "accessToken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6ImhlbGxsc3N3ZHd3ZGRuZHNkIiwiaWF0IjoxNzI1MTg2MDc5LCJleHAiOjE3MjUxODk2Nzl9.g_Ze4QobKHBjV6G6h2nCRoxQyV1QHlevL9uIoIQ1He0",
  "refreshToken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6ImhlbGxsc3N3ZHd3ZGRuZHNkIiwiaWF0IjoxNzI1MTg2MDc5LCJleHAiOjE3MjU3OTA4Nzl9.aDDnaUHhGuF5FiiH9IuJjqN8akm-KwNqFwUUiwJv8UA"
};

// "accessToken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6ImhlbGxsc3N3ZHd3ZGRuZHNkIiwiaWF0IjoxNzI1MTg3MDAyLCJleHAiOjE3MjUxOTA2MDJ9.ngNn9MKcm7NiN97yHIcleSpSITYk_DFD4tpZzIRrjyc",
//   "refreshToken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6ImhlbGxsc3N3ZHd3ZGRuZHNkIiwiaWF0IjoxNzI1MTg3MDAyLCJleHAiOjE3MjU3OTE4MDJ9.F5W1H9PFn0WgE-E32U7h4iuAPtxKlTxOuGvDy79mC_Y"
// }


router.post(
    '/register',
    [
      body('username')
        .trim().escape()
        .notEmpty().withMessage('Username is required')
        .isLength({ min: 3, max: 30 }).withMessage('Username must be between 3 and 30 characters long')
        .isAlphanumeric().withMessage('Username must be alphanumeric')
        .not().contains(' ').withMessage('Username cannot contain spaces')
        .custom(async (username) => {
          const user = await User.findOne({ username });
          if (user) {
            throw new Error('User already exists');
          }
        }),
      body('email')
        .trim().escape()
        .notEmpty().withMessage('E-mail is required')
        .isEmail().withMessage('Invalid E-mail address')
        .custom(async (email) => {
          const user = await User.findOne({ email });
          if (user) {
            throw new Error('User already exists');
          }
        }),
      body('password')
        .trim().escape()
        .notEmpty().withMessage('Password is required')
        .matches(passwordRegex)
        .withMessage('Password must contain at least one uppercase letter, one lowercase letter, and one number, and be at least 8 characters long'),
      body('device')
        .trim().escape()
        .notEmpty().withMessage('Device is required')
    ],
    register
);

router.post(
    '/login',
    [
      oneOf([
        body('username')
          .trim().escape()
          .notEmpty().withMessage('Username is required')
          .isLength({ min: 3, max: 30 }).withMessage('Username must be between 3 and 30 characters long')
          .isAlphanumeric().withMessage('Username must be alphanumeric')
          .not().contains(' ').withMessage('Username cannot contain spaces')
          .custom(async (username) => {
            const user = await User.findOne({ username });
            if (!user) {
              throw new Error('User doesn\'t exists');
            }
          }),
        body('email')
          .trim().escape()
          .notEmpty().withMessage('E-mail is required')
          .isEmail().withMessage('Invalid E-mail address')
          .custom(async (email) => {
            const user = await User.findOne({ email });
            if (!user) {
              throw new Error('User doesn\'t exists');
            }
          }),
      ], {
        message: 'At least Username or Email must be provided'
      }),
      body('password')
        .trim().escape()
        .notEmpty().withMessage('Password is required')
        .matches(passwordRegex)
        .withMessage('Password must contain at least one uppercase letter, one lowercase letter, and one number, and be at least 8 characters long'),
      body('device')
        .trim().escape()
        .notEmpty().withMessage('Device is required'),
    ],
    login
);

export { router };