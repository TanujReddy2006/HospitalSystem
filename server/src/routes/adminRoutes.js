const express = require("express");
const { createHospitalAdmin } = require("../controllers/adminController");
const { protect, authorize } = require("../middleware/authMiddleware");

const router = express.Router();
router.post(
  "/create-hospital-admin",
  protect,
  authorize("admin"),
  createHospitalAdmin
);

module.exports = router;
