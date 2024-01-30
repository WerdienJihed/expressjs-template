const express = require("express");
const cookieParser = require("cookie-parser");
const logger = require("morgan");
const helmet = require("helmet");
const errorHandler = require("./middlewares/error-handler.js");
const documentsRouter = require("./routers/documents-router.js");
const connectDB = require("./config/mongodb-config.js");
const { HttpError, HttpErrorTypes } = require("./utils/http-error-helper.js");
require("dotenv").config();

const app = express();

connectDB();

app.use(logger("dev"));
app.use(helmet());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

app.use("/documents", documentsRouter);
app.use((req, res, next) => {
  next(new HttpError(HttpErrorTypes.NOT_FOUND));
});
app.use(errorHandler);

module.exports = app;
