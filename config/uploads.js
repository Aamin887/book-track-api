const mutler = require("multer");
const path = require("path");

const storage = mutler.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "public/uploads/");
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + "-" + file.originalname);
  },
});

const uploads = mutler({ storage: storage });

module.exports = uploads;
