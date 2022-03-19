import React, { useState } from "react";
import useStyles from "./styles";
import { Box, Button, MenuItem, TextField, Typography } from "@mui/material";
import Intro from "./Intro";
import { jobCategories, salaryRanges, jobTypes } from "../../assets/dataArrays";
import axios from "axios";

const Jobs = () => {
  const classes = useStyles();

  //Ui states
  const [jobCategory, setJobCategory] = useState("All");

  const [jobType, setJobType] = useState("All");

  const [salaryRange, setSalaryRange] = useState("All");

  // data states
  const [jobs, setJobs] = useState([]);

  const fetchJobsData = async () => {
    try {
      const response = await axios.get(
        `http://localhost:2900/api/jobs?jobCategory=${jobCategory}&jobType=${jobType}&salaryRange=${salaryRange}`
      );
      setJobs(response.data);
      console.log(response.data);
      console.log(jobCategory, salaryRange, jobType);
    } catch (error) {
      console.log(error.response);
    }
  };

  useState(() => {
    fetchJobsData();
    console.log("heheh");
  }, [jobCategory, jobType, salaryRange]);

  return (
    <Box className={classes.section}>
      <Box className={classes.container}>
        <Intro />
        <Typography variant="h6" mt={3}>
          Filters
        </Typography>
        <form className={classes.searchControls}>
          <TextField
            name="jobCategory"
            type="text"
            select
            label="Category"
            variant="outlined"
            size="small"
            value={jobCategory}
            onChange={(e) => setJobCategory(e.target.value)}
            sx={{ flexGrow: 2, flexBasis: 2 }}
          >
            {jobCategories.map((jobCategory, index) => (
              <MenuItem key={index} value={jobCategory}>
                {jobCategory}
              </MenuItem>
            ))}
          </TextField>
          <TextField
            name="jobType"
            type="text"
            select
            label="Job Type"
            variant="outlined"
            size="small"
            value={jobType}
            onChange={(e) => setJobType(e.target.value)}
            sx={{ flexGrow: 1, flexBasis: 1 }}
          >
            {jobTypes.map((jobType) => (
              <MenuItem key={jobType} value={jobType}>
                {jobType}
              </MenuItem>
            ))}
          </TextField>
          <TextField
            name="salaryRange"
            type="text"
            select
            label="Salary Range"
            variant="outlined"
            size="small"
            value={salaryRange}
            onChange={(e) => setSalaryRange(e.target.value)}
            sx={{ flexGrow: 1, flexBasis: 1 }}
          >
            {salaryRanges.map((salaryRange) => (
              <MenuItem key={salaryRange} value={salaryRange}>
                {salaryRange}
              </MenuItem>
            ))}
          </TextField>
          <Button variant="contained" disableElevation>
            Clear
          </Button>
        </form>
      </Box>
    </Box>
  );
};

export default Jobs;
