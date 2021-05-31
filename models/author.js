const mongoose = require("mongoose");

const authorsSchems = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
});

module.exports = mongoose.model("Author", authorsSchems);
