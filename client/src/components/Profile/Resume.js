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
import useStyles from "./styles";
import Qualification from "./Qualification";
import Experience from "./Experience";
import {
  qualificationFields,
  experienceFields,
} from "../../assets/dataObjects";
import { useSelector } from "react-redux";
import ProfilePicUpload from "./ProfilePicUpload";
import axios from "axios";

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

  const submitHandler = (e) => {
    e.preventDefault();
    console.log("image", image);
    console.log("qualifications:", qualifications);
    console.log("experiences:", experiences);
  };

  const loadUserResume = async () => {
    try {
      const response = await axios.get(`http://localhost:2900/api/users/${id}`);
      const { user } = response.data;
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
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    loadUserResume();
  }, []);

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

        <Typography className={classes.resumeHeadings} color="primary" mt={3}>
          Qualifications
        </Typography>
        {qualifications &&
          qualifications.map((_, index) => (
            <Qualification
              qualifications={qualifications}
              setQualifications={setQualifications}
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

        <Typography className={classes.resumeHeadings} color="primary" mt={3}>
          Work experience
        </Typography>
        {experiences &&
          experiences.map((_, index) => (
            <Experience
              experiences={experiences}
              setExperiences={setExperiences}
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
        <Typography className={classes.resumeHeadings} color="primary" mt={3}>
          Skills
        </Typography>

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
