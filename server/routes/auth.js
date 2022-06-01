const express = require("express");

// import authentication routes
const { signup, login } = require("../controllers/auth.js");

const router = express.Router();

// post routes to server
router.post("/signup", signup);
router.post("/login", login);

module.exports = router;
