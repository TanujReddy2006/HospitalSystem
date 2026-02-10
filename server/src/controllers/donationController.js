const Donation = require("../models/Donation");

exports.getPendingDonations = async (req, res) => {
  try {
    // hospitalId comes from logged-in hospital admin
    const hospitalId = req.user.hospitalId;

    if (!hospitalId) {
      return res.status(400).json({
        message: "Hospital not assigned to this admin"
      });
    }

    const donations = await Donation.find({
      hospitalId,
      status: "pending"
    })
      .populate("donorId", "name email")
      .populate("hospitalId", "name");

    res.status(200).json(donations);
  } catch (error) {
    res.status(500).json({
      message: "Failed to fetch pending donations"
    });
  }
};
exports.rejectDonation = async (req, res) => {
  try {
    const donation = await Donation.findById(req.params.id);

    if (!donation) {
      return res.status(404).json({ message: "Donation not found" });
    }

    // Ensure hospital admin rejects only their hospital donation
    if (
      req.user.role !== "hospital_admin" ||
      donation.hospitalId.toString() !== req.user.hospitalId.toString()
    ) {
      return res.status(403).json({ message: "Access denied" });
    }

    donation.status = "rejected";
    await donation.save();

    res.status(200).json({
      message: "Donation rejected successfully",
      donation
    });
  } catch (error) {
    res.status(500).json({
      message: "Failed to reject donation"
    });
  }
};
exports.getApprovedDonations = async (req, res) => {
  try {
    const donations = await Donation.find({
      hospitalId: req.user.hospitalId,
      status: "approved"
    }).populate("donorId", "name");

    res.status(200).json(donations);
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch approved donations" });
  }
};

exports.completeDonation = async (req, res) => {
  try {
    const donation = await Donation.findById(req.params.id);

    if (!donation) {
      return res.status(404).json({ message: "Donation not found" });
    }

    if (req.user.role !== "hospital_worker") {
      return res.status(403).json({ message: "Access denied" });
    }

    donation.status = "completed";
    await donation.save();

    res.status(200).json({ message: "Donation completed" });
  } catch (error) {
    res.status(500).json({ message: "Failed to complete donation" });
  }
};

exports.bookDonation = async (req, res) => {
  try {
    const { hospitalId, bloodGroup, date } = req.body;

    if (!hospitalId || !bloodGroup || !date) {
      return res.status(400).json({
        message: "All fields are required"
      });
    }

    const donation = await Donation.create({
      donorId: req.user.id,
      hospitalId,
      bloodGroup,
      donationDate: date,
      status: "pending"
    });

    res.status(201).json({
      message: "Donation appointment booked successfully",
      donation
    });
  } catch (error) {
    res.status(500).json({
      message: "Failed to book donation"
    });
  }
};
exports.approveDonation = async (req, res) => {
  try {
    const donation = await Donation.findById(req.params.id);

    if (!donation) {
      return res.status(404).json({ message: "Donation not found" });
    }

    // ensure admin approves only their hospital donation
    if (
      req.user.role !== "hospital_admin" ||
      donation.hospitalId.toString() !== req.user.hospitalId.toString()
    ) {
      return res.status(403).json({ message: "Access denied" });
    }

    donation.status = "approved";
    await donation.save();

    res.status(200).json({ message: "Donation approved" });
  } catch (error) {
    res.status(500).json({ message: "Failed to approve donation" });
  }
};
