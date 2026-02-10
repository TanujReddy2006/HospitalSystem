const Hospital = require("../models/Hospital");

exports.createHospital = async (req, res) => {
  const { name, email, address, phone } = req.body;

  const hospital = await Hospital.create({
    name,
    email,
    address,
    phone,
    isVerified: true
  });

  res.status(201).json(hospital);
};
exports.getHospitals = async (req, res) => {
  try {
    const hospitals = await Hospital.find();
    res.status(200).json(hospitals);
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch hospitals" });
  }
};