const express = require("express");
const router = express.Router();

const authAPI = require("./auth");
const todosAPI = require("./todo");
const userAPI = require("./user");

// auth api [Login, Register]
router.use("/auth", authAPI);

// todos api [addTodo, getTodos, updateTodo, deleteTodo]

router.use("/todos", todosAPI);

// user api [changePassword, changeName]

router.use("/user", userAPI);

module.exports = router;
