const express = require("express");
const passport = require("passport");
const session = require("express-session");

require("./config/sign-up");
require('dotenv').config();

const DBconnection = require("./config/database");
const redis = require("./config/redis");

const app = express();

// Middleware
app.use(express.json());
app.use(
  session({
    secret: process.env.SESSION_SECRET_KEY,
    resave: false,
    saveUninitialized: true,
  })
);
app.use(passport.initialize());
app.use(passport.session());

// Routes
app.use("/api/auth", require("./routes/Auth"));
app.use("/api/shorten", require("./routes/Shorten"));

module.exports = app;

DBconnection();
