import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Box,
  Stack,
  TextField,
  Checkbox,
  Typography,
} from "@mui/material";
import logo from "../../../assets/logo.svg";
import HideIcon from "@mui/icons-material/Close";
import React, { useState } from "react";
import moment from "moment";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import EmployerResumePreview from "./EmployerResumePreview";
import CallInterview from "./CallInterview";

const EmployerApplicationPreview = ({
  application,
  selection,
  setSelection,
}) => {
  const [selected, setSelected] = useState(false);

  const selectionChangeHandler = () => {
    setSelected(!selected);
    if (!selected) {
      let exists = false;
      for (const item in selection) {
        if (item === application.id) {
          exists = true;
          break;
        }
      }
      if (exists === false) setSelection((prev) => [...prev, application.id]);
    } else {
      const newSelection = selection.filter((item) => item !== application.id);
      setSelection(newSelection);
    }
  };

  return (
    <Stack direction="row" sx={{ justifyContent: "space-between" }}>
      <Checkbox
        checked={selected}
        sx={{ alignSelf: "flex-start", mt: 3, mr: 2 }}
        onChange={selectionChangeHandler}
      />
      <Accordion sx={{ width: 1, my: 0.5 }} square>
        <AccordionSummary expandIcon={<ExpandMoreIcon />}>
          <Stack direction="row" alignItems="center" spacing={2}>
            <img
              src={
                application.seekerId.image ? application.seekerId.image : logo
              }
              alt="profilePic"
              style={{ height: 50, width: 50 }}
              sx={{
                borderRadius: "50%",
                cursor: "pointer !important",
                overflow: "hidden !important",
                objectFit: "cover",
              }}
            />
            <Stack>
              <Typography variant="body1">
                {application.jobId?.title}
              </Typography>
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
                  Applied on:{" "}
                  {moment(application.createdAt).format("DD/MM/YYYY")}
                </Typography>
              </Stack>
            </Stack>
          </Stack>
        </AccordionSummary>
        <AccordionDetails>
          <EmployerResumePreview seekerId={application.seekerId} />
          {/* <Divider sx={{ my: 3 }} />
        <CallInterview application={application} /> */}
        </AccordionDetails>
      </Accordion>
    </Stack>
  );
};

export default EmployerApplicationPreview;
