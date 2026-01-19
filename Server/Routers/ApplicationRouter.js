const {
    applyToJob,
    getMyApplications,
    getJobApplications,
    updateApplicationStatus,
    deleteApplication,
} = require("../Controllers/ApplicationController");

const route = require("express").Router();
const {
    protect, admin, sameUser, adminOrSameUser
} = require("../Middlewares/verifyToken");

route.route("/apply")
    .post(protect,applyToJob)
route.route("/my-applications")
    .get(protect,getMyApplications)
route.route("/job/:id/applications")
    .get(protect,getJobApplications)
route.route("/update")
    .put(protect,adminOrSameUser,updateApplicationStatus)
route.route("/delete/:id")
    .delete(protect,adminOrSameUser,deleteApplication)
module.exports = route