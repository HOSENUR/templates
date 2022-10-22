const express = require("express");
const router = express.Router();
const User = require("../models/User");
const bcryptjs = require("bcryptjs");
const authCheck = require("../middlewares/authCheck");

// change user password

router.post("/changePassword", authCheck, async (req, res) => {
  const { confirmPass, newPassword, userId } = req.body;

  if (!confirmPass || !newPassword) {
    return res
      .status(400)
      .json({ success: false, msg: "Please fill in all fields" });
  }

  if (newPassword !== confirmPass) {
    return res
      .status(400)
      .json({ success: false, msg: "Passwords do not match" });
  }

  const user = await User.findOne({ _id: userId });

  if (!user) {
    return res.status(400).json({ success: false, msg: "User not found" });
  }

  const newHashedPassword = await bcryptjs.hash(newPassword, 12);

  try {
    await User.updateOne({ _id: userId }, { password: newHashedPassword });
    res
      .status(200)
      .json({ success: true, msg: "Password changed successfully" });
  } catch (err) {
    res.status(400).json({ success: false, msg: err.message });
  }
});

// change name
router.post("/changeName", authCheck, async (req, res) => {
  const { newName, userId } = req.body;

  if (!newName) {
    return res
      .status(400)
      .json({ success: false, msg: "Please fill in all fields" });
  }

  const user = await User.findOne({ _id: userId });

  if (!user) {
    return res.status(400).json({ success: false, msg: "User not found" });
  }

  try {
    const updatedUser = await User.updateOne(
      { _id: userId },
      { name: newName }
    );
    return res.status(200).json({
      success: true,
      msg: "Name changed successfully",
      name: updatedUser.name,
    });
  } catch (err) {
    res.status(400).json({ success: false, msg: err.message });
  }
});

module.exports = router;
