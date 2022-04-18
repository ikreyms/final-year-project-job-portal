import {
  Box,
  Card,
  CardContent,
  ClickAwayListener,
  IconButton,
  Stack,
  Tooltip,
  Typography,
} from "@mui/material";
import moment from "moment";
import React, { useState } from "react";
import HideIcon from "@mui/icons-material/Close";
import axios from "axios";

const SeekerApplicationPreview = ({ application, userId, setApplications }) => {
  const [toolTipOpen, setToolTipOpen] = useState(false);

  const hideApplication = async () => {
    try {
      const response = await axios.patch(
        `http://localhost:2900/api/applications/${application._id}/${userId}`
      );
      setApplications(response.data.applications);
      console.log(response.data);
    } catch (error) {
      console.log(error.response);
    }
  };

  return (
    <Card elevation={1}>
      <CardContent>
        <Stack direction="row" justifyContent="space-between">
          <Typography variant="h6" color="primary">
            {application.jobId?.title} ({application.jobId?.jobType})
          </Typography>
          <Tooltip
            title="Hide"
            open={toolTipOpen}
            onClose={() => setToolTipOpen(false)}
            onOpen={() => setToolTipOpen(true)}
          >
            <IconButton onClick={hideApplication}>
              <HideIcon fontSize="small" />
            </IconButton>
          </Tooltip>
        </Stack>
        <Typography variant="body1">
          {application.jobId?.postedBy.companyName}
        </Typography>
        <Stack direction="row" spacing={2}>
          <Typography variant="body1">
            <span style={{ fontWeight: 500 }}>Due date: </span>
            {moment(application.jobId?.dueDate).format("DD/MM/YYYY")}{" "}
          </Typography>
          <Typography variant="body1">
            <span style={{ fontWeight: 500 }}>Applied on: </span>
            {moment(application.createdAt).format("DD/MM/YYYY")}
          </Typography>
        </Stack>
      </CardContent>
    </Card>
  );
};

export default SeekerApplicationPreview;
