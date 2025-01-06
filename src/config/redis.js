// This file is for redis connection

require('dotenv').config();

const Redis = require("ioredis");
const redis = new Redis(process.env.REDIS_URI);

redis?.on("connect", () => console.log("Redis Connection Successful !"));
redis?.on("error", (err) => console.error("Redis Connection Failure: ", err));

module.exports = redis;
