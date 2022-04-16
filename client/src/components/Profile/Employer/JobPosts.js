import {
  Box,
  Button,
  CircularProgress,
  Divider,
  Snackbar,
  Typography,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import axios from "axios";
import { useSelector } from "react-redux";
import useStyles from "../styles";
import AddIcon from "@mui/icons-material/Add";
import CancelIcon from "@mui/icons-material/DoDisturb";
import JobPostForm from "./JobPostForm";
import JobResult from "../../Jobs/JobResult";

const JobPosts = () => {
  const classes = useStyles();

  const empId = useSelector((state) => state.user?.id);

  const [isShowForm, setIsShowForm] = useState(false);
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");
  const [loading, setLoading] = useState(false);

  const [jobs, setJobs] = useState([]);
  const [selectedJob, setSelectedJob] = useState(null);

  const loadJobData = async () => {
    try {
      setLoading(true);
      const response = await axios.get(
        `http://localhost:2900/api/jobs/employer/${empId}`
      );
      const jobs = response.data.jobs;
      setJobs(jobs);
      setLoading(false);
      console.log(response.data);
    } catch (error) {
      setLoading(false);
      console.log(error.response);
    }
  };

  useEffect(() => {
    loadJobData();
  }, [isShowForm]);

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
          <Typography variant="h5">
            {isShowForm && !selectedJob
              ? "Post a Job"
              : isShowForm && selectedJob
              ? "Edit Job"
              : "Job Posts"}
          </Typography>
          <Typography variant="body1" mb={2}>
            {isShowForm && !selectedJob
              ? "Complete the form below to post a job."
              : isShowForm && selectedJob
              ? "Edit details of the job."
              : "Your job posts are previewed here. However, jobs that are overdue are not shown."}
          </Typography>
        </Box>
        <Button
          sx={{ alignSelf: "flex-start", mb: "12px" }}
          variant="contained"
          color={isShowForm ? "error" : "primary"}
          disableElevation
          startIcon={isShowForm ? <CancelIcon /> : <AddIcon />}
          onClick={() => {
            setIsShowForm(!isShowForm);
            if (!isShowForm) setSelectedJob(null);
          }}
        >
          {isShowForm ? "Cancel Form" : "Post a Job"}
        </Button>
      </Box>
      <Divider sx={{ mt: 1, mb: 3 }} />

      {isShowForm && (
        <JobPostForm
          selectedJob={selectedJob}
          empId={empId}
          isShowForm={isShowForm}
          setIsShowForm={setIsShowForm}
          setSnackbarOpen={setSnackbarOpen}
          setSnackbarMessage={setSnackbarMessage}
        />
      )}

      <Box
        sx={{ display: isShowForm ? "none" : "flex", flexDirection: "column" }}
      >
        {loading ? (
          <CircularProgress color="secondary" sx={{ m: 2 }} />
        ) : jobs.length === 0 ? (
          "You have no active job posts."
        ) : (
          jobs.map((job) => (
            <JobResult
              job={job}
              key={job._id}
              onClick={() => {
                setIsShowForm(true);
                setSelectedJob(job);
              }}
            />
          ))
        )}
      </Box>

      <Snackbar
        open={snackbarOpen}
        autoHideDuration={3000}
        message={snackbarMessage}
        onClose={(e, reason) => {
          if (reason === "clickaway") {
            return;
          }
          setSnackbarOpen(false);
        }}
        sx={{ m: 2 }}
      />
    </Box>
  );
};

export default JobPosts;
