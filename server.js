require("dotenv").config();
const cors = require("cors");
const express = require("express");
const authRoutes = require("./routes/auth");
const connectDB = require("./config/db");

connectDB();

const app = express();

app.use(cors());

app.use(express.json());

app.get("/", (req, res) => res.send("job-portal-final-year-project/server"));
app.use("/api/auth", authRoutes);

app.listen(process.env.PORT || 2900, () =>
  console.log(`Server running on port ${process.env.PORT}`)
);
