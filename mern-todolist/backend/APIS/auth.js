const express = require("express");
const router = express.Router();

const User = require("../models/User");
const bcryptjs = require("bcryptjs");
const jwt = require("jsonwebtoken");

router.post("/login", async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res
      .status(400)
      .json({ success: false, msg: "Please fill in all fields!!" });
  }

  // checking if user exists or not
  const oldUser = await User.findOne({ email });

  // if user doest not exists
  if (!oldUser)
    return res
      .status(404)
      .json({ success: false, msg: "Invalid Email or Password!" });

  // matching password with database
  const passwordMatch = await bcryptjs.compare(password, oldUser.password);

  // if passwords donot match
  if (!passwordMatch)
    return res
      .status(400)
      .json({ success: false, msg: "Invalid Email or Password!" });

  const token = jwt.sign(
    { email: oldUser.email, id: oldUser._id },
    process.env.jwtSecret,
    {
      expiresIn: "1d",
    }
  );

  // update user last login
  try {
    User.updateOne(
      { _id: oldUser._id },
      {
        $set: {
          lastLoggedIn: Date.now().toString(),
        },
      },
      (err, result) => {
        if (err)
          return res.status(400).json({ success: false, msg: err.message });

        res.status(200).json({
          success: true,
          user: {
            email: oldUser.email,
            name: oldUser.name,
            id: oldUser._id,
          },
          token,
        });
      }
    );
  } catch (error) {
    res.status(500).json({ success: false, msg: "Something went wrong!" });
  }
});

router.post("/register", async (req, res) => {
  const { name, email, password } = req.body;
  console.log(req.body);
  if (!email || !password || !name) {
    return res
      .status(400)
      .json({ success: false, msg: "Please fill in all fields!!" });
  }
  if (
    !/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(
      email.toLowerCase()
    )
  ) {
    return res.status(400).json({
      success: false,
      msg: "Password enter valid email!!",
    });
  }
  if (password.length < 8) {
    return res.status(400).json({
      success: false,
      msg: "Password must be of length 8 or more!!",
    });
  }
  if (
    !/^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{6,16}$/.test(password)
  ) {
    return res.status(400).json({
      success: false,
      msg: "Password must have alteast a number and a special character!!",
    });
  }

  // checking if email is alredy present or not
  const oldUser = await User.findOne({ email });

  if (oldUser) {
    return res.status(400).json({
      success: false,
      msg: "User with this email address already registered!!",
    });
  }

  // hashing password
  const hashPass = await bcryptjs.hash(password, 12);

  // creating new user
  const newUser = new User({
    name,
    email,
    password: hashPass,
  });

  await newUser.save();

  res.status(201).json({ success: true, msg: "Successfully Registered!" });
});

module.exports = router;
