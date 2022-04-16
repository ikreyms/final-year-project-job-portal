import {
  Box,
  Button,
  Divider,
  Grid,
  MenuItem,
  SliderTrack,
  Snackbar,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import axios from "axios";
import moment from "moment";
import React, { useEffect, useState } from "react";
import {
  certificateLevels,
  experienceCategories,
  jobPostJobTypes,
  jobTypes,
} from "../../../assets/dataArrays";
import { isObjectEmpty } from "../../../assets/utils";
import useStyles from "../styles";
import Criteria from "./Criteria";
import Responsibility from "./Responsibility";

const JobPostForm = ({
  selectedJob,
  empId,
  isShowForm,
  setIsShowForm,
  setSnackbarOpen,
  setSnackbarMessage,
  sx,
}) => {
  const classes = useStyles();

  const [title, setTitle] = useState("");
  const [jobType, setJobType] = useState("");
  const [noOfPositions, setNoOfPositions] = useState("");
  const [location, setLocation] = useState("");
  const [dueDate, setDueDate] = useState("");
  const [salary, setSalary] = useState("");
  const [minQualification, setMinQualification] = useState("");
  const [jobCategory, setJobCategory] = useState("");
  const [description, setDescription] = useState("");

  const [responsibilities, setResponsibilities] = useState([]);

  const [criteria, setCriteria] = useState([]);

  const [errorResponse, setErrorResponse] = useState({});

  const setFields = () => {
    setTitle(selectedJob.title);
    setJobType(selectedJob.jobType);
    setNoOfPositions(selectedJob.noOfPositions);
    setLocation(selectedJob.location);
    setDueDate(moment(selectedJob.dueDate).format("DD/MM/YYYY"));
    setSalary(selectedJob.salary);
    setMinQualification(selectedJob.minQualification);
    setJobCategory(selectedJob.jobCategory);
    setDescription(selectedJob.description);

    setResponsibilities(selectedJob.responsibilities);

    setCriteria(selectedJob.criteria);
  };

  const updateJob = async () => {
    const formData = {
      title,
      jobType,
      noOfPositions,
      location,
      dueDate: moment(dueDate, "DD/MM/YYYY").format(),
      salary,
      minQualification,
      jobCategory,
      description,
      responsibilities,
      criteria,
    };

    try {
      console.log("id", selectedJob);
      const response = await axios.patch(
        `http://localhost:2900/api/jobs/${selectedJob?._id}`,
        formData
      );
      console.log("update", response.data);
      setIsShowForm(false);
      setSnackbarMessage("Job details updated.");
      setSnackbarOpen(true);
      setErrorResponse({});
    } catch (error) {
      console.log(error.response);
      setErrorResponse(error.response.data);
    }
  };

  const postJob = async () => {
    const formData = {
      title,
      jobType,
      noOfPositions,
      location,
      dueDate,
      salary,
      minQualification,
      jobCategory,
      description,
      responsibilities,
      criteria,
    };

    try {
      const response = await axios.post(
        `http://localhost:2900/api/jobs/${empId}/create`,
        formData
      );
      console.log("post", response.data);
      setIsShowForm(false);
      setSnackbarMessage("New job posted.");
      setSnackbarOpen(true);
      setErrorResponse({});
    } catch (error) {
      console.log(error.response);
      setErrorResponse(error.response.data);
    }
  };

  const submitHandler = async (e) => {
    e.preventDefault();
    console.log("title", title);
    console.log("jobType", jobType);
    console.log("noOfPositions", noOfPositions);
    console.log("location", location);
    console.log("dueDate", dueDate);
    console.log("salary", salary);
    console.log("minQualification", minQualification);
    console.log("jobCategory", jobCategory);
    console.log("description", description);
    console.log("responsibilities", responsibilities);
    console.log("criteria", criteria);

    if (e.target.name === "post") await postJob();
    else if (e.target.name === "update") await updateJob();
  };

  useEffect(() => {
    if (selectedJob) setFields();
  }, []);

  return (
    <form style={sx} autoComplete="off" noValidate>
      <Typography className={classes.resumeHeadings} color="primary" mb={2}>
        Basic Details
      </Typography>
      <Grid
        container
        spacing={{ z: 1 }}
        columns={{ z: 1, xs: 4 }}
        sx={{ flexGrow: 1 }}
      >
        <Grid item xxs={1} xs={4}>
          <TextField
            required
            fullWidth
            size="small"
            className={classes.formControl}
            label="Job Title"
            margin="dense"
            name="title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            error={
              !isObjectEmpty(errorResponse)
                ? errorResponse.error?.title
                  ? true
                  : false
                : false
            }
            helperText={errorResponse?.error?.title}
          />
        </Grid>
        <Grid item xxs={1} xs={2}>
          <TextField
            required
            fullWidth
            size="small"
            className={classes.formControl}
            select
            label="Job Type"
            margin="dense"
            name="jobType"
            value={jobType}
            onChange={(e) => setJobType(e.target.value)}
            error={
              !isObjectEmpty(errorResponse)
                ? errorResponse.error?.jobType
                  ? true
                  : false
                : false
            }
            helperText={errorResponse?.error?.jobType}
          >
            {jobPostJobTypes.map((type, index) => (
              <MenuItem value={type} key={index}>
                {type}
              </MenuItem>
            ))}
          </TextField>
        </Grid>
        <Grid item xxs={1} xs={2}>
          <TextField
            fullWidth
            size="small"
            className={classes.formControl}
            type="number"
            label="No. of vacancies"
            margin="dense"
            name="noOfPositions"
            value={noOfPositions}
            onChange={(e) => setNoOfPositions(e.target.value)}
            error={
              !isObjectEmpty(errorResponse)
                ? errorResponse.error?.noOfPositions
                  ? true
                  : false
                : false
            }
            helperText={errorResponse?.error?.noOfPositions}
          />
        </Grid>
        <Grid item xxs={1} xs={2}>
          <TextField
            fullWidth
            size="small"
            className={classes.formControl}
            label="Location"
            margin="dense"
            name="location"
            value={location}
            onChange={(e) => setLocation(e.target.value)}
            error={
              !isObjectEmpty(errorResponse)
                ? errorResponse.error?.location
                  ? true
                  : false
                : false
            }
            helperText={errorResponse?.error?.location}
          />
        </Grid>
        <Grid item xxs={1} xs={2}>
          <TextField
            required
            fullWidth
            size="small"
            className={classes.formControl}
            label="Due Date"
            margin="dense"
            name="dueDate"
            value={dueDate}
            placeholder="dd/mm/yyyy"
            onChange={(e) => setDueDate(e.target.value)}
            error={
              !isObjectEmpty(errorResponse)
                ? errorResponse.error?.dueDate
                  ? true
                  : false
                : false
            }
            helperText={errorResponse?.error?.dueDate}
          />
        </Grid>
        <Grid item xxs={1} xs={2}>
          <TextField
            required
            fullWidth
            size="small"
            className={classes.formControl}
            label="Salary"
            margin="dense"
            name="salary"
            value={salary}
            onChange={(e) => setSalary(e.target.value)}
            error={
              !isObjectEmpty(errorResponse)
                ? errorResponse.error?.salary
                  ? true
                  : false
                : false
            }
            helperText={errorResponse?.error?.salary}
          />
        </Grid>
        <Grid item xxs={1} xs={2}>
          <TextField
            fullWidth
            size="small"
            className={classes.formControl}
            label="Minimum Qualification"
            margin="dense"
            name="minQualification"
            select
            value={minQualification}
            onChange={(e) => setMinQualification(e.target.value)}
            error={
              !isObjectEmpty(errorResponse)
                ? errorResponse.error?.minQualification
                  ? true
                  : false
                : false
            }
            helperText={errorResponse?.error?.minQualification}
          >
            {certificateLevels.map((level, index) => (
              <MenuItem value={level} key={index}>
                {level}
              </MenuItem>
            ))}
          </TextField>
        </Grid>

        <Grid item xxs={1} xs={4}>
          <TextField
            required
            fullWidth
            size="small"
            className={classes.formControl}
            select
            label="Job Category"
            margin="dense"
            name="jobCategory"
            value={jobCategory}
            onChange={(e) => setJobCategory(e.target.value)}
            error={
              !isObjectEmpty(errorResponse)
                ? errorResponse.error?.jobCategory
                  ? true
                  : false
                : false
            }
            helperText={errorResponse?.error?.jobCategory}
          >
            {experienceCategories.map((category, index) => (
              <MenuItem value={category} key={index}>
                {category}
              </MenuItem>
            ))}
          </TextField>
        </Grid>
        <Grid item xxs={1} xs={4}>
          <TextField
            fullWidth
            size="small"
            className={classes.formControl}
            label="General Description"
            margin="dense"
            name="description"
            multiline
            maxRows={7}
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            error={
              !isObjectEmpty(errorResponse)
                ? errorResponse.error?.description
                  ? true
                  : false
                : false
            }
            helperText={errorResponse?.error?.description}
          />
        </Grid>
      </Grid>
      <Typography
        className={classes.resumeHeadings}
        color="primary"
        mb={1}
        mt={3}
      >
        Responsibilities
      </Typography>
      {responsibilities &&
        responsibilities.map((_, index) => (
          <Responsibility
            responsibilities={responsibilities}
            setResponsibilities={setResponsibilities}
            errorResponse={errorResponse}
            no={index + 1}
            key={index}
          />
        ))}
      <Button
        sx={{ mt: 1, textTransform: "capitalize", fontWeight: 400 }}
        onClick={() => {
          setResponsibilities((prev) => [
            ...prev,
            {
              name: "",
            },
          ]);
        }}
      >
        + Add Responsibility
      </Button>

      <Typography
        className={classes.resumeHeadings}
        color="primary"
        mb={1}
        mt={3}
      >
        Selection Criteria
      </Typography>
      {criteria &&
        criteria.map((_, index) => (
          <Criteria
            criteria={criteria}
            setCriteria={setCriteria}
            errorResponse={errorResponse}
            no={index + 1}
            key={index}
          />
        ))}
      <Button
        sx={{ mt: 1, textTransform: "capitalize", fontWeight: 400 }}
        onClick={() => {
          setCriteria((prev) => [
            ...prev,
            {
              name: "",
            },
          ]);
        }}
      >
        + Add Criterion
      </Button>

      <Divider sx={{ my: 3 }} />
      <Box sx={{ display: "flex", gap: 1, flexWrap: "wrap" }}>
        {!selectedJob && (
          <Button
            onClick={submitHandler}
            disableElevation
            type="submit"
            variant="contained"
            name="post"
          >
            Post
          </Button>
        )}
        {selectedJob && (
          <Button
            onClick={submitHandler}
            disableElevation
            type="submit"
            variant="contained"
            name="update"
          >
            Update
          </Button>
        )}
        {selectedJob && (
          <Button
            onClick={submitHandler}
            disableElevation
            color="error"
            type="submit"
            variant="contained"
            name="delete"
          >
            Delete Job
          </Button>
        )}
        <Button
          onClick={() => setIsShowForm(false)}
          disableElevation
          type="submit"
          variant="outlined"
          name="cancel"
        >
          Cancel
        </Button>
      </Box>
    </form>
  );
};

export default JobPostForm;
