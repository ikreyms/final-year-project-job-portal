import {
  Box,
  Typography,
  Divider,
  Stack,
  TextField,
  MenuItem,
} from "@mui/material";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import useStyles from "../styles";
import SeekerApplicationPreview from "./SeekerApplicationPreview";

const AppliedJobs = () => {
  const classes = useStyles();

  const userId = useSelector((state) => state.user.id);

  const [applications, setApplications] = useState([]);
  const [applicationStatus, setApplicationStatus] = useState("All");

  const filterApplications = async () => {
    try {
      const response = await axios.get(
        `http://localhost:2900/api/applications/filter/${userId}/${applicationStatus}`
      );
      setApplications(response.data.applications);
      console.log(response);
      console.log(applications);
    } catch (error) {
      console.log(error.response);
    }
  };

  useEffect(() => {
    filterApplications();
  }, [applicationStatus]);

  return (
    <Box className={classes.panelWrapper}>
      <Typography variant="h5">Applied Jobs</Typography>
      <Typography variant="body1" mb={2}>
        The jobs you have applied recently are displayed here.
      </Typography>
      <Divider sx={{ mt: 1, mb: 3 }} />
      <Typography variant="body2" mb={1}>
        Filter by Status:
      </Typography>
      <TextField
        fullWidth
        select
        size="small"
        sx={{ mb: 2 }}
        value={applicationStatus}
        onChange={(e) => setApplicationStatus(e.target.value)}
      >
        <MenuItem value="All">All</MenuItem>
        <MenuItem value="Pending">Pending</MenuItem>
        <MenuItem value="Accepted">Accepted</MenuItem>
        <MenuItem value="Rejected">Rejected</MenuItem>
      </TextField>
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
        <Typography variant="body2">No job applications to show.</Typography>
      )}
    </Box>
  );
};

export default AppliedJobs;
