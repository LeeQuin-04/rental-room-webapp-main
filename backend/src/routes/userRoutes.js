const express = require("express");
const router = express.Router();
const userController = require("../controllers/userController");
const { verifyToken } = require("../middleware/authMiddleware");

// Endpoint để cập nhật thông tin bổ sung của người dùng
router.post("/update-host-info", verifyToken, userController.updateHostInfo);

module.exports = router;