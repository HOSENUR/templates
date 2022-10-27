require("dotenv").config();
const express = require("express");
const bodyParser = require("body-parser");
const connect = require("./config/dbConnect");
const cors = require("cors");

const app = express();

const APIS = require("./APIS");

// database connection
connect();

app.use(cors());

// parsing data to json
app.use(bodyParser.urlencoded({ extended: true, limit: "30MB" }));
app.use(bodyParser.json({ extended: true, limit: "30MB" }));

app.get("/", (req, res) => {
  res.send(
    "MERN JWT LOGIN SYSTEM AND TODO LIST WITH PROFILE MANAGEMENT SERVER"
  );
});

// apis
app.use("/api", APIS);

// listening server
const port = process.env.PORT || 5000;

app.listen(port, () => console.log(`server is listening on port ${port}`));
