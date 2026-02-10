const BloodInventory = require("../models/BloodInventory");
const InventoryHistory = require("../models/InventoryHistory");

exports.addStockManually = async (req, res) => {
  try {
    const { bloodGroup, units } = req.body;

    if (!bloodGroup || !units || units <= 0) {
      return res.status(400).json({
        message: "Blood group and valid units are required"
      });
    }

    if (req.user.role !== "hospital_worker") {
      return res.status(403).json({ message: "Access denied" });
    }

    const hospitalId = req.user.hospitalId;

    let inventory = await BloodInventory.findOne({
      hospitalId,
      bloodGroup
    });

    if (inventory) {
      inventory.units += units;
      await inventory.save();
    } else {
      inventory = await BloodInventory.create({
        hospitalId,
        bloodGroup,
        units
      });
    }

    // 🔒 LOG MANUAL UPDATE
    await InventoryHistory.create({
      hospitalId,
      bloodGroup,
      unitsAdded: units,
      completedBy: req.user._id,
      donationId: null // manual entry
    });

    res.status(200).json({
      message: "Stock updated manually",
      inventory
    });
  } catch (error) {
    res.status(500).json({
      message: "Failed to update stock"
    });
  }
};

exports.getHospitalInventory = async (req, res) => {
  try {
    const hospitalId = req.user.hospitalId;

    if (!hospitalId) {
      return res.status(400).json({
        message: "Hospital not assigned to admin"
      });
    }

    const inventory = await BloodInventory.find({ hospitalId });

    res.status(200).json(inventory);
  } catch (error) {
    res.status(500).json({
      message: "Failed to fetch inventory stock"
    });
  }
};

exports.getInventoryHistory = async (req, res) => {
  try {
    const hospitalId = req.user.hospitalId;

    const history = await InventoryHistory.find({ hospitalId })
      .populate("completedBy", "name email")
      .populate("donationId", "donationDate")
      .sort({ createdAt: -1 });

    res.status(200).json(history);
  } catch (error) {
    res.status(500).json({
      message: "Failed to fetch inventory history"
    });
  }
};
