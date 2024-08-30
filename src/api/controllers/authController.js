import { signAccessToken, signRefreshToken } from "../../stores/store";
import User from "../../lib/modals/user";
import { compare, hashSync } from "bcrypt";

exports.login = async (req, res) => {
    const { email, password } = req.body;

    if (!email && !password) {
        res.status(400).json({
            "error": "You didn\'t fill email and password"
        });
    }

    const user = User.findOne({
        "email": email
    });

    if (!user) {
        res.status(404).json({
            "error": "Username with that email was not found"
        });
    }

    const decodedPass = await compare(password, user.password);

    if (!decodedPass) {
        res.status(500).json({
            "error": "You entered wrong password"
        });
    }

    const accessToken = signAccessToken(user);
    const refreshToken = signRefreshToken(user);
    
    res.status(200).json({
        "message": "You are logged in successfully",
        "accessToken": accessToken,
        "refreshToken": refreshToken
    });
}


exports.register = async (req, res) => {
    const { username, email, password } = req.body;
    const emailRegex = "^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$";
    const passRegex = /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?\d)(?=.*?[#?!@$%^&*-]).{8,}$/;
  
    if (!username || !email || !password) {
      res.status(500).json({
        "error": "Please fill all the details"
      });
    }
  
    if (!emailRegex.test(email) || !passRegex.test(password)) {
      res.status(500).json({
        "error": "Your email or password is wrong, your password should contain one number and one special letter"
      });
    }
  
    const userEmailCheck = await User.findOne({
      email,
    });
  
    const userNameCheck = await User.findOne({
      username,
    });
  
    if (userEmailCheck) {
      res.status(500).json({
        "error": "User with that email already exists"
      });
    }
  
    if (userNameCheck) {
      res.status(500).json({
        "error": "Account with that username already exists"
      });
    }
    
    const hashedPassword = hashSync(password, 10);
  
    const user = await User.create({
        username,
        email,
        password: hashedPassword
    });
  
    const accessToken = signAccessToken(user);
    const refreshToken = signRefreshToken(user);
  
    res.status(200).json({
      "message": `Your account is successfully created by username ${username}`,
      "accessToken": accessToken,
      "refreshToken": refreshToken
    });
  }

  exports.generateRefreshToken = async  = async (req, res) => {
  
  }
  
  exports.generateAccessToken = async (req, res) => {
  
  }