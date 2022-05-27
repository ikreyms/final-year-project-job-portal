import React, { useEffect, useState } from "react";
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Divider,
  Stack,
  Typography,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  Button,
  TextField,
  Grid,
} from "@mui/material";
import moment from "moment";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import useStyles from "../styles";
import { isObjectEmpty } from "../../../assets/utils";
import axios from "axios";
import { useSelector } from "react-redux";

const InterviewAccordion = ({
  interview,
  setInterviews,
  setSnackbarOpen,
  setSnackbarMessage,
  loadInterviewData,
}) => {
  const classes = useStyles();

  const empId = useSelector((state) => state?.user.id);

  const [venue, setVenue] = useState("");
  const [date, setDate] = useState("");
  const [time, setTime] = useState("");

  const [errorResponse, setErrorResponse] = useState({});

  const [isShowForm, setIsShowForm] = useState(false);

  const updateInterview = async () => {
    const interviewData = {
      venue,
      date: moment(date, "DD/MM/YYYY").format(),
      time: moment(time, "HH:mm").format(),
    };
    console.log("interviewData", interviewData);
    try {
      const response = await axios.patch(
        `http://localhost:2900/api/interviews/${interview._id}/${empId}/updateInterview`,
        interviewData
      );
      console.log(response.data);
      setErrorResponse({});
      loadInterviewData();
      setSnackbarMessage("Interview updated.");
      setSnackbarOpen(true);
      setIsShowForm(false);
    } catch (error) {
      setErrorResponse(error.response.data);
      console.log(error.response);
    }
  };

  const cancelInterview = async () => {
    try {
      const response = await axios.delete(
        `http://localhost:2900/api/interviews/cancelInterview/${empId}/${interview._id}`
      );
      console.log(response.data);
      loadInterviewData();
      setSnackbarMessage("Interview Cancelled.");
      setSnackbarOpen(true);
    } catch (error) {
      console.log(error.response);
    }
  };

  useEffect(() => {
    setVenue(interview.venue);
    setDate(moment(interview.interviewDate).format("DD/MM/YYYY"));
    setTime(moment(interview.interviewTime).format("HH:mm"));
  }, [isShowForm]);

  return (
    <Accordion
      key={interview._id}
      sx={{ width: 1, my: 0.5 }}
      square
      onChange={() => setIsShowForm(false)}
      //   expanded={accordionExpanded}
      //   onClick={() => setAccordionExpanded(!accordionExpanded)}
    >
      <AccordionSummary expandIcon={<ExpandMoreIcon />}>
        <Stack>
          <Typography variant="subtitle2">
            Venue: <span style={{ fontWeight: 400 }}>{interview.venue}</span>
          </Typography>
          <Typography variant="subtitle2">
            Date:{" "}
            <span style={{ fontWeight: 400 }}>
              {moment(interview.interviewDate).format("DD/MM/YYYY")}
            </span>
          </Typography>
          <Typography variant="subtitle2">
            Time:{" "}
            <span style={{ fontWeight: 400 }}>
              {moment(interview.interviewTime).format("HH:mm")} hrs
            </span>
          </Typography>
        </Stack>
      </AccordionSummary>
      <AccordionDetails>
        <Stack>
          <Typography variant="subtitle2" mb={1}>
            Interviewee(s) Details
          </Typography>

          <Table size="small">
            <TableHead sx={{ my: 0 }}>
              <TableRow>
                <TableCell>
                  <Typography variant="caption" fontWeight={500}>
                    Applicant
                  </Typography>
                </TableCell>
                <TableCell>
                  <Typography variant="caption" fontWeight={500}>
                    NID
                  </Typography>
                </TableCell>
                <TableCell>
                  <Typography variant="caption" fontWeight={500}>
                    Applied for
                  </Typography>
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {interview.appIds
                .sort((a, b) => a.firstName - b.firstName)
                .map((appId) => (
                  <TableRow
                    key={appId._id}
                    sx={{
                      "&:last-child td, &:last-child th": { border: 0 },
                    }}
                  >
                    <TableCell component="th" scope="row">
                      <Typography variant="caption">
                        {appId.seekerId.firstName} {appId.seekerId.lastName}
                      </Typography>
                    </TableCell>
                    <TableCell>
                      <Typography variant="caption">
                        {appId.seekerId.nid}
                      </Typography>
                    </TableCell>
                    <TableCell>
                      <Typography variant="caption">
                        {appId.jobId.title}
                      </Typography>
                    </TableCell>
                  </TableRow>
                ))}
            </TableBody>
          </Table>
          <Divider sx={{ my: 2 }} />

          {isShowForm && (
            <Grid
              container
              spacing={{ z: 1 }}
              columns={{ z: 1, xs: 4 }}
              sx={{ flexGrow: 1, mb: 2 }}
            >
              <Grid item xxs={1} xs={4}>
                <TextField
                  fullWidth
                  size="small"
                  className={classes.formControl}
                  label="Venue"
                  margin="dense"
                  name="venue"
                  value={venue}
                  onChange={(e) => setVenue(e.target.value)}
                  error={
                    !isObjectEmpty(errorResponse)
                      ? errorResponse.error?.venue
                        ? true
                        : false
                      : false
                  }
                  helperText={errorResponse?.error?.venue}
                />
              </Grid>
              <Grid item xxs={1} xs={2}>
                <TextField
                  fullWidth
                  size="small"
                  className={classes.formControl}
                  label="Date"
                  placeholder="DD/MM/YYYY"
                  margin="dense"
                  name="interviewDate"
                  value={date}
                  onChange={(e) => setDate(e.target.value)}
                  error={
                    !isObjectEmpty(errorResponse)
                      ? errorResponse.error?.interviewDate
                        ? true
                        : false
                      : false
                  }
                  helperText={
                    errorResponse?.error?.interviewDate &&
                    "Enter date in correct format (DD/MM/YYYY)"
                  }
                />
              </Grid>
              <Grid item xxs={1} xs={2}>
                <TextField
                  fullWidth
                  size="small"
                  className={classes.formControl}
                  label="Time (24Hrs Format)"
                  placeholder="HH:MM"
                  margin="dense"
                  name="interviewTime"
                  value={time}
                  onChange={(e) => setTime(e.target.value)}
                  error={
                    !isObjectEmpty(errorResponse)
                      ? errorResponse.error?.interviewTime
                        ? true
                        : false
                      : false
                  }
                  helperText={
                    errorResponse?.error?.interviewTime &&
                    "Enter time in 24 hrs format (HH:MM)"
                  }
                />
              </Grid>
            </Grid>
          )}

          {isShowForm ? (
            <Stack direction="row">
              <Button size="small" onClick={updateInterview}>
                Update
              </Button>
              <Button
                size="small"
                onClick={() => {
                  setErrorResponse({});
                  setIsShowForm(false);
                }}
              >
                Cancel Editing
              </Button>
            </Stack>
          ) : (
            <Stack direction="row">
              <Button size="small" onClick={() => setIsShowForm(true)}>
                Edit
              </Button>
              <Button size="small" color="error" onClick={cancelInterview}>
                Cancel Interview
              </Button>
            </Stack>
          )}
        </Stack>
      </AccordionDetails>
    </Accordion>
  );
};

export default InterviewAccordion;
