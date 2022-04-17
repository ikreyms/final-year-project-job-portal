import { Box } from "@mui/material";
import axios from "axios";
import moment from "moment";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import useStyles from "../styles";

const AppliedJobs = () => {
  const classes = useStyles();

  const userId = useSelector((state) => state.user.id);

  const [applications, setApplications] = useState([]);

  const getAppliedJobsData = async () => {
    const response = await axios.get(
      `http://localhost:2900/api/applications/${userId}`
    );
    setApplications(response.data.applications);
  };

  useEffect(() => {
    getAppliedJobsData();
  }, []);

  return (
    <Box className={classes.panelWrapper}>
      {applications.length > 0 &&
        applications.map((application, index) => (
          <Box key={index}>
            Job Title:{application.jobId?.title} Applied Date:{" "}
            {moment(application.createdAt).format("DD/MM/YYYY")}
          </Box>
        ))}
    </Box>
  );
};

export default AppliedJobs;
