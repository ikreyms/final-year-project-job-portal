require("dotenv").config();
const path = require("path");
const cors = require("cors");
const express = require("express");
const authRoutes = require("./routes/auth");
const employerRoutes = require("./routes/employers");
const userRoutes = require("./routes/users");
const jobRoutes = require("./routes/jobs");
const applicationRoutes = require("./routes/applications");
const notificationRoutes = require("./routes/notifications");
const interviewRoutes = require("./routes/interviews");
const adminRoutes = require("./routes/admin");
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
app.use("/api/jobs", jobRoutes);
app.use("/api/applications", applicationRoutes);
app.use("/api/notifications", notificationRoutes);
app.use("/api/interviews", interviewRoutes);
app.use("/api/admin", adminRoutes);

// serve static assets if in production
if (process.env.NODE_ENV === "production") {
  // set static folder
  app.use(express.static("client/build"));

  app.get("*", (req, res) => {
    res.sendFile(path.resolve(__dirname, "client", "build", "index.html"));
  });
}

app.listen(process.env.PORT || 2900, () =>
  console.log(`Server running on port ${process.env.PORT}`)
);
