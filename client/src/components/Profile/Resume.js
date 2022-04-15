import {
  Box,
  Typography,
  TextField,
  Grid,
  Button,
  MenuItem,
  Divider,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import moment from "moment";
import useStyles from "./styles";
import Qualification from "./Qualification";
import Experience from "./Experience";
import {
  qualificationFields,
  experienceFields,
} from "../../assets/dataObjects";
import { isObjectEmpty } from "../../assets/utils";
import { useSelector } from "react-redux";
import ProfilePicUpload from "./ProfilePicUpload";
import axios from "axios";
import Skill from "./Skill";

const Resume = () => {
  const classes = useStyles();

  const id = useSelector((state) => state.user?.id);

  const [image, setImage] = useState(null);
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [nid, setNid] = useState("");
  const [dob, setDob] = useState("");
  const [gender, setGender] = useState("");
  const [maritalStatus, setMaritalStatus] = useState("");
  const [contact, setContact] = useState("");
  const [email, setEmail] = useState("");
  const [about, setAbout] = useState("");

  const [qualifications, setQualifications] = useState([]);

  const [experiences, setExperiences] = useState([]);

  const [skills, setSkills] = useState([]);

  const [errorResponse, setErrorResponse] = useState({});

  const updateAllStates = (user) => {
    setImage(user.image ? user.image : "");
    setFirstName(user.firstName ? user.firstName : "");
    setLastName(user.lastName ? user.lastName : "");
    setNid(user.nid ? user.nid : "");
    setDob(user.dob ? user.dob : "");
    setGender(user.gender ? user.gender : "");
    setMaritalStatus(user.maritalStatus ? user.maritalStatus : "");
    setContact(user.contact ? user.contact : "");
    setEmail(user.email ? user.email : "");
    setAbout(user.about ? user.about : "");

    user.qualifications.length > 0 && setQualifications(user.qualifications);
    user.experiences.length > 0 && setExperiences(user.experiences);
    user.skills.length > 0 && setSkills(user.skills);
  };

  const submitHandler = async (e) => {
    e.preventDefault();
    console.log("image", image);
    console.log("firstName", firstName);
    console.log("lastName", lastName);
    console.log("nid", nid);
    console.log("dob", dob);
    console.log("gender", gender);
    console.log("maritalStatus", maritalStatus);
    console.log("contact", contact);
    console.log("email", email);
    console.log("qualifications:", qualifications);
    console.log("experiences:", experiences);
    console.log("skills:", skills);

    const formData = {
      image,
      firstName,
      lastName,
      nid,
      dob,
      gender,
      maritalStatus,
      contact,
      email,
      about,
      qualifications,
      experiences,
      skills,
    };

    try {
      const response = await axios.patch(
        `http://localhost:2900/api/users/resume/${id}`,
        formData
      );
      const { user } = response.data;
      updateAllStates(user);
      setErrorResponse({});
      console.log(response.data);
    } catch (error) {
      console.log(error);
      console.log(error.response);
      setErrorResponse(error.response.data);
    }
  };

  const loadUserResume = async () => {
    try {
      const response = await axios.get(`http://localhost:2900/api/users/${id}`);
      const { user } = response.data;
      updateAllStates(user);
      console.log("loadUserResume", user);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    loadUserResume();
  }, []);

  return (
    <Box className={classes.panelWrapper}>
      <Typography variant="h5">My Resume</Typography>
      <Typography variant="body1" mb={2}>
        Your resume information will be included in your job application. Make
        sure the all the information is provided.
      </Typography>
      <form onSubmit={submitHandler}>
        <Typography className={classes.resumeHeadings} color="primary" mb={2}>
          Basic Information
        </Typography>
        <Box className={classes.formSection}>
          <ProfilePicUpload image={image} setImage={setImage} />
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
                name="firstName"
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
                error={
                  !isObjectEmpty(errorResponse)
                    ? errorResponse.error?.firstName
                      ? true
                      : false
                    : false
                }
                helperText={errorResponse?.error?.firstName}
              />
            </Grid>
            <Grid item xxs={1} xs={2}>
              <TextField
                fullWidth
                size="small"
                className={classes.formControl}
                label="Last Name"
                margin="dense"
                name="lastName"
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
                error={
                  !isObjectEmpty(errorResponse)
                    ? errorResponse.error?.lastName
                      ? true
                      : false
                    : false
                }
                helperText={errorResponse?.error?.lastName}
              />
            </Grid>
            <Grid item xxs={1} xs={2}>
              <TextField
                fullWidth
                size="small"
                className={classes.formControl}
                label="National ID No."
                margin="dense"
                name="nid"
                value={nid}
                onChange={(e) => setNid(e.target.value)}
                error={
                  !isObjectEmpty(errorResponse)
                    ? errorResponse.error?.nid
                      ? true
                      : false
                    : false
                }
                helperText={errorResponse?.error?.nid}
              />
            </Grid>
            <Grid item xxs={1} xs={2}>
              <TextField
                fullWidth
                size="small"
                className={classes.formControl}
                label="Date of Birth"
                margin="dense"
                name="dob"
                placeholder="dd/mm/yyyy"
                value={dob}
                onChange={(e) => setDob(e.target.value)}
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
                name="gender"
                value={gender}
                onChange={(e) => setGender(e.target.value)}
              >
                <MenuItem value="Male" key="0">
                  Male
                </MenuItem>
                <MenuItem value="Female" key="1">
                  Female
                </MenuItem>
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
                name="maritalStatus"
                value={maritalStatus}
                onChange={(e) => setMaritalStatus(e.target.value)}
              >
                <MenuItem value="Single" key="0">
                  Single
                </MenuItem>
                <MenuItem value="Married" key="1">
                  Married
                </MenuItem>
              </TextField>
            </Grid>
            <Grid item xxs={1} xs={4}>
              <TextField
                fullWidth
                size="small"
                className={classes.formControl}
                label="Contact No."
                margin="dense"
                name="contact"
                value={contact}
                onChange={(e) => setContact(e.target.value)}
              />
            </Grid>
            <Grid item xxs={1} xs={4}>
              <TextField
                fullWidth
                size="small"
                className={classes.formControl}
                label="Email"
                margin="dense"
                name="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                error={
                  !isObjectEmpty(errorResponse)
                    ? errorResponse.error?.email
                      ? true
                      : false
                    : false
                }
                helperText={errorResponse?.error?.email}
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
                name="about"
                value={about}
                onChange={(e) => setAbout(e.target.value)}
              />
            </Grid>
          </Grid>
        </Box>

        <Typography
          className={classes.resumeHeadings}
          color="primary"
          mt={3}
          mb={1}
        >
          Qualifications
        </Typography>
        {qualifications &&
          qualifications.map((_, index) => (
            <Qualification
              qualifications={qualifications}
              setQualifications={setQualifications}
              errorResponse={errorResponse}
              no={index + 1}
              key={index}
            />
          ))}
        <Button
          sx={{ mt: 1, textTransform: "capitalize", fontWeight: 400 }}
          onClick={() => {
            setQualifications((prev) => [
              ...prev,
              {
                ...qualificationFields,
              },
            ]);
          }}
        >
          + Add Qualification
        </Button>

        <Typography
          className={classes.resumeHeadings}
          color="primary"
          mt={3}
          mb={1}
        >
          Work experience
        </Typography>
        {experiences &&
          experiences.map((_, index) => (
            <Experience
              experiences={experiences}
              setExperiences={setExperiences}
              errorResponse={errorResponse}
              no={index + 1}
              key={index}
            />
          ))}
        <Button
          sx={{ mt: 1, textTransform: "capitalize", fontWeight: 400 }}
          onClick={() => {
            setExperiences((prev) => [
              ...prev,
              {
                ...experienceFields,
              },
            ]);
          }}
        >
          + Add Experience
        </Button>
        <Typography
          className={classes.resumeHeadings}
          color="primary"
          mt={3}
          mb={1}
        >
          Skills
        </Typography>
        {skills &&
          skills.map((_, index) => (
            <Skill
              skills={skills}
              setSkills={setSkills}
              errorResponse={errorResponse}
              no={index + 1}
              key={index}
            />
          ))}
        <Button
          sx={{ mt: 1, textTransform: "capitalize", fontWeight: 400 }}
          onClick={() => {
            setSkills((prev) => [...prev, { name: "" }]);
          }}
        >
          + Add Skill
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
