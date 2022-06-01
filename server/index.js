const express = require("express");
const cors = require("cors");

// get authentication routes
const authRoutes = require("./routes/auth.js");

// initialize app
const app = express();

// don't change
const PORT = process.env.PORT || 5000;

// get environment variables from .env file
require("dotenv").config();

// Change this in production from `.env` file
const ACCOUNT_SID = process.env.TWILIO_ACCOUNT_SID;
const AUTH_TOKEN = process.env.TWILIO_AUTH_TOKEN;
const MESSAGING_SERVICE_SID = process.env.TWILIO_MESSAGING_SERVICE_SID;
const twilioClient = require("twilio")(ACCOUNT_SID, AUTH_TOKEN);

// use express urls
app.use(cors());
app.use(express.json());
app.use(express.urlencoded());

// check server request and print response
app.get("/", (req, res) => {
  res.send("Server is running!");
});

// check for post request in server (authentication request)
app.post("/", (req, res) => {
  const { message, user: sender, type, members } = req.body;

  // show message notification on user's phone using twilio client
  if (type === "message.new") {
    members
      .filter((member) => member.user_id !== sender.id)
      .forEach(({ user }) => {
        if (!user.online) {
          twilioClient.messages
            .create({
              body: `You have a new message from ${message.user.fullName} - ${message.text}`,
              messagingServiceSid: MESSAGING_SERVICE_SID,
              to: user.phoneNumber,
            })
            .then(() => console.log("Message sent!"))
            .catch((err) => console.log(err));
        }
      });

    return res.send(200).send("Message sent!");
  }

  return res.status(200).send("Not a new message request!");
});

// using auth routes
app.use("/auth", authRoutes);

// set port and run server
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
