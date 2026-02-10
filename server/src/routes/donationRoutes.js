const express = require("express");
const {
  bookDonation,
  getPendingDonations,
  approveDonation,
  completeDonation,
  rejectDonation,
  getApprovedDonations
} = require("../controllers/donationController");

const { protect, authorize,isHospitalAdmin,isHospitalWorker} = require("../middleware/authMiddleware");

const router = express.Router();


router.post("/", protect, authorize("donor"), bookDonation);
router.put("/:id/approve", protect, isHospitalAdmin,approveDonation, approveDonation);
router.put("/:id/complete", protect, authorize("hospital_worker"), completeDonation);
router.post("/",protect,authorize("donor"),bookDonation);
router.get("/pending",protect,authorize("hospital_admin"),getPendingDonations);
router.put("/:id/reject", protect, isHospitalAdmin, rejectDonation);
router.get("/approved",protect,isHospitalWorker,getApprovedDonations);

module.exports = router;
