const mongoose = require("mongoose");

const donationSchema = new mongoose.Schema(
  {
    donorId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true
    },
    hospitalId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Hospital",
      required: true
    },
    bloodGroup: {
      type: String,
      required: true
    },
    donationDate: {
      type: Date,
      required: true
    },
    status: {
      type: String,
      enum: ["pending", "approved", "completed","rejected"],
      default: "pending"
    }
  },
  { timestamps: true }
);

module.exports = mongoose.model("Donation", donationSchema);
