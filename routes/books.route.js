const router = require("express").Router();

const {
  getAllBooks,
  getBook,
  createBooks,
  updateBooks,
  deleteBooks,
} = require("../controllers/books.controller");

router.route("/").get(getAllBooks).post(createBooks);
router.route("/:id").get(getBook).put(updateBooks).delete(deleteBooks);

module.exports = router;
