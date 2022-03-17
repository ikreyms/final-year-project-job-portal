import React from "react";
import useStyles from "./styles";
import { Box, TextField, Typography } from "@mui/material";
import Intro from "./Intro";

const Jobs = () => {
  const classes = useStyles();

  return (
    <Box className={classes.section}>
      <Box className={classes.container}>
        <Intro />
        <Typography variant="h6" mt={3}>
          Search and Filter Jobs
        </Typography>
        <form className={classes.searchControls}>
          <TextField
            name="searchTerm"
            type="text"
            label="Explore Jobs"
            variant="outlined"
            sx={{ flexGrow: 1 }}
          />
          <TextField
            name="sector"
            type="text"
            select
            label="Sector"
            variant="outlined"
            // value={sector}
            sx={{ flexGrow: 1 }}
          ></TextField>
          <TextField
            name="employers"
            type="text"
            select
            label="Employer"
            variant="outlined"
            // value={sector}
            sx={{ flexGrow: 1 }}
          ></TextField>
          <TextField
            name="salaryRange"
            type="text"
            select
            label="Salary Range"
            variant="outlined"
            sx={{ flexGrow: 1 }}
          ></TextField>
          <TextField
            name="sort"
            type="text"
            select
            label="Sort by"
            variant="outlined"
            sx={{ flexGrow: 1 }}
          ></TextField>
        </form>
      </Box>
    </Box>
  );
};

export default Jobs;
