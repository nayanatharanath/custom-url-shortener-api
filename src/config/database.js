// This file is for database connection

const mongoose = require("mongoose");

const DBconnection = async () => {
  try {
    await mongoose.connect(process?.env?.MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log("DB Connection Successful !");
  } catch (err) {
    console.error("DB Connection Failure: ", err);
    process.exit(1);
  }
};

module.exports = DBconnection;
