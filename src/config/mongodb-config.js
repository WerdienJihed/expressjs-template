/* eslint-disable no-undef */
const mongoose = require("mongoose");

const MONGO_URI =
  process.env.MONGO_URI || "mongodb://localhost:27017/template_database";

const connectDB = async () => {
  try {
    await mongoose.connect(MONGO_URI);
    console.log("MongoDB Connected ...");
  } catch (error) {
    console.log(error);
    process.exit(1);
  }
};
module.exports = connectDB;
