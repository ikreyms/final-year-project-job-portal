import { Box, Divider, Link, Paper, Typography } from "@mui/material";
import moment from "moment";
import React from "react";
import NumberFormat from "react-number-format";

const Notice = ({ job }) => {
  return (
    <Paper sx={{ p: 3, flexGrow: 1 }}>
      <Box>
        <Typography variant="h4" paragraph>
          {job.title}
          <span
            style={{
              fontSize: "1rem",
              marginLeft: "0.8rem",
              whiteSpace: "nowrap",
            }}
          >
            {job.jobType}
          </span>
        </Typography>
        <Link
          sx={{
            fontSize: "1.3rem",
            textDecoration: "none",
            color: "black",
          }}
        >
          {job.postedBy?.companyName}
        </Link>
        <Typography
          variant="body2"
          mt={1}
          sx={{ color: "error.dark", fontWeight: "bold" }}
        >
          Due: {moment(job.dueDate).format("DD/MM/YYYY")}
        </Typography>
      </Box>
      <Divider sx={{ my: 2 }} />
      <Typography variant="body2" mt={2}>
        <span style={{ fontWeight: "bold" }}>Open Positions:</span>{" "}
        {job.noOfPositions}
      </Typography>
      <Typography variant="body2" mt={2}>
        <span style={{ fontWeight: "bold" }}>Qualifications:</span>{" "}
        {job.minQualification ? job.minQualification : "Basic education."}
      </Typography>
      <Typography variant="body2" mt={2}>
        <span style={{ fontWeight: "bold" }}>Salary: </span>
        MVR{" "}
        {
          <NumberFormat
            value={job.salary}
            thousandSeparator
            displayType="text"
          />
        }
      </Typography>
      <Typography variant="body2" mt={2}>
        <span style={{ fontWeight: "bold" }}>Job Location:</span>{" "}
        {job.location ? (
          job.location
        ) : (
          <span style={{ fontStyle: "italic" }}>
            Job location not provided.
          </span>
        )}
      </Typography>
      <Typography variant="body2" mt={2}>
        <span style={{ fontWeight: "bold" }}>Job Description:</span>{" "}
        {job.description ? (
          job.description
        ) : (
          <span style={{ fontStyle: "italic" }}>No description provided.</span>
        )}
      </Typography>
    </Paper>
  );
};

export default Notice;
