import { Box, Button, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import axios from "axios";
import { useSelector } from "react-redux";
import useStyles from "./styles";
import AddIcon from "@mui/icons-material/Add";

const JobPosts = () => {
  const classes = useStyles();

  const empId = useSelector((state) => state.user?.id);

  const [jobs, setJobs] = useState([]);

  const loadJobData = async () => {
    try {
      const response = await axios.get(
        `http://localhost:2900/api/jobs/employer/${empId}`
      );
      const jobs = response.data.jobs;
      setJobs(jobs);
      console.log(response.data);
    } catch (error) {
      console.log(error.response);
    }
  };

  useEffect(() => {
    loadJobData();
  }, []);

  return (
    <Box className={classes.panelWrapper}>
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          flexWrap: "wrap",
        }}
      >
        <Box sx={{ width: 0.7, mr: "12px" }}>
          <Typography variant="h5">Job Posts</Typography>
          <Typography variant="body1" mb={2}>
            Your job posts are previewed here. However, jobs that are beyond the
            deadline are not shown.
          </Typography>
        </Box>
        <Button
          sx={{ alignSelf: "flex-start", mb: "12px" }}
          variant="contained"
          disableElevation
          startIcon={<AddIcon />}
        >
          Post a Job
        </Button>
      </Box>
      {jobs.length === 0 ? "You have no active job posts." : ""}
      <div>"Form goes somewhere here...when the button is clicked"</div>
    </Box>
  );
};

export default JobPosts;
