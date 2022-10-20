const mongoose = require("mongoose");

console.log(process.env.DATABASE_CONNECTION);
const connectDB = async () => {
  mongoose.connect(process.env.DATABASE_CONNECTION, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });

  console.log("MongoDB Connected");
};

module.exports = connectDB;
