const Books = require("../models/book.model");
const asyncHandler = require("express-async-handler");

// @Desc  Get all books
// @method  GET /books
// @Access  Public
const getAllBooks = asyncHandler(async (req, res) => {
  const books = await Books.find({});

  if (!books) {
    res.status(400);
    throw new Error("Could not fetch all books");
  }

  res.status(200).json({
    status: "OK",
    books: books,
  });
});

// @Desc  Get a books
// @method  GET /books/:id
// @Access  Public
const getBook = asyncHandler(async (req, res) => {
  const bookId = req.params.id;

  if (!bookId) {
    res.status(400);
    throw new Error("provide a book id");
  }

  const book = await Books.findById(bookId.toString());

  if (!book) {
    res.status(400);
    throw new Error(`book record with id ${bookId} not found`);
  }

  res.status(200).json({
    status: "OK",
    book: book,
  });
});

// @Desc  Create a new book record
// @method  POST /books
// @Access  Public
const createBooks = asyncHandler(async (req, res) => {
  const { title, author, dateOfPublication, genre, desc } = req.body;

  if (!title || !author) {
    res.status(400);
    throw new Error("title and author field can't be left empty");
  }

  const existedBook = await Books.findOne({ title });

  if (existedBook) {
    res.status(403);
    throw new Error("book record alright exits");
  }

  const newRecord = await Books.create({
    title,
    author,
    dateOfPublication,
    genre,
    description: desc,
  });

  if (newRecord) {
    res.status(201).json({
      msg: "created",
      book: newRecord,
    });
  } else {
    res.status(400);
    throw new Error("unable to create new record");
  }
});

// @Desc Update a book record
// @method  PUT /books/:id
// @Access  Public
const updateBooks = asyncHandler(async (req, res) => {
  const bookId = req.params.id;
  const body = req.body;

  const bookRecord = await Books.findOne({ _id: bookId });

  if (!bookRecord) {
    res.status(400);
    throw new Error(`book record with id ${bookId} not found.`);
  }

  const updatedRecord = await Books.findByIdAndUpdate({ _id: bookId }, body);

  if (updatedRecord) {
    const book = await Books.findById(bookId);
    res.status(200).json({
      updatedRecord: book,
    });
  } else {
    res.status(400);
    throw new Error("could not update book record");
  }
});

// @Desc  Remove a book record
// @method  DELETE /books/:id
// @Access  Public
const deleteBooks = asyncHandler(async (req, res) => {
  const bookId = req.params.id;

  const bookRecord = await Books.findById(bookId);

  if (!bookRecord) {
    res.status(400);
    throw new Error(`book record with id ${bookId} not found.`);
  }

  const updatedRecord = await Books.findByIdAndDelete({ _id: bookId });

  if (updatedRecord) {
    res.sendStatus(204);
  } else {
    res.status(400);
    throw new Error("could not delete book record");
  }
});

module.exports = {
  getAllBooks,
  getBook,
  createBooks,
  updateBooks,
  deleteBooks,
};
