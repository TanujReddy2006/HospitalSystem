const bcrypt = require("bcryptjs");
const User = require("../models/User");

exports.createWorker = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    // Hospital admin must belong to a hospital
    if (!req.user.hospitalId) {
      return res.status(400).json({ message: "Hospital not assigned" });
    }

    const exists = await User.findOne({ email });
    if (exists) {
      return res.status(400).json({ message: "Worker already exists" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const worker = await User.create({
      name,
      email,
      password: hashedPassword,
      role: "hospital_worker",
      hospitalId: req.user.hospitalId
    });

    res.status(201).json({
      message: "Hospital worker created successfully",
      worker
    });
  } catch (error) {
    res.status(500).json({ message: "Failed to create worker" });
  }
};
