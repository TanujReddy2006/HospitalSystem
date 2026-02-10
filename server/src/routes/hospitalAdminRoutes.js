const express = require("express");
const { createWorker } = require("../controllers/hospitalAdminController");
const { protect, isHospitalAdmin } = require("../middleware/authMiddleware");

const router = express.Router();

router.post("/create-worker", protect, isHospitalAdmin, createWorker);

module.exports = router;
