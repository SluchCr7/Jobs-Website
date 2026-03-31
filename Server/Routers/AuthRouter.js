const { signUp, login, oauthCallback, verifyEmail, resendOTP } = require("../Controllers/AuthController")
const passport = require("passport");
const express = require("express")
const route = express.Router()
const { protect } = require("../Middlewares/verifyToken")

route.route("/login").post(login)
route.route("/register").post(signUp)
route.route("/verify-email").post(protect, verifyEmail)
route.route("/resend-otp").post(protect, resendOTP)

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