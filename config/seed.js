const { faker } = require("@faker-js/faker");
const Books = require("../models/book.model");

const seedDB = async () => {
  const booksArr = [];

  await Books.deleteMany();

  for (let i = 0; i < 10; i++) {
    const title = faker.commerce.productName();
    const author = faker.person.fullName();
    const description = faker.commerce.productDescription();
    const genre = faker.word.sample(1);
    const dateOfPublication = faker.date.anytime();

    const book = {
      title,
      author,
      description,
      dateOfPublication,
      genre,
    };

    booksArr.push(book);
  }

  await Books.insertMany([...booksArr]);
};

module.exports = seedDB;
