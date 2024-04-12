const allowedOrigin = require("./allowedOrgin");

const corsOptions = {
  origin: function (origin, callback) {
    if (allowedOrigin.indexOf(origin) !== -1 || !origin) {
      callback(null, true);
    } else {
      callback(new Error("Not allowed By Cors!"));
    }
  },
  optionsSuccessStatus: 200,
};

module.exports = corsOptions;
