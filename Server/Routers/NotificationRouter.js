const router = require("express").Router();
const {
    getNotifications,
    getUnreadCount,
    markAsRead,
    markAllAsRead,
    deleteNotification,
} = require("../Controllers/NotificationController");
const { protect } = require("../Middlewares/verifyToken");

router.use(protect);

router.get("/", getNotifications);
router.get("/unread/count", getUnreadCount);
router.patch("/mark-all-read", markAllAsRead);
router.patch("/:id/read", markAsRead);
router.delete("/:id", deleteNotification);

module.exports = router;
