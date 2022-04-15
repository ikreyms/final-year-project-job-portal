import { Box, Grid, MenuItem, TextField, Typography } from "@mui/material";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { isObjectEmpty } from "../../assets/utils";
import ProfilePicUpload from "./ProfilePicUpload";
import useStyles from "./styles";

const Branding = () => {
  const classes = useStyles();

  const id = useSelector((state) => state.user?.id);

  const [image, setImage] = useState(null);
  const [companyName, setCompanyName] = useState("");
  const [sector, setSector] = useState("");
  const [location, setLocation] = useState("");
  const [contact, setContact] = useState("");
  const [email, setEmail] = useState("");
  const [about, setAbout] = useState("");
  const [whyWorkWithUs, setWhyWorkWithUs] = useState("");
  const [mission, setMission] = useState("");

  const [errorResponse, setErrorResponse] = useState({});

  const updateAllStates = (employer) => {
    setImage(employer.image ? employer.image : "");
    setCompanyName(employer.companyName ? employer.companyName : "");
    setSector(employer.sector ? employer.sector : "");
    setLocation(employer.location ? employer.location : "");
    setContact(employer.contact ? employer.contact : "");
    setEmail(employer.email ? employer.email : "");
    setAbout(employer.about ? employer.about : "");
    setMission(employer.mission ? employer.mission : "");

    employer.whyWorkWithUs.length > 0 &&
      setWhyWorkWithUs(employer.whyWorkWithUs);
  };

  const submitHandler = async (e) => {
    e.preventDefault();
    console.log("image", image);
    console.log("companyName", companyName);
    console.log("sector", sector);
    console.log("location", location);
    console.log("contact", contact);
    console.log("email", email);
    console.log("about", about);
    console.log("mission", mission);
    console.log("whyWorkWithUs", whyWorkWithUs);

    const formData = {
      image,
      companyName,
      sector,
      location,
      contact,
      email,
      about,
      mission,
      whyWorkWithUs,
    };

    try {
      const response = await axios.patch(
        `http://localhost:2900/api/employers/branding/${id}`,
        formData
      );
      const { employer } = response.data;
      updateAllStates(employer);
      setErrorResponse({});
      console.log(response.data);
    } catch (error) {
      console.log(error);
      console.log(error.response);
      setErrorResponse(error.response.data);
    }
  };

  const loadEmployerBranding = async () => {
    try {
      const response = await axios.get(
        `http://localhost:2900/api/employers/${id}`
      );
      const { employer } = response.data;
      updateAllStates(employer);
      console.log("loadEmployerBranding", employer);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    loadEmployerBranding();
  }, []);

  return (
    <Box className={classes.panelWrapper}>
      <Typography variant="h5">My Resume</Typography>
      <Typography variant="body1" mb={2}>
        Your branding information will be visible to Job Seekers. Include
        contact details, benefits, and other information.
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
            <Grid item xxs={1} xs={4}>
              <TextField
                fullWidth
                size="small"
                className={classes.formControl}
                label="Name of Organization/Business"
                margin="dense"
                name="companyName"
                value={companyName}
                onChange={(e) => setCompanyName(e.target.value)}
                error={
                  !isObjectEmpty(errorResponse)
                    ? errorResponse.error?.companyName
                      ? true
                      : false
                    : false
                }
                helperText={errorResponse?.error?.companyName}
              />
            </Grid>
            <Grid item xxs={1} xs={4}>
              <TextField
                fullWidth
                size="small"
                className={classes.formControl}
                label="Location"
                margin="dense"
                name="location"
                placeholder="city / island"
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
                fullWidth
                size="small"
                className={classes.formControl}
                label="Sector"
                margin="dense"
                select
                name="sector"
                value={sector}
                onChange={(e) => setSector(e.target.value)}
                error={
                  !isObjectEmpty(errorResponse)
                    ? errorResponse.error?.sector
                      ? true
                      : false
                    : false
                }
                helperText={errorResponse?.error?.sector}
              >
                <MenuItem value="">{""}</MenuItem>
                <MenuItem value="Government">Government</MenuItem>
                <MenuItem value="Private">Private</MenuItem>
              </TextField>
            </Grid>
            <Grid item xxs={1} xs={2}>
              <TextField
                fullWidth
                size="small"
                className={classes.formControl}
                label="Contact Number"
                margin="dense"
                name="contact"
                value={contact}
                onChange={(e) => setContact(e.target.value)}
                error={
                  !isObjectEmpty(errorResponse)
                    ? errorResponse.error?.contact
                      ? true
                      : false
                    : false
                }
                helperText={errorResponse?.error?.contact}
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
          Branding Information
        </Typography>
        <Grid
          container
          spacing={{ z: 1 }}
          columns={{ z: 1, xs: 2 }}
          sx={{ flexGrow: 1 }}
        >
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
              error={
                !isObjectEmpty(errorResponse)
                  ? errorResponse.error?.about
                    ? true
                    : false
                  : false
              }
              helperText={errorResponse?.error?.about}
            />
          </Grid>
          <Grid item xxs={1} xs={4}>
            <TextField
              fullWidth
              size="small"
              className={classes.formControl}
              label="Mission"
              margin="dense"
              multiline
              maxRows={5}
              name="mission"
              value={mission}
              onChange={(e) => setMission(e.target.value)}
              error={
                !isObjectEmpty(errorResponse)
                  ? errorResponse.error?.mission
                    ? true
                    : false
                  : false
              }
              helperText={errorResponse?.error?.mission}
            />
          </Grid>
        </Grid>
      </form>
    </Box>
  );
};

export default Branding;
