const mongoose = require("mongoose");

const bloodRequestSchema = new mongoose.Schema(
  {
    requestedBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Hospital",
      required: true,
    },

    bloodGroup: {
      type: String,
      required: true,
    },

    units: {
      type: Number,
      required: true,
    },

    status: {
  type: String,
  enum: [
    "pending",
    "accepted",
    "in_transit",
    "completed",
    "expired",
    "cancelled"
  ],
  default: "pending"
},


    targetHospitals: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Hospital",
      },
    ],

    acceptedBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Hospital",
    },

    expiresAt: {
      type: Date,
      required: true,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("BloodRequest", bloodRequestSchema);
