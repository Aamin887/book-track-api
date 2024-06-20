const mongoose = require("mongoose");

const booksSchema = mongoose.Schema(
  {
    title: {
      type: String,
      unique: true,
      required: [true, "Please enter a title"],
    },
    author: {
      type: String,
      required: [true, "Please enter an author"],
    },
    dateOfPublication: {
      type: Date,
      default: "",
    },
    description: {
      type: String,
      default: "",
    },
    genre: {
      type: String,
    },
    coverPath: {
      type: String,
      default: "",
    },
  },
  {
    timestamps: true,
  }
);

module.exports = new mongoose.model("Books", booksSchema);
