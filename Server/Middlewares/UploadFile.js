
const multer = require("multer");

const fileUpload = multer({
    storage: multer.memoryStorage(),
    fileFilter: (req, file, cb) => {
        // Allow images and PDFs/Docs
        // mimetype: application/pdf, application/msword, application/vnd.openxmlformats-officedocument.wordprocessingml.document
        // image/jpeg, image/png
        if (
            file.mimetype.startsWith("image") ||
            file.mimetype === "application/pdf" ||
            file.mimetype === "application/msword" ||
            file.mimetype === "application/vnd.openxmlformats-officedocument.wordprocessingml.document"
        ) {
            cb(null, true);
        } else {
            cb(new Error("Only Image, PDF, and Doc files are allowed!"), false);
        }
    },
    limits: {
        fileSize: 10 * 1024 * 1024, // 10MB
    },
});

module.exports = fileUpload;
