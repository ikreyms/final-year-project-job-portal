import {
  Box,
  Button,
  Divider,
  Grid,
  MenuItem,
  Snackbar,
  TextField,
  Typography,
} from "@mui/material";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { isObjectEmpty } from "../../../assets/utils";
import ProfilePicUpload from "../ProfilePicUpload";
import useStyles from "../styles";
import WhyWorkWithUs from "./WhyWorkWithUs";

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
  const [whyWorkWithUs, setWhyWorkWithUs] = useState([]);
  const [mission, setMission] = useState("");

  const [errorResponse, setErrorResponse] = useState({});

  const [snackbarOpen, setSnackbarOpen] = useState(false);

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
      setSnackbarOpen(true);
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
      <Typography variant="h5">Branding</Typography>
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
                label="Name of Business/Organization"
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
                disabled
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
          About
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
        </Grid>

        <Typography
          className={classes.resumeHeadings}
          color="primary"
          mt={3}
          mb={1}
        >
          Mission
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

        <Typography
          className={classes.resumeHeadings}
          color="primary"
          mt={3}
          mb={1}
        >
          Why Work With Us
        </Typography>
        {whyWorkWithUs &&
          whyWorkWithUs.map((_, index) => (
            <WhyWorkWithUs
              whyWorkWithUs={whyWorkWithUs}
              setWhyWorkWithUs={setWhyWorkWithUs}
              errorResponse={errorResponse}
              no={index + 1}
              key={index}
            />
          ))}
        <Button
          sx={{ mt: 1, textTransform: "capitalize", fontWeight: 400 }}
          onClick={() => {
            setWhyWorkWithUs((prev) => [
              ...prev,
              {
                heading: "",
                body: "",
              },
            ]);
          }}
        >
          + Add Benefit
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
        <Snackbar
          open={snackbarOpen}
          autoHideDuration={3000}
          message="Branding updated."
          onClose={(e, reason) => {
            if (reason === "clickaway") {
              return;
            }
            setSnackbarOpen(false);
          }}
          sx={{ m: 2 }}
        />
      </form>
    </Box>
  );
};

export default Branding;
