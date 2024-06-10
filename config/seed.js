const { faker } = require("@faker-js/faker");
const BooksSeedSchema = require("../models/seedModel.model");
const seedData = require("../public/data/seedData.json");

const seedDB = async () => {
  await BooksSeedSchema.deleteMany();

  // const booksArr = [];
  // for (let i = 0; i < 10; i++) {
  //   const title = faker.commerce.productName();
  //   const author = faker.person.fullName();
  //   const description = faker.commerce.productDescription();
  //   const genre = faker.word.sample(1);
  //   const dateOfPublication = faker.date.anytime();

  //   const book = {
  //     title,
  //     author,
  //     description,
  //     dateOfPublication,
  //     genre,
  //   };

  //   booksArr.push(book);
  // }

  await BooksSeedSchema.insertMany([...seedData]);
};

module.exports = seedDB;
