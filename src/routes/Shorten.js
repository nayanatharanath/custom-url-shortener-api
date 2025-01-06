// import { nanoid } from "nanoid";
const express = require("express");
const { nanoid } = require("nanoid");
const Url = require("../models/Url");
const redis = require("../config/redis");

const router = express.Router();

router.post("/", async (req, res) => {
  const { longUrl, customAlias, topic } = req.body;
  const alias = customAlias || nanoid(8);

  try {
    const shortUrl = `${process?.env?.BASE_URL}/${alias}`;
    const newUrl = await Url.create({
      longUrl,
      shortUrl,
      alias,
      topic,
      createdBy: req.user._id,
    });

    // cache the short URL
    redis.set(alias, longUrl, "EX", 60 * 60 * 24);
    redis.status(201).json(newUrl);
  } catch (error) {
    res.status(500).json({ error: "Server error" });
  }
});

module.exports = router;
