const DocumentModel = require("../models/document-model.js");
const mongoose = require("mongoose");
const { HttpError, HttpErrorTypes } = require("../utils/http-error-helper.js");

const isValidObjectId = (id) => mongoose.isValidObjectId(id);

const getDocuments = async (req, res, next) => {
  try {
    const documents = await DocumentModel.find({});
    res.send(documents);
  } catch (err) {
    next(err);
  }
};

const getDocument = async (req, res, next) => {
  try {
    if (!isValidObjectId(req.params.id))
      next(new HttpError(HttpErrorTypes.BAD_REQUEST));

    const document = await DocumentModel.findById(req.params.id);

    if (!document) next(new HttpError(HttpErrorTypes.NOT_FOUND));

    res.send(document);
  } catch (err) {
    next(err);
  }
};

const createDocument = async (req, res, next) => {
  try {
    const document = new DocumentModel(req.body);
    await document.save();
    res.status(201).send(document);
  } catch (err) {
    next(err);
  }
};

const updateDocument = async (req, res, next) => {
  try {
    if (!isValidObjectId(req.params.id))
      next(new HttpError(HttpErrorTypes.BAD_REQUEST));

    const document = await DocumentModel.findByIdAndUpdate(
      req.params.id,
      req.body,
      {
        new: true,
      }
    );

    res.send(document);
  } catch (err) {
    next(err);
  }
};

const deleteDocument = async (req, res, next) => {
  try {
    if (!isValidObjectId(req.params.id))
      next(HttpError(HttpErrorTypes.BAD_REQUEST));

    await DocumentModel.findByIdAndDelete(req.params.id);
    res.status(204).send();
  } catch (err) {
    next(err);
  }
};

module.exports = {
  getDocuments,
  getDocument,
  createDocument,
  updateDocument,
  deleteDocument,
};
