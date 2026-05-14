const express = require("express");
const router = express.Router();
const { protect } = require("../middleware/authMiddleware");


const {
  createBloodRequest,
  acceptBloodRequest,
  getIncomingRequest,
  getMyRequests,
  cancelRequest,
  getRoute
} = require("../controllers/bloodrequestController");

router.post("/request", createBloodRequest);
router.post("/accept", acceptBloodRequest);
router.get("/incoming", protect, getIncomingRequest);
router.get(
  "/my-requests/:hospitalId",
  getMyRequests
);

router.post(
  "/cancel-request",
  cancelRequest
);
router.get(
  "/route",
  getRoute
);
module.exports = router;