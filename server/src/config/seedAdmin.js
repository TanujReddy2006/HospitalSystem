const bcrypt = require("bcryptjs");
const User = require("../models/User");

const seedAdmin = async () => {
  const adminEmail = "admin@system.com";

  const existingAdmin = await User.findOne({
    email: adminEmail,
    role: "admin"
  });

  if (!existingAdmin) {
    const hashedPassword = await bcrypt.hash("Admin@123", 10);

    await User.create({
      name: "System Admin",
      email: adminEmail,
      password: hashedPassword,
      role: "admin"
    });

    console.log("✅ Default System Admin created");
  }
};

module.exports = seedAdmin;
