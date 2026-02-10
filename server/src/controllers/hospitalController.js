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
