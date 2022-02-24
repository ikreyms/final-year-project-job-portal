import {
  Box,
  Button,
  Divider,
  Grid,
  Link,
  MenuItem,
  TextField,
  Typography,
} from "@mui/material";
import React, { useState } from "react";
import GoogleLogin from "react-google-login";
import AuthLogo from "./AuthLogo";
import useStyles from "./styles";
import axios from "axios";

const Auth = () => {
  const classes = useStyles();
  const [selectedUserType, setSelectedUserType] = useState("");
  const [isSignupForm, setIsSignupForm] = useState(false);
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    accountType: "",
    password: "",
  });
  const [repeatPassword, setRepeatPassword] = useState("");

  const submitHandler = async (e) => {
    e.preventDefault();
    console.log(formData);
    try {
      if (repeatPassword !== formData.password) {
        console.log("passwords must match");
      } else {
        const response = await axios.post(
          "http://localhost:2900/api/auth/signup",
          formData
        );
        console.log(response.data);
      }
    } catch (error) {
      console.log(error.response);
    }
  };

  const googleLoginSuccess = (googleData) => {
    console.log(googleData);
  };

  const googleLoginFailure = (failedResult) => {
    console.log(failedResult);
  };

  return (
    <Box className={classes.container}>
      <Box className={classes.content}>
        <Box className={classes.promoBox}>
          <Box className={classes.promoBoxTextContainer}>
            <AuthLogo />
            <Divider />
            <Typography variant="h6" className={classes.promoHeading}>
              Find the job thats right for you.
            </Typography>
            <Typography variant="body2" className={classes.promoText}>
              Create a Job Seeker account to explore and apply for jobs.
            </Typography>
            <Divider textAlign="left">
              <Typography variant="caption" color="white">
                OR
              </Typography>
            </Divider>
            <Typography variant="h6" className={classes.promoHeading}>
              Find talents for your company's open positions.
            </Typography>
            <Typography variant="body2" className={classes.promoText}>
              Create an employer account to explore multiple features to make
              the hiring process easy.
            </Typography>
          </Box>
        </Box>
        <Box className={classes.formBox}>
          <Typography variant="h5" pt={0}>
            {isSignupForm ? "Signup." : "Login."}
          </Typography>
          <Typography
            variant="subtitle1"
            mb={1}
            className={classes.promoText}
            color="secondary"
          >
            {isSignupForm
              ? "Complete the details to create an account."
              : "Complete the login credentials."}
          </Typography>
          <form
            onSubmit={submitHandler}
            className={classes.form}
            autoComplete="off"
            noValidate
          >
            <TextField
              className={classes.formControl}
              label="First Name"
              type="text"
              required
              margin="dense"
              fullWidth
              sx={{
                display: isSignupForm ? "inline-flex" : "none",
              }}
              onChange={(e) =>
                setFormData({ ...formData, firstName: e.target.value })
              }
            />

            <TextField
              className={classes.formControl}
              label="Last Name"
              type="text"
              required
              margin="dense"
              fullWidth
              sx={{
                display: isSignupForm ? "inline-flex" : "none",
              }}
              onChange={(e) =>
                setFormData({ ...formData, lastName: e.target.value })
              }
            />

            <TextField
              className={classes.formControl}
              label="Email Address"
              type="email"
              required
              margin="dense"
              onChange={(e) =>
                setFormData({ ...formData, email: e.target.value })
              }
            />

            <TextField
              className={classes.formControl}
              select
              required
              label="Account Type"
              margin="dense"
              value={selectedUserType}
              onChange={(e) => {
                setSelectedUserType(e.target.value);
              }}
              onChange={(e) =>
                setFormData({ ...formData, accountType: e.target.value })
              }
              sx={{
                display: isSignupForm ? "inline-flex" : "none",
              }}
            >
              <MenuItem value="Job Seeker">Job Seeker</MenuItem>
              <MenuItem value="Employer">Employer</MenuItem>
            </TextField>

            <TextField
              className={classes.formControl}
              required
              margin="dense"
              label="Password"
              type="password"
              onChange={(e) =>
                setFormData({ ...formData, password: e.target.value })
              }
            />
            <TextField
              className={classes.formControl}
              required
              margin="dense"
              label="Repeat Password"
              type="password"
              sx={{ display: isSignupForm ? "flex" : "none" }}
              onChange={(e) => setRepeatPassword(e.target.value)}
            />
            <Button
              type="submit"
              variant="contained"
              size="large"
              className={classes.submitButton}
              disableElevation
            >
              {isSignupForm ? "Register" : "Login"}
            </Button>
            <Divider textAlign="left" sx={{ mb: 1 }}>
              <Typography variant="body2">OR</Typography>
            </Divider>
            {/* <Button
              variant="outlined"
              size="large"
              className={classes.submitButton}
              disableElevation
            >
              Login with Google
            </Button> */}
            <GoogleLogin
              clientId={process.env.REACT_APP_GOOGLE_CLIENT_ID}
              buttonText="Login with Google"
              onSuccess={googleLoginSuccess}
              onFailure={googleLoginFailure}
              cookiePolicy="single_host_origin"
            />
          </form>
          <Box display="flex" gap={1} flexWrap="wrap" mt={1}>
            <Typography variant="caption">
              {isSignupForm
                ? "Already have an account?"
                : "Don't have an account?"}{" "}
              <Link
                onClick={() => {
                  setIsSignupForm(!isSignupForm);
                  window.scroll(0, 0);
                }}
              >
                {isSignupForm ? "Go to Login" : "Signup"}
              </Link>
            </Typography>
            <Typography variant="caption">
              Forgot password? <Link>Click here to reset.</Link>
            </Typography>
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

export default Auth;
