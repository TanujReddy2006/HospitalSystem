const express = require("express");
const { createHospital } = require("../controllers/hospitalController");
const { protect, authorize } = require("../middleware/authMiddleware");

const router = express.Router();

router.post("/", protect, authorize("admin"), createHospital);

module.exports = router;
