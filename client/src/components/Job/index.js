import { Box, Button, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import useStyles from "./styles";
import Notice from "./Notice";
import SimilarJob from "./SimilarJob";

const Job = () => {
  const { id: jobId } = useParams();
  const classes = useStyles();
  const navigate = useNavigate();

  const [job, setJob] = useState({});
  const [similarJobs, setSimilarJobs] = useState({});

  const loadJob = async (jobId) => {
    try {
      const response = await axios.get(
        `http://localhost:2900/api/jobs/${jobId}`
      );
      setJob(response.data.job);
    } catch (error) {
      console.log(error.response);
    }
  };

  const loadSimilarJobs = async (jobId) => {
    try {
      const response = await axios.get(
        `http://localhost:2900/api/jobs/getSimilar/${jobId}`
      );
      setSimilarJobs(response.data.similarJobs);
      console.log(response.data);
    } catch (error) {
      console.log(error.response);
    }
  };

  useEffect(() => {
    loadJob(jobId);
  }, [jobId]);

  useEffect(() => {
    loadSimilarJobs(jobId);
  }, [jobId]);

  return (
    <Box className={classes.section}>
      <Box className={classes.container}>
        <Box className={classes.main}>
          <Notice job={job} />
          <Box className={classes.actionArea}>
            <Typography variant="subtitle2" paragraph>
              For now we only accept online applications. So please make sure
              have updated your CV/Profile because those information will be
              included in your job application. Once you have pressed 'APPLY'
              you cannot undo the application.
            </Typography>

            <Box className={classes.btnSet}>
              <Button
                variant="contained"
                disableElevation
                className={classes.btn}
              >
                Apply
              </Button>
              <Button
                variant="outlined"
                className={classes.btn}
                onClick={(e) => {
                  e.preventDefault();
                  navigate("/jobs");
                }}
              >
                Back to Jobs
              </Button>
            </Box>
          </Box>
        </Box>
        {Object.keys(similarJobs).length > 0 && (
          <Box sx={{ mb: 4 }}>
            <Typography variant="h6" mt={2} mb={1}>
              Similar Jobs
            </Typography>
            <Box className={classes.jobDisplay}>
              {similarJobs.map((job) => (
                <SimilarJob
                  key={job._id}
                  job={job}
                  onClick={() => navigate(`/jobs/${job._id}`)}
                />
              ))}
            </Box>
          </Box>
        )}
      </Box>
    </Box>
  );
};

export default Job;
