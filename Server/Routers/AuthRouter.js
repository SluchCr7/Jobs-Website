const { signUp, login, oauthCallback } = require("../Controllers/AuthController")
const passport = require("passport");
const express = require("express")
const route = express.Router()

route.route("/login").post(login)
route.route("/register").post(signUp)

// Google Auth
route.get("/google", passport.authenticate("google", { scope: ["profile", "email"] }));
route.get(
    "/google/callback",
    passport.authenticate("google", { session: false, failureRedirect: "/login" }),
    oauthCallback
);

// LinkedIn Auth
route.get("/linkedin", passport.authenticate("linkedin"));
route.get(
    "/linkedin/callback",
    passport.authenticate("linkedin", { session: false, failureRedirect: "/login" }),
    oauthCallback
);


module.exports = route