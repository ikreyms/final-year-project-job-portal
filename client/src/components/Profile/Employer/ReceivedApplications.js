import {
  Box,
  Button,
  Divider,
  MenuItem,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import useStyles from "../styles";
import axios from "axios";
import { useSelector } from "react-redux";
import EmployerApplicationPreview from "./EmployerApplicationPreview";
import CallInterview from "./CallInterview";

const ReceivedApplications = () => {
  const classes = useStyles();

  const empId = useSelector((state) => state.user?.id);

  const [applicationStatus, setApplicationStatus] = useState("Pending");

  const [applications, setApplications] = useState([]);

  const [selection, setSelection] = useState([]);
  console.log(selection);

  const getReveivedApplications = async (empId, applicationStatus) => {
    try {
      const response = await axios.get(
        `http://localhost:2900/api/applications/${empId}/employer/${applicationStatus}`
      );
      setApplications(response.data.applications);
      console.log(response);
    } catch (error) {
      console.log(error.response);
    }
  };

  useEffect(() => {
    getReveivedApplications(empId, applicationStatus);
  }, [applicationStatus]);

  return (
    <Box className={classes.panelWrapper}>
      <Typography variant="h5">Received Applications</Typography>
      <Typography variant="body1" mb={2}>
        Received applications are displayed here.
      </Typography>

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

      {selection.length > 0 && (
        <CallInterview
          selection={selection}
          setSelection={setSelection}
          applications={applications}
          setApplications={setApplications}
          applicationStatus={applicationStatus}
          getReveivedApplications={getReveivedApplications}
        />
      )}

      <Divider sx={{ mt: 1, mb: 3 }} />

      {applications?.length > 0 ? (
        <Stack spacing={1}>
          {applications.map((application, index) => (
            <EmployerApplicationPreview
              key={index}
              application={application}
              applications={applications}
              selection={selection}
              setSelection={setSelection}
            />
          ))}
        </Stack>
      ) : (
        "No applications to show."
      )}
    </Box>
  );
};

export default ReceivedApplications;
