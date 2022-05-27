import { Box, Divider, Typography, Snackbar } from "@mui/material";
import React, { useEffect, useState } from "react";
import useStyles from "../styles";
import axios from "axios";

import { useSelector } from "react-redux";
import InterviewAccordion from "./InterviewAccordion";

const Interviews = () => {
  const classes = useStyles();

  const empId = useSelector((state) => state?.user.id);

  const [interviews, setInterviews] = useState([]);

  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");

  const loadInterviewData = async () => {
    try {
      const response = await axios.get(
        `http://localhost:2900/api/interviews/${empId}`
      );
      console.log(response);
      setInterviews(response.data.interviews);
      console.log("interviews", response.data.interviews);
    } catch (error) {
      console.log(error.response);
      setInterviews([]);
    }
  };

  useEffect(() => {
    loadInterviewData();
  }, []);

  return (
    <Box className={classes.panelWrapper}>
      <Typography variant="h5">Scheduled Interviews</Typography>
      <Typography variant="body1" mb={2}>
        The following are the details of the interviews scheduled.
      </Typography>

      <Divider sx={{ mt: 1, mb: 3 }} />

      {interviews.length > 0
        ? interviews.map((interview) => (
            <InterviewAccordion
              interview={interview}
              key={interview._id}
              setInterviews={setInterviews}
              loadInterviewData={loadInterviewData}
              setSnackbarOpen={setSnackbarOpen}
              setSnackbarMessage={setSnackbarMessage}
            />
          ))
        : "No interviews scheduled."}
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

export default Interviews;
