const router = require("express").Router();

const uploads = require("../config/uploads");
const {
  getAllBooks,
  getBook,
  createBooks,
  updateBooks,
  deleteBooks,
} = require("../controllers/books.controller");

router
  .route("/")
  .get(getAllBooks)
  .post(uploads.single("coverPath"), createBooks);
router.route("/:id").get(getBook).put(updateBooks).delete(deleteBooks);

module.exports = router;
