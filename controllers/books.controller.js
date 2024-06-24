const Books =
  process.env.NODE_ENV === "test"
    ? require("../models/seedModel.model")
    : require("../models/book.model");

const bookServices = require("../services/books.services");

const asyncHandler = require("express-async-handler");

const gcsUploader = require("../utils/gcsUploader");

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

  const book = await Books.findById(bookId);

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
  if (process.env.NODE_ENV === "test") {
    // bookServices.createBook(req, res);
    const { _id, title, author, dateOfPublication, genre, desc } = req.body;
    const file = req?.file;

    console.log(file);
    if (!title || !author) {
      res.status(400);
      throw new Error("title, filepath and author field can't be left empty");
    }

    const coverImg = gcsUploader(file.buffer, file.originalname);

    const existedBook = await Books.findOne({ title });

    if (existedBook) {
      res.status(403);
      throw new Error("book record alright exits");
    }

    const newRecord = await Books.create({
      _id,
      title,
      author,
      dateOfPublication,
      genre,
      coverImg: coverImg,
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
    return;
  }

  const { title, author, dateOfPublication, genre, desc } = req.body;

  const file = req?.file;

  if (!title || !author) {
    res.status(400);
    throw new Error("title, filepath and author field can't be left empty");
  }
  const existedBook = await Books.findOne({ title });

  if (existedBook) {
    res.status(403);
    throw new Error("book record alright exits");
  }

  const coverImg = await gcsUploader(file.buffer, file.originalname);

  const newRecord = await Books.create({
    title,
    author,
    dateOfPublication,
    genre,
    coverImg: coverImg,
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
  let body = req.body;
  const imgFile = req?.file;

  console.log(imgFile);

  if (imgFile) {
    const coverImg = await gcsUploader(imgFile.buffer, imgFile.originalname);

    // console.log(coverImg);
    body = { ...req.body, coverImg: coverImg };
    console.log(body);
  }

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

  const bookRecord = await Books.findOne({ _id: bookId });

  if (!bookRecord) {
    res.status(400);
    throw new Error(`book record with id ${bookId} not found.`);
  }

  const updatedRecord = await Books.findByIdAndDelete({ _id: bookId });

  if (updatedRecord) {
    res.sendStatus(204);
  } else {
    res.status(405);
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
