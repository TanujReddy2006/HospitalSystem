const bcrypt = require("bcryptjs");
const User = require("../models/User");
const Hospital = require("../models/Hospital");

exports.createHospitalAdmin = async (req, res) => {
  try {
    const { name, email, password, hospitalId } = req.body;

    // 1️⃣ Check hospital exists
    const hospital = await Hospital.findById(hospitalId);
    if (!hospital) {
      return res.status(404).json({ message: "Hospital not found" });
    }

    // 2️⃣ Check user already exists
    const exists = await User.findOne({ email });
    if (exists) {
      return res.status(400).json({ message: "User already exists" });
    }

    // 3️⃣ Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // 4️⃣ Create hospital admin
    const hospitalAdmin = await User.create({
      name,
      email,
      password: hashedPassword,
      role: "hospital_admin",   // 🔒 forced
      hospitalId
    });

    res.status(201).json({
      message: "Hospital Admin created successfully",
      hospitalAdmin
    });
  } catch (error) {
    res.status(500).json({ message: "Failed to create hospital admin" });
  }
};
// GET ALL HOSPITALS
exports.getAllHospitals =
async (req, res) => {

  try {

    const hospitals =
      await Hospital.find()
      .sort({ createdAt: -1 });

    res.status(200).json({
      hospitals
    });

  } catch (error) {

    console.log(error);

    res.status(500).json({
      message:
        "Failed to fetch hospitals"
    });
  }
};


// GET SINGLE HOSPITAL
exports.getHospitalById =
async (req, res) => {

  try {

    const hospital =
      await Hospital.findById(
        req.params.id
      );

    if (!hospital) {

      return res.status(404).json({
        message:
          "Hospital not found"
      });
    }

    res.status(200).json({
      hospital
    });

  } catch (error) {

    console.log(error);

    res.status(500).json({
      message:
        "Server error"
    });
  }
};