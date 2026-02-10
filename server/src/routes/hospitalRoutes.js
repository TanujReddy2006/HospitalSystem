const express = require("express");
const { createHospital } = require("../controllers/hospitalController");
const { protect, authorize } = require("../middleware/authMiddleware");
const {getHospitals}=require('../controllers/hospitalController')
const router = express.Router();

router.post("/", protect, authorize("admin"), createHospital);
router.get("/", protect, getHospitals);

module.exports = router;
