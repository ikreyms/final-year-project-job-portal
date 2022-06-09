import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Stack,
  Checkbox,
  Typography,
  Chip,
} from "@mui/material";
import logo from "../../../assets/logo.svg";
import React, { useEffect, useState, useRef } from "react";
import moment from "moment";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import EmployerResumePreview from "./EmployerResumePreview";

const EmployerApplicationPreview = ({
  application,
  applications,
  selection,
  setSelection,
}) => {
  const [selected, setSelected] = useState(false);

  const toPrintComponent = useRef();

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

  useEffect(() => {
    setSelected(false);
  }, [applications]);

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
                application?.seekerId?.image
                  ? application?.seekerId?.image
                  : logo
              }
              alt="profilePic"
              style={{ height: 50, width: 50, borderRadius: "50%" }}
              sx={{
                cursor: "pointer !important",
                overflow: "hidden !important",
                objectFit: "cover",
              }}
            />
            <Stack>
              <Stack direction="row" spacing={1}>
                <Typography variant="body1">
                  {application.jobId?.title}
                </Typography>
                <Chip
                  label={application.status}
                  sx={{ my: 0.5 }}
                  size="small"
                  variant="outlined"
                  color={
                    application.status === "Rejected"
                      ? "error"
                      : application.status === "Accepted"
                      ? "success"
                      : "primary"
                  }
                />
              </Stack>
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
          <EmployerResumePreview
            ref={toPrintComponent}
            seekerId={application.seekerId}
          />
        </AccordionDetails>
      </Accordion>
    </Stack>
  );
};
export default EmployerApplicationPreview;
