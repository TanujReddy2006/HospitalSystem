const bcrypt = require("bcryptjs");
const User = require("../models/User");
const Donation = require("../models/Donation");
const redisClient = require("../config/redis"); // Ensure this path is correct

// ... your existing createWorker function ...

exports.getStats = async (req, res) => {
  try {
    console.log("STATS API HIT");

    const hospitalId = req.user.hospitalId;

    if (!hospitalId) {
      return res.status(400).json({
        message: "Hospital not assigned to admin"
      });
    } 
    const cacheKey = `hospital_stats:${hospitalId}`;

    // Check Redis first
    const cachedData = await redisClient.get(cacheKey);

    if (cachedData) {
      console.log("Cache HIT");

      return res.status(200).json(
        JSON.parse(cachedData)
      );
    }

    console.log("Cache MISS");

    // Fetch stats from DB
    const [pendingApprovals, activeWorkers, totalDonations] =
      await Promise.all([
        Donation.countDocuments({
          hospitalId,
          status: "pending"
        }),

        User.countDocuments({
          hospitalId,
          role: "hospital_worker"
        }),

        Donation.countDocuments({
          hospitalId,
          status: "completed"
        })
      ]);

    const stats = {
      pendingApprovals,
      activeWorkers,
      totalDonations
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
    console.error("Error fetching hospital stats:", error);

    res.status(500).json({
      message: "Server error fetching statistics"
    });
  }
};
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
