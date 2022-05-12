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
import { isObjectEmpty } from "../../../assets/utils";
import useStyles from "../styles";

const CallInterview = ({ application }) => {
  const classes = useStyles();

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
      const rejectApplicationresponse = await axios.patch(
        `http://localhost:2900/api/applications/rejectApplication/${application._id}`
      );
      const data = {
        subject: "Application Rejected",
        body: `Your job application for ${application.jobId.title} was rejected by the employer (${application.empId.companyName})`,
      };

      const url = `http://localhost:2900/api/notifications/${application.seekerId._id}/${application.empId._id}/create`;
      console.log(url);
      const createNotificationResponse = await axios.post(
        `http://localhost:2900/api/notifications/${application.seekerId._id}/${application.empId.id}/create`,
        data
      );

      setSnackbarMessage("Application Rejected.");
      snackbarOpen(true);
      console.log(rejectApplicationresponse.data);
      console.log(createNotificationResponse.data);
    } catch (error) {
      console.log(error.response);
    }
  };

  const callInterviewHandler = (e) => {
    e.preventDefault();
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
        spacing={1}
        sx={{ mb: 2 }}
        ref={acceptRejectBtnSet}
      >
        <Button
          variant="contained"
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
          variant="contained"
          size="small"
          color="error"
          disableElevation
          onClick={rejectHandler}
        >
          Reject
        </Button>
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
            acceptRejectBtnSet.current.style.display = "block";
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
