import {
  Box,
  Typography,
  TextField,
  Grid,
  Button,
  MenuItem,
  Divider,
} from "@mui/material";
import React, { useState } from "react";
import logo from "../../assets/logo.svg";
import Experience from "./Experience";
import Qualification from "./Qualification";
import useStyles from "./styles";

const Resume = () => {
  const classes = useStyles();

  const [basicInfo, setBasicInfo] = useState({
    image: "",
    firstName: "",
    lastName: "",
    nid: "",
    email: "",
    contact: "",
    gender: "",
    dob: "",
    maritalStatus: "",
    about: "",
  });
  const [qualifications, setQualifications] = useState([]);
  const [experiences, setExperiences] = useState([]);

  const handleBasicInfo = (x) => (e) => {
    const key = x;
    setBasicInfo((prevBasicInfo) => ({
      ...prevBasicInfo,
      [key]: e.target.value,
    }));
    console.log(basicInfo);
  };

  const submitHandler = (e) => {
    e.preventDefault();
  };

  return (
    <Box className={classes.panelWrapper}>
      <Typography variant="h5" mb={2}>
        My Resume
      </Typography>
      <form onSubmit={submitHandler}>
        <Typography className={classes.resumeHeadings} color="primary" mb={2}>
          Basic Information
        </Typography>
        <Box className={classes.formSection}>
          <img
            src={logo}
            // src={profileData.image ? profileData.image : logo}
            alt="profilePic"
            className={classes.profilePic}
          />
          <input type="file" style={{ display: "none" }} />
          <Grid
            container
            spacing={{ z: 1 }}
            columns={{ z: 1, xs: 4 }}
            sx={{ flexGrow: 1 }}
          >
            <Grid item xxs={1} xs={2}>
              <TextField
                fullWidth
                size="small"
                className={classes.formControl}
                label="First Name"
                margin="dense"
                value={basicInfo.firstName}
                onChange={handleBasicInfo("firstName")}
              />
            </Grid>
            <Grid item xxs={1} xs={2}>
              <TextField
                fullWidth
                size="small"
                className={classes.formControl}
                label="Last Name"
                margin="dense"
                value={basicInfo.lastName}
                onChange={handleBasicInfo("lastName")}
              />
            </Grid>
            <Grid item xxs={1} xs={2}>
              <TextField
                fullWidth
                size="small"
                className={classes.formControl}
                label="National ID No."
                margin="dense"
                value={basicInfo.nid}
                onChange={handleBasicInfo("nid")}
              />
            </Grid>
            <Grid item xxs={1} xs={2}>
              <TextField
                fullWidth
                size="small"
                className={classes.formControl}
                label="Date of Birth"
                margin="dense"
                value={basicInfo.dob}
                onChange={handleBasicInfo("dob")}
              />
            </Grid>
            <Grid item xxs={1} xs={2}>
              <TextField
                fullWidth
                size="small"
                className={classes.formControl}
                label="Gender"
                margin="dense"
                select
                value={basicInfo.gender}
                onChange={handleBasicInfo("gender")}
              >
                <MenuItem value="Male">Male</MenuItem>
                <MenuItem value="Female">Female</MenuItem>
              </TextField>
            </Grid>
            <Grid item xxs={1} xs={2}>
              <TextField
                fullWidth
                size="small"
                className={classes.formControl}
                label="Marital Status"
                margin="dense"
                select
                value={basicInfo.maritalStatus}
                onChange={handleBasicInfo("maritalStatus")}
              >
                <MenuItem value="Single">Single</MenuItem>
                <MenuItem value="Married">Married</MenuItem>
              </TextField>
            </Grid>
            <Grid item xxs={1} xs={4}>
              <TextField
                fullWidth
                size="small"
                className={classes.formControl}
                label="Contact No."
                margin="dense"
                value={basicInfo.contact}
                onChange={handleBasicInfo("contact")}
              />
            </Grid>
            <Grid item xxs={1} xs={4}>
              <TextField
                fullWidth
                size="small"
                className={classes.formControl}
                label="Email"
                margin="dense"
                value={basicInfo.email}
                onChange={handleBasicInfo("email")}
              />
            </Grid>
            <Grid item xxs={1} xs={4}>
              <TextField
                fullWidth
                size="small"
                className={classes.formControl}
                label="About"
                margin="dense"
                multiline
                maxRows={5}
                value={basicInfo.about}
                onChange={handleBasicInfo("about")}
              />
            </Grid>
          </Grid>
        </Box>

        <Typography className={classes.resumeHeadings} color="primary" mt={3}>
          Qualifications
        </Typography>
        {qualifications.map((_, index) => (
          <Qualification no={index + 1} key={index} />
        ))}
        <Button
          sx={{ mt: 1, textTransform: "capitalize", fontWeight: 400 }}
          onClick={() => {
            setQualifications((prevState) => [
              ...prevState,
              {
                institute: "",
                completedOn: "",
                level: "",
                courseName: "",
              },
            ]);
          }}
        >
          + Add Qualification
        </Button>

        <Typography className={classes.resumeHeadings} color="primary" mt={3}>
          Work experience
        </Typography>
        {experiences.map((_, index) => (
          <Experience no={index + 1} key={index} />
        ))}
        <Button
          sx={{ mt: 1, textTransform: "capitalize", fontWeight: 400 }}
          onClick={() => {
            setExperiences((prevState) => [
              ...prevState,
              {
                employer: "",
                jobTitle: "",
                duration: "",
                from: "",
                to: "",
                category: "",
              },
            ]);
          }}
        >
          + Add Experience
        </Button>
        <Divider sx={{ my: 3 }} />
        <Button
          disableElevation
          sx={{ display: "block" }}
          type="submit"
          variant="contained"
        >
          Update
        </Button>
      </form>
    </Box>
  );
};

export default Resume;
