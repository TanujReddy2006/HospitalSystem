const Donation = require("../models/Donation");

exports.bookDonation = async (req, res) => {
  const { hospitalId, bloodGroup } = req.body;

  const donation = await Donation.create({
    donorId: req.user.id,
    hospitalId,
    bloodGroup
  });

  res.status(201).json(donation);
};
exports.approveDonation = async (req, res) => {
  const donation = await Donation.findById(req.params.id);
  donation.status = "approved";
  await donation.save();

  res.json({ message: "Donation approved" });
};
exports.completeDonation = async (req, res) => {
  const donation = await Donation.findById(req.params.id);
  donation.status = "completed";
  await donation.save();

  res.json({ message: "Donation completed" });
};

