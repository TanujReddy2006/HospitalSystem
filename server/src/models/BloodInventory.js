const mongoose = require("mongoose");

const bloodInventorySchema = new mongoose.Schema(
  {
    hospitalId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Hospital",
      required: true
    },
    bloodGroup: {
      type: String,
      required: true
    },
    units: {
      type: Number,
      default: 0
    }
  },
  { timestamps: true }
);

module.exports = mongoose.model("BloodInventory", bloodInventorySchema);
