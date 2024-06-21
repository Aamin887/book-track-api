const Books =
  process.env.NODE_ENV === "test"
    ? require("../models/seedModel.model")
    : require("../models/book.model");

// retrieve all books from the database
const getBooks = async () => {
  try {
    const books = await Books.find({});
    return books;
  } catch (err) {
    return err;
  }
};

// create a book record
const createBook = async (bookDetails) => {
  try {
    const book = await Books.create(bookDetails);
    return book;
  } catch (error) {
    return error;
  }
};

// update a book record using ID
const updateBook = async (id, bookDetails) => {
  try {
    const findBook = await Books.findByIdAndUpdate(id, bookDetails);
  } catch (error) {
    return error;
  }
};

// delete a book record using ID
const deleteBook = async (id) => {
  try {
    const findBook = await Books.findByIdAndUpdate(id);
    await Books.findByIdAndDelete(id);
  } catch (error) {
    return error;
  }
};

module.exports = {
  getBooks,
  createBook,
  updateBook,
  deleteBook,
};
