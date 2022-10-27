const mongoose = require("mongoose");
const URI = process.env.mongoDBURI;

const connect = () => {
  mongoose
    .connect(URI, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => {
      console.log("Database connected successfully!");
    })
    .catch((err) => console.log(err));
};

module.exports = connect;
