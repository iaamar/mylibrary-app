const mongoose = require("mongoose");
const Book = require('./book')
const authorsSchems = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
});
authorsSchems.pre('remove', function (next) {
  Book.find({ author: this.id }, (err, books) => {
    if (err) {
      next(err)
    } else if (books.length > 0) {
      next(new Error('this author has still books in database'))
    } else {
      next()
    }
  })
})
module.exports = mongoose.model("Author", authorsSchems);
