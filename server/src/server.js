const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");
const connectDB = require("./config/db");
const authRoutes = require("./routes/authRoutes");
const seedAdmin = require("./config/seedAdmin");
const hospitalRoutes = require("./routes/hospitalRoutes");
const donationRoutes = require("./routes/donationRoutes");

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

app.use("/api/auth", authRoutes);
app.use("/api/hospitals", hospitalRoutes);
app.use("/api/donation",donationRoutes)


connectDB().then(() => {
  seedAdmin();
});

app.get("/", (req, res) => {
  res.send("Hospital System API Running");
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () =>
  console.log(`Server running on port ${PORT}`)
);
