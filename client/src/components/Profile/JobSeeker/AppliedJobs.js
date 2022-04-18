import { Box, Typography, Divider, Stack, Link } from "@mui/material";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import useStyles from "../styles";

import SeekerApplicationPreview from "./SeekerApplicationPreview";

const AppliedJobs = () => {
  const classes = useStyles();

  const userId = useSelector((state) => state.user.id);

  const [applications, setApplications] = useState([]);
  const [totalApplications, setTotalApplications] = useState(0);

  const getAppliedJobsData = async () => {
    try {
      console.log("userId", userId);
      const response = await axios.get(
        `http://localhost:2900/api/applications/${userId}/seeker`
      );
      setApplications(response.data.applications);
      setTotalApplications(response.data.totalApplications);
      console.log(response);
    } catch (error) {
      console.log(error.response);
    }
  };

  const unHideAllApplications = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.patch(
        `http://localhost:2900/api/applications/${userId}/`
      );
      setApplications(response.data.applications);
      setTotalApplications(response.data.totalApplications);
      console.log("unhide", response);
    } catch (error) {
      console.log(error.response);
    }
  };

  useEffect(() => {
    getAppliedJobsData();
  }, []);

  return (
    <Box className={classes.panelWrapper}>
      <Typography variant="h5">Applied Jobs</Typography>

      <Typography variant="body1" mb={2}>
        The jobs you have applied recently are displayed here.
      </Typography>

      {totalApplications !== applications.length && (
        <Typography variant="caption" mb={2}>
          Total applications: {totalApplications}, Hidden:{" "}
          {totalApplications - applications?.length}{" "}
          <Link onClick={unHideAllApplications}>Unhide</Link>
        </Typography>
      )}
      <Divider sx={{ mt: 1, mb: 3 }} />

      {applications?.length > 0 ? (
        <Stack spacing={1}>
          {applications.map((application, index) => (
            <SeekerApplicationPreview
              key={index}
              application={application}
              userId={userId}
              setApplications={setApplications}
            />
          ))}
        </Stack>
      ) : (
        "You have not applied to any jobs recently."
      )}
    </Box>
  );
};

export default AppliedJobs;
