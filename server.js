import "dotenv/config";
import express from "express";

const app = express();

app.use(express.json());

app.get("/", (req, res) => res.send("job-portal-final-year-projectserver"));

app.listen(process.env.PORT || 2900, () =>
  console.log(`Server running on port ${process.env.PORT}`)
);
