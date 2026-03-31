const { deleteUser, getUserById, getAllUsers, updateUserAvatar, updateUserProfile, getUserProfile } = require("../Controllers/UserController")
const route = require("express").Router()
const { protect } = require("../Middlewares/verifyToken") 
const photoUpload = require("../Middlewares/UploadPhoto");

route.route("/delete/:id")
    .delete(protect,deleteUser)
route.route("/all")
    .get(protect,getAllUsers)
route.route("/update")
    .put(protect,updateUserProfile)
route.route("/user/:id")
    .get(protect,getUserById)
route.route("/avatar")
    .put(protect , photoUpload.single("avatar"),updateUserAvatar)

route.route("/profile")
    .get(protect,getUserProfile)

module.exports = route