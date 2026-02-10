const express = require("express");
const {
  bookDonation,
  approveDonation,
  completeDonation
} = require("../controllers/donationController");

const { protect, authorize } = require("../middleware/authMiddleware");

const router = express.Router();

router.post("/", protect, authorize("donor"), bookDonation);
router.put("/:id/approve", protect, authorize("hospital_admin"), approveDonation);
router.put("/:id/complete", protect, authorize("hospital_worker"), completeDonation);

module.exports = router;
