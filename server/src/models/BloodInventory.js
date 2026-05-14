const mongoose = require("mongoose");

const bloodInventorySchema = new mongoose.Schema(
  {
    hospitalId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Hospital",
      required: true,
    },

    bloodGroup: {
      type: String,
      required: true,
      enum: [
        "A+","A-",
        "B+","B-",
        "AB+","AB-",
        "O+","O-"
      ],
    },

    units: {
      type: Number,
      default: 0,
      min: 0,
    },
  },
  { timestamps: true }
);

// 🔥 Prevent duplicate blood group per hospital
bloodInventorySchema.index(
  { hospitalId: 1, bloodGroup: 1 },
  { unique: true }
);

module.exports = mongoose.model("BloodInventory", bloodInventorySchema);
