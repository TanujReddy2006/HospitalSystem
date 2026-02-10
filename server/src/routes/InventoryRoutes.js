const express = require("express");
const {
  getInventoryHistory,
  getHospitalInventory,
  addStockManually
} = require("../controllers/InventoryController");

const {
  protect,
  isHospitalAdmin,
  isHospitalWorker
} = require("../middleware/authMiddleware");

const router = express.Router();

// View current inventory

// View inventory history
router.get("/history", protect, isHospitalAdmin, getInventoryHistory);
router.get("/", protect, isHospitalAdmin, getHospitalInventory);
router.post(
  "/add",
  protect,
  isHospitalWorker,
  addStockManually
);

module.exports = router;
