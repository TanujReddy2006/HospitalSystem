const mongoose = require("mongoose");

const donationSchema = new mongoose.Schema(
  {
    donorId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User"
    },
    hospitalId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Hospital"
    },
    bloodGroup: String,
    status: {
      type: String,
      enum: ["pending", "approved", "completed"],
      default: "pending"
    }
  },
  { timestamps: true }
);

module.exports = mongoose.model("Donation", donationSchema);
