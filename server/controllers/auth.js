const { connect } = require("getstream");
const bcrypt = require("bcrypt");
const StreamChat = require("stream-chat").StreamChat;
const crypto = require("crypto");

// Get environment variables from `.env` files
require("dotenv").config();

// Stream api keys for authentication (change this in production)
const API_KEY = process.env.STREAM_API_KEY;
const API_SECRET = process.env.STREAM_API_SECRET;
const APP_ID = process.env.STREAM_APP_ID;

// Signup
const signup = async (req, res) => {
  try {
    const { fullName, username, password, confirmPassword, phoneNumber } =
      req.body;

    if (
      !fullName.length ||
      !username.length ||
      !password.length ||
      !confirmPassword.length ||
      !phoneNumber.length
    )
      return res
        .status(400)
        .json({ message: "Please fill the required fields" });

    if (password != confirmPassword)
      return res
        .status(400)
        .json({ message: "Password and Confirm Password Doesn't Match" });

    const userId = crypto.randomBytes(16).toString("hex"); // get 16 random hex bytes for user id

    const serverClient = connect(API_KEY, API_SECRET, APP_ID);

    const hashedPassword = await bcrypt.hash(password, 10); // hash password (salt-10)

    const token = serverClient.createUserToken(userId); // creating user token

    res
      .status(200)
      .json({ token, fullName, username, userId, hashedPassword, phoneNumber });
  } catch (error) {
    // Error handling
    console.log(error);

    res.status(500).json({ message: error });
  }
};

// Login
const login = async (req, res) => {
  try {
    const { username, password } = req.body;

    const serverClient = connect(API_KEY, API_SECRET, APP_ID);
    const client = StreamChat.getInstance(API_KEY, API_SECRET);

    const { users } = await client.queryUsers({ name: username });

    // if user is not found
    if (!users.length)
      return res.status(400).json({ message: "User not found!" });

    // check password
    const success = await bcrypt.compare(password, users[0].hashedPassword);

    // generate user token
    const token = serverClient.createUserToken(users[0].id);

    // success
    if (success) {
      res.status(200).json({
        token,
        fullName: users[0].fullName,
        username,
        userId: users[0].id,
      });
    } else {
      // wrong password
      res.status(500).json({ message: "Incorrect password!" });
    }
  } catch (error) {
    // error handling
    console.log(error);

    res.status(500).json({ message: error });
  }
};

// export signup and login
module.exports = { signup, login };
