const mongoose = require("mongoose");

const dbConnect = async () => {
  const conn = await mongoose.connect(process.env.MONGO_URI);
  if (conn) {
    console.log(conn.connection.host);
  }
  return conn;
};
module.exports = dbConnect;
