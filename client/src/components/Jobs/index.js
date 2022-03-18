import React, { useState } from "react";
import useStyles from "./styles";
import { Box, Button, MenuItem, TextField, Typography } from "@mui/material";
import Intro from "./Intro";

const Jobs = () => {
  const classes = useStyles();

  //Ui states
  const sectors = ["All", "Government", "Private"];
  const [sector, setSector] = useState(sectors[0]);

  const jobTypes = ["All", "Part-time", "Full-time", "Intern"];
  const [jobType, setJobType] = useState(jobTypes[0]);

  const salaryRanges = [
    "All ranges",
    "1000-2999",
    "3000-4999",
    "5000-6999",
    "7000-9999",
    "10000-14999",
    "15000-19999",
    "20000+",
  ];
  const [salaryRange, setSalaryRange] = useState(salaryRanges[0]);

  return (
    <Box className={classes.section}>
      <Box className={classes.container}>
        <Intro />
        <Typography variant="h6" mt={3}>
          Filters
        </Typography>
        <form className={classes.searchControls}>
          <TextField
            name="sector"
            type="text"
            select
            label="Sector"
            variant="outlined"
            size="small"
            value={sector}
            onChange={(e) => setSector(e.target.value)}
            sx={{ flexGrow: 1, flexBasis: 1 }}
          >
            {sectors.map((sector) => (
              <MenuItem key={sector} value={sector}>
                {sector}
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
