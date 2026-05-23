const express = require("express");
const { createHospitalAdmin,getAllHospitals,getHospitalById,getDashboardStats } = require("../controllers/adminController");
const { protect, authorize } = require("../middleware/authMiddleware");
const router = express.Router();
router.get(
  "/dashboard-stats",
  protect,
  authorize("admin"),
  getDashboardStats
);
router.post(
  "/create-hospital-admin",
  protect,
  authorize("admin"),
  createHospitalAdmin,
  
);
// GET ALL HOSPITALS
router.get(
  "/hospitals",
  getAllHospitals
);


// GET SINGLE HOSPITAL
router.get(
  "/hospitals/:id",
  getHospitalById
);

module.exports = router;
