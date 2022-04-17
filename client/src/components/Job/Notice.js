import { Box, Divider, Grid, Link, Paper, Typography } from "@mui/material";
import moment from "moment";
import React from "react";
import NumberFormat from "react-number-format";
import useStyles from "./styles";

const Notice = ({ job }) => {
  const classes = useStyles();
  return (
    <Paper sx={{ p: 3 }}>
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
      <Typography
        className={classes.resumeHeadings}
        color="primary"
        mt={3}
        mb={1}
      >
        Basic Details
      </Typography>
      <Grid container spacing={{ z: 1 }} columns={{ z: 1, xs: 5 }}>
        <Grid item z={1} xs={2}>
          <Typography variant="body2">
            <span style={{ fontWeight: "bold" }}>Open Positions:</span>{" "}
            {job.noOfPositions}
          </Typography>
        </Grid>
        <Grid item z={1} xs={3}>
          <Typography variant="body2">
            <span style={{ fontWeight: "bold" }}>Min. Qualification:</span>{" "}
            {job.minQualification ? job.minQualification : "Basic education."}
          </Typography>
        </Grid>
        <Grid item z={1} xs={2}>
          <Typography variant="body2">
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
        </Grid>
        <Grid item z={1} xs={3}>
          <Typography variant="body2">
            <span style={{ fontWeight: "bold" }}>Job Location:</span>{" "}
            {job.location ? (
              job.location
            ) : (
              <span style={{ fontStyle: "italic" }}>
                Job location not provided.
              </span>
            )}
          </Typography>
        </Grid>
        <Grid item z={1} xs={4}>
          <Typography variant="body2">
            <span style={{ fontWeight: "bold" }}>General Description:</span>{" "}
            {job.description ? (
              job.description
            ) : (
              <span style={{ fontStyle: "italic" }}>
                No description provided.
              </span>
            )}
          </Typography>
        </Grid>
      </Grid>

      {job.responsibilities?.length > 0 && (
        <>
          <Typography
            className={classes.resumeHeadings}
            color="primary"
            mt={3}
            mb={1}
          >
            Responsibilities
          </Typography>
          {job.responsibilities.map((responsibility, index) => (
            <Typography variant="body2" key={index}>
              &#8226; {responsibility.name}
            </Typography>
          ))}
        </>
      )}

      {job.criteria?.length > 0 && (
        <>
          <Typography
            className={classes.resumeHeadings}
            color="primary"
            mt={3}
            mb={1}
          >
            Criteria
          </Typography>
          {job.criteria.map((criterion, index) => (
            <Typography variant="body2" key={index}>
              &#8226; {criterion.name}
            </Typography>
          ))}
        </>
      )}
    </Paper>
  );
};

export default Notice;
