const mongoose = require("mongoose");

const inventoryHistorySchema = new mongoose.Schema(
  {
    hospitalId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Hospital",
      required: true
    },
    donationId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Donation",

    },
    bloodGroup: {
      type: String,
      required: true
    },
    unitsAdded: {
      type: Number,
      required: true
    },
    completedBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true
    }
  },
  { timestamps: true }
);

module.exports = mongoose.model("InventoryHistory", inventoryHistorySchema);
