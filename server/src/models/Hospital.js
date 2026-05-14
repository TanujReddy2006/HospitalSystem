const mongoose = require("mongoose");

const hospitalSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    email: { type: String, required: true },
    address: { type: String, required: true },
    phone: { type: String },

    // 🔥 Geo Location Field
    location: {
      type: {
        type: String,
        enum: ["Point"],
        default: "Point",
      },
      coordinates: {
        type: [Number], // [longitude, latitude]
        required: true,
      },
    },

    isVerified: { type: Boolean, default: false },
  },
  { timestamps: true }
);

// 🔥 Required for geospatial queries
hospitalSchema.index({ location: "2dsphere" });

module.exports = mongoose.model("Hospital", hospitalSchema);
