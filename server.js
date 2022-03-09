require("dotenv").config();
const cors = require("cors");
const express = require("express");
const authRoutes = require("./routes/auth");
const employerRoutes = require("./routes/employers");
const userRoutes = require("./routes/users");
const connectDB = require("./config/db");

connectDB();

const app = express();

app.use(
  cors({
    exposedHeaders: "total-doc-count",
  })
);

app.use(express.json());

app.get("/", (req, res) => res.send("job-portal-final-year-project/server"));
app.use("/api/auth", authRoutes);
app.use("/api/employers", employerRoutes);
app.use("/api/users", userRoutes);

app.listen(process.env.PORT || 2900, () =>
  console.log(`Server running on port ${process.env.PORT}`)
);
