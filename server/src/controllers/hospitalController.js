const Hospital = require("../models/Hospital");

exports.createHospital = async (req, res) => {
  try {
    const { name, email, address, phone, lat, lng } = req.body;

    // 1️⃣ Validate required fields
    if (!name || !email || !address || !lat || !lng) {
      return res.status(400).json({
        message: "Name, email, address, lat and lng are required",
      });
    }

    // 2️⃣ Create hospital with GeoJSON format
    const hospital = await Hospital.create({
      name,
      email,
      address,
      phone,
      isVerified: true,

      location: {
        type: "Point",
        coordinates: [lng, lat], // 🔥 IMPORTANT: [longitude, latitude]
      },
    });

    res.status(201).json(hospital);
  } catch (error) {
    console.error(error);
    res.status(500).json({
      message: "Failed to create hospital",
    });
  }
};

exports.getHospitals = async (req, res) => {
  try {
    const hospitals = await Hospital.find();
    res.status(200).json(hospitals);
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch hospitals" });
  }
};