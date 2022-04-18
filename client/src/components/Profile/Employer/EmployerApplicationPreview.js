import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Card,
  CardActionArea,
  CardContent,
  CardMedia,
  IconButton,
  Stack,
  Tooltip,
  Typography,
} from "@mui/material";
import logo from "../../../assets/logo.svg";
import HideIcon from "@mui/icons-material/Close";
import React, { useState } from "react";
import moment from "moment";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import EmployerResumePreview from "./EmployerResumePreview";

const EmployerApplicationPreview = ({ application }) => {
  return (
    <Accordion sx={{ width: 1, my: 0.5 }} square defaultExpanded>
      <AccordionSummary expandIcon={<ExpandMoreIcon />}>
        <Stack direction="row" alignItems="center" spacing={2}>
          <img
            src={application.seekerId.image ? application.seekerId.image : logo}
            alt="profilePic"
            style={{ height: 50, width: 50 }}
            sx={{
              borderRadius: "50%",
              cursor: "pointer !important",
              overflow: "hidden",
              objectFit: "cover",
            }}
          />
          <Stack>
            <Typography variant="body1">{application.jobId?.title}</Typography>
            <Typography variant="caption">
              Applicant: {application.seekerId?.firstName}{" "}
              {application.seekerId?.lastName} ({application.seekerId?.nid})
            </Typography>
            <Stack direction="row" spacing={2}>
              <Typography variant="caption">
                Due date:{" "}
                {moment(application.jobId?.dueDate).format("DD/MM/YYYY")}
              </Typography>
              <Typography variant="caption">
                Applied on: {moment(application.createdAt).format("DD/MM/YYYY")}
              </Typography>
            </Stack>
          </Stack>
        </Stack>
      </AccordionSummary>
      <AccordionDetails>
        <Typography>
          <EmployerResumePreview seekerId={application.seekerId} />
        </Typography>
      </AccordionDetails>
    </Accordion>
  );
};

export default EmployerApplicationPreview;
