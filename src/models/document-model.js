const { mongoose, Schema } = require("mongoose");

const document = new Schema({
  text: {
    type: String,
    required: true,
  },
});

module.exports = mongoose.model("Document", document);
