const express = require("express");
const dotenv = require("dotenv").config();
const PORT = process.env.PORT || 3501;
const cors = require("cors");
const db = require("./config/db");
const root = require("./routes/root");
const booksRoutes = require("./routes/books.route");
const errorHandler = require("./middleware/errorHandler");
const corsOptions = require("./config/corsOptions");
const path = require("path");

const app = express();

app.use(cors(corsOptions));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(express.static(path.join(__dirname, "public")));

app.get("/", root);

app.use("/books", booksRoutes);

app.use("*", (req, res) => {
  res.status(404);
  if (req.accepts("html")) {
    res.sendFile(path.join(__dirname, "views/404.html"));
  } else if (req.accepts("json")) {
    res.json({
      error: "404, Page not found",
    });
  } else {
    res.type("txt").send("404, Page not found");
  }
});

// error middleware
app.use(errorHandler);
if (process.env.NODE_ENV !== "test") {
  db.connect()
    .then(() => {
      app.listen(PORT, () => {
        console.log(`Server is active on PORT: ${PORT}`);
      });
    })
    .catch((err) => {
      console.log(err);
    });
}

module.exports = app;
