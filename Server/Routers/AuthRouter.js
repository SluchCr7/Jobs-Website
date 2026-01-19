const { signUp, login } = require("../Controllers/AuthController")
const express = require("express")
const route = express.Router()

route.route("/login").post(login)
route.route("/register").post(signUp)


module.exports = route