const bcrypt = require("bcryptjs");
const User = require("../models/User");
const Hospital = require("../models/Hospital");
const Donation =require("../models/Donation");
const redisClient = require("../config/redis");

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
    await redisClient.del("admin_dashboard_stats");
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
exports.getDashboardStats = async (req, res) => {
  try {
    console.log("DASHBOARD STATS API HIT");

    const cacheKey = "admin_dashboard_stats";

    // Check Redis cache first
    const cachedData = await redisClient.get(cacheKey);

    if (cachedData) {
      console.log("Cache HIT");

      return res.status(200).json(
        JSON.parse(cachedData)
      );
    }

    console.log("Cache MISS");

    // Fetch from MongoDB
    const [totalHospitals, totalAdmins, pendingRequests] =
      await Promise.all([

        Hospital.countDocuments(),

        User.countDocuments({
          role: "hospital_admin"
        }),

        Donation.countDocuments({
          status: "pending"
        })

      ]);

    const stats = {
      totalHospitals,
      totalAdmins,
      pendingRequests
    };

    // Store in Redis for 5 minutes
    await redisClient.set(
      cacheKey,
      JSON.stringify(stats),
      {
        EX: 300
      }
    );

    res.status(200).json(stats);

  } catch (error) {
    console.error("Dashboard stats error:", error);

    res.status(500).json({
      message: "Failed to fetch dashboard stats"
    });
  }
};