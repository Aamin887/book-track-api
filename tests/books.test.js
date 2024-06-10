const request = require("supertest");
const app = require("../index");
const db = require("../config/db");
const { faker, fa } = require("@faker-js/faker");
const seedDB = require("../config/seed");
require("dotenv").config();

beforeEach(async () => {
  await db.connect();
  // await seedDB();
});

afterEach(async () => {
  await db.close();
});

describe("GET /books", () => {
  it("should return all books", async () => {
    const res = await request(app).get("/books");

    const book = {
      _id: "66663e5313f73057be453732",
      title: "Incredible Rubber Mouse",
      author: "Michele Shields-Raynor",
      dateOfPublication: "2024-02-25T00:11:10.836Z",
      description:
        "The slim & simple Maple Gaming Keyboard from Dev Byte comes with a sleek body and 7- Color RGB LED Back-lighting for smart functionality",
      genre: "haptic",
      __v: 0,
    };

    expect(res.statusCode).toBe(200);
    expect(res.body.books.length).toBeGreaterThan(0);
    expect(res.body.books[0]).toEqual(book);
  });
});

describe("GET /books/:id", () => {
  it("should return a book record", async () => {
    const res = await request(app).get("/books/66663e5313f73057be453733");
    expect(res.statusCode).toBe(200);
    expect(res.body.book.title).toBe("Generic Fresh Pants");
  });
});

describe("POST /books", () => {
  it("should create new books record", async () => {
    const title = faker.word.noun();

    const res = await request(app).post("/books").send({
      title,
      author: faker.person.fullName(),
      description:
        "The book to help brigde the gap between the best of yourself",
      genre: faker.hacker.noun(),
      dateOfPublication: faker.date.past(),
    });
    expect(res.statusCode).toBe(201);
    expect(res.body.book.title).toBe(title);
  });
});

describe("PUT /books/:id", () => {
  it("should update a book record", async () => {
    const genre = faker.hacker.adjective();
    const res = await request(app)
      .put("/books/66663e5313f73057be453734")
      .send({ genre });
    expect(res.statusCode).toBe(200);
    expect(res.body.updatedRecord.genre).toBe(genre);
  });
});

describe("Delete /books/:id", () => {
  it("should delete a book record", async () => {
    const res = await request(app).delete("/books/66663e5313f73057be453738");
    expect(res.statusCode).toBe(204);
  });
});
