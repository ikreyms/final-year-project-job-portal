import {
  Button,
  Grid,
  Snackbar,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import axios from "axios";
import React, { useRef, useState } from "react";
import { useSelector } from "react-redux";
import { isObjectEmpty } from "../../../assets/utils";
import useStyles from "../styles";
import moment from "moment";

const CallInterview = ({
  selection,
  setSelection,
  applicationStatus,
  getReveivedApplications,
}) => {
  const classes = useStyles();

  const empId = useSelector((state) => state?.user?.id);

  const [venue, setVenue] = useState("");
  const [date, setDate] = useState("");
  const [time, setTime] = useState("");

  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");

  const [isShowForm, setIsShowForm] = useState(false);

  const [errorResponse, setErrorResponse] = useState({});

  const interviewCallForm = useRef();
  const acceptRejectBtnSet = useRef();
  const callCancelBtnSet = useRef();

  const rejectHandler = async (e) => {
    e.preventDefault();
    try {
      const selectionInfo = { selectionList: [...selection] };
      const response = await axios.patch(
        `http://localhost:2900/api/applications/${empId}/rejectApplications/`,
        selectionInfo
      );

      // const createNotificationResponse = await axios.post(
      //   `http://localhost:2900/api/notifications/createNotifications/${empId}`,
      //   selectionInfo
      // );

      // setApplications(response.data.applications);
      getReveivedApplications(empId, applicationStatus);
      setSelection([]);
      setSnackbarMessage("Application(s) Rejected.");
      setSnackbarOpen(true);
      console.log(response.data);
      // console.log(createNotificationResponse.data);
    } catch (error) {
      console.log(error);
      console.log(error.response);
    }
  };

  const callInterviewHandler = async (e) => {
    e.preventDefault();
    const interviewData = {
      venue,
      date: moment(date, "DD/MM/YYYY").format(),
      time: moment(time, "HH:mm").format(),
      selectionList: [...selection],
    };

    try {
      const response = await axios.patch(
        `http://localhost:2900/api/applications/acceptApplication/${empId}`,
        interviewData
      );
      console.log(response.data);
      getReveivedApplications(empId, applicationStatus);
      setSelection([]);
      setSnackbarMessage("Application(s) Accepted. Interview Dates Set.");
      setSnackbarOpen(true);
    } catch (error) {
      console.log(error.response);
      setErrorResponse(error.response.data);
    }
  };

  return (
    <>
      {isShowForm && (
        <>
          <Typography variant="body1" mb={1}>
            Enter Interview Details.
          </Typography>
          <Grid
            ref={interviewCallForm}
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
                helperText={errorResponse?.error?.interviewDate}
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
                helperText={errorResponse?.error?.interviewTime}
              />
            </Grid>
          </Grid>
        </>
      )}

      <Stack
        direction="row"
        alignItems="center"
        justifyContent="space-between"
        ref={acceptRejectBtnSet}
      >
        <Typography variant="caption" mt={0.1}>
          Selected: {selection.length}
        </Typography>
        <Stack direction="row" spacing={1}>
          <Button
            size="small"
            color="success"
            disableElevation
            onClick={(e) => {
              e.preventDefault();
              setIsShowForm(true);
              callCancelBtnSet.current.style.display = "block";
              acceptRejectBtnSet.current.style.display = "none";
            }}
          >
            Accept
          </Button>
          <Button
            size="small"
            color="error"
            disableElevation
            onClick={rejectHandler}
          >
            Reject
          </Button>
        </Stack>
      </Stack>

      <Stack
        direction="row"
        spacing={1}
        sx={{ mb: 2, display: "none" }}
        ref={callCancelBtnSet}
      >
        <Button
          variant="contained"
          size="small"
          color="success"
          disableElevation
          onClick={callInterviewHandler}
        >
          Call To Interview
        </Button>
        <Button
          variant="outlined"
          size="small"
          color="primary"
          disableElevation
          onClick={(e) => {
            e.preventDefault();
            setIsShowForm(false);
            callCancelBtnSet.current.style.display = "none";
            acceptRejectBtnSet.current.style.display = "flex";
          }}
        >
          Not Now
        </Button>
      </Stack>
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
    </>
  );
};

export default CallInterview;
