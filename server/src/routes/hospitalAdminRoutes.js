const express = require("express");
const { createWorker,getStats} = require("../controllers/hospitalAdminController");
const { protect, isHospitalAdmin } = require("../middleware/authMiddleware");

const router = express.Router();

router.post("/create-worker", protect, isHospitalAdmin, createWorker);
router.get("/stats", protect, isHospitalAdmin, getStats);

module.exports = router;
