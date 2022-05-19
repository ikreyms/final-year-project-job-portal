import {
  Box,
  Button,
  CircularProgress,
  Divider,
  Link,
  MenuItem,
  TextField,
  Typography,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import { isObjectEmpty } from "../../assets/utils";
import AuthLogo from "./AuthLogo";
import useStyles from "./styles";
import axios from "axios";
import { login } from "../../redux/actionCreators";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";

const Auth = () => {
  const classes = useStyles();

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [loading, setLoading] = useState(false);
  const [isSignupForm, setIsSignupForm] = useState(false);

  const [accountType, setAccountType] = useState("Job Seeker");
  const [companyName, setCompanyName] = useState("");
  const [sector, setSector] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [nid, setNid] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [repeatPassword, setRepeatPassword] = useState("");

  const [serverResponse, setServerResponse] = useState({});

  const submitHandler = async (e) => {
    e.preventDefault();
    if (isSignupForm) await registerHandler();
    else await loginHandler();
  };

  const setTokenOnStorage = (data) => {
    localStorage.setItem("joblookupLoginToken", data.token);
  };

  const loginHandler = async () => {
    setLoading(true);
    const formData = { email, password };
    try {
      const response = await axios.post(
        "http://localhost:2900/api/auth/login",
        formData
      );
      const data = await response.data;
      setLoading(false);
      setServerResponse(data);
      setTokenOnStorage(data);
      dispatch(login(data.user));
      navigate(`/profile/${data.user.id}`);
    } catch (error) {
      if (error.response) {
        const errorData = error.response.data;
        setServerResponse(errorData);
        console.log(serverResponse);
      } else if (error.request) {
        const failedResponse = {
          success: false,
          error: { server: "No response from the server. Status Code: 500" },
        };
        setServerResponse(failedResponse);
      }
      setLoading(false);
      console.log(serverResponse);
    }
  };

  const registerHandler = async () => {
    setLoading(true);

    const formData = {
      accountType,
      companyName,
      sector,
      firstName,
      lastName,
      nid,
      email,
      password,
      repeatPassword,
    };

    try {
      const response = await axios.post(
        "http://localhost:2900/api/auth/signup",
        formData
      );
      const data = await response.data;
      setLoading(false);
      setServerResponse(data);
      setIsSignupForm(false);
    } catch (error) {
      if (error.response) {
        const errorData = error.response.data;
        setServerResponse(errorData);
      } else if (error.request) {
        const failedResponse = {
          success: false,
          error: { server: "No response from the server. Status Code: 500" },
        };
        setServerResponse(failedResponse);
      }
      setLoading(false);
    }
  };

  const clearFields = () => {
    setServerResponse({});
    setCompanyName("");
    setSector("");
    setFirstName("");
    setLastName("");
    setNid("");
    setEmail("");
    setPassword("");
    setRepeatPassword("");
  };

  useEffect(() => {
    clearFields();
    setServerResponse({});
  }, [isSignupForm, accountType]);

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
            color={
              serverResponse?.error?.server
                ? "error"
                : serverResponse?.error?.credentials
                ? "error"
                : "secondary"
            }
          >
            {serverResponse?.error?.server
              ? serverResponse.error.server
              : serverResponse?.error?.credentials
              ? serverResponse.error.credentials
              : isSignupForm
              ? "Complete the details to create an account."
              : "Login to continue."}
          </Typography>
          <form
            onSubmit={submitHandler}
            className={classes.form}
            autoComplete="off"
            noValidate
          >
            <TextField
              className={classes.formControl}
              select
              required
              label="Account Type"
              margin="dense"
              sx={{
                display: isSignupForm ? "inline-flex" : "none",
              }}
              value={accountType}
              onChange={(e) => setAccountType(e.target.value)}
              error={
                !isObjectEmpty(serverResponse)
                  ? serverResponse.error?.accountType
                    ? true
                    : false
                  : false
              }
              helperText={serverResponse?.error?.accountType}
            >
              <MenuItem value="Job Seeker">Job Seeker</MenuItem>
              <MenuItem value="Employer">Employer</MenuItem>
            </TextField>

            <TextField
              className={classes.formControl}
              label="Company Name"
              type="text"
              required
              margin="dense"
              fullWidth
              sx={{
                display:
                  isSignupForm && accountType === "Employer"
                    ? "inline-flex"
                    : "none",
              }}
              value={companyName}
              onChange={(e) => setCompanyName(e.target.value)}
              error={
                !isObjectEmpty(serverResponse)
                  ? serverResponse.error?.companyName
                    ? true
                    : false
                  : false
              }
              helperText={serverResponse?.error?.companyName}
            />

            <TextField
              className={classes.formControl}
              select
              required
              label="Sector"
              margin="dense"
              sx={{
                display:
                  isSignupForm && accountType === "Employer"
                    ? "inline-flex"
                    : "none",
              }}
              value={sector}
              onChange={(e) => setSector(e.target.value)}
              error={
                !isObjectEmpty(serverResponse)
                  ? serverResponse.error?.sector
                    ? true
                    : false
                  : false
              }
              helperText={serverResponse?.error?.sector}
            >
              <MenuItem value="Government">Government</MenuItem>
              <MenuItem value="Private">Private</MenuItem>
            </TextField>

            <TextField
              className={classes.formControl}
              label="First Name"
              type="text"
              required
              margin="dense"
              fullWidth
              sx={{
                display:
                  isSignupForm && accountType === "Job Seeker"
                    ? "inline-flex"
                    : "none",
              }}
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
              error={
                !isObjectEmpty(serverResponse)
                  ? serverResponse.error?.firstName
                    ? true
                    : false
                  : false
              }
              helperText={serverResponse?.error?.firstName}
            />

            <TextField
              className={classes.formControl}
              label="Last Name"
              type="text"
              required
              margin="dense"
              fullWidth
              sx={{
                display:
                  isSignupForm && accountType === "Job Seeker"
                    ? "inline-flex"
                    : "none",
              }}
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
              error={
                !isObjectEmpty(serverResponse)
                  ? serverResponse.error?.lastName
                    ? true
                    : false
                  : false
              }
              helperText={serverResponse?.error?.lastName}
            />

            <TextField
              className={classes.formControl}
              label="NID"
              type="text"
              required
              margin="dense"
              fullWidth
              sx={{
                display:
                  isSignupForm && accountType === "Job Seeker"
                    ? "inline-flex"
                    : "none",
              }}
              value={nid}
              onChange={(e) => setNid(e.target.value)}
              error={
                !isObjectEmpty(serverResponse)
                  ? serverResponse.error?.nid
                    ? true
                    : false
                  : false
              }
              helperText={serverResponse?.error?.nid}
            />

            <TextField
              className={classes.formControl}
              label="Email Address"
              type="email"
              required
              margin="dense"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              error={
                !isObjectEmpty(serverResponse)
                  ? serverResponse.error?.email
                    ? true
                    : false
                  : false
              }
              helperText={serverResponse?.error?.email}
            />

            <TextField
              className={classes.formControl}
              required
              margin="dense"
              label="Password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              error={
                !isObjectEmpty(serverResponse)
                  ? serverResponse.error?.password
                    ? true
                    : false
                  : false
              }
              helperText={serverResponse?.error?.password}
            />
            <TextField
              className={classes.formControl}
              required
              margin="dense"
              label="Repeat Password"
              type="password"
              sx={{ display: isSignupForm ? "flex" : "none" }}
              value={repeatPassword}
              onChange={(e) => setRepeatPassword(e.target.value)}
              error={
                !isObjectEmpty(serverResponse)
                  ? serverResponse.error?.repeatPassword
                    ? true
                    : false
                  : false
              }
              helperText={serverResponse?.error?.repeatPassword}
            />
            <Button
              type="submit"
              variant="contained"
              size="large"
              className={classes.submitButton}
              disableElevation
              endIcon={
                <CircularProgress
                  size={20}
                  sx={{ color: "white", opacity: loading ? 1 : 0 }}
                />
              }
            >
              {isSignupForm ? "Register" : "Login"}
            </Button>
            <Divider textAlign="left" sx={{ mb: 1 }}>
              <Typography variant="body2">OR</Typography>
            </Divider>
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
            <Typography
              variant="caption"
              sx={{ display: isSignupForm ? "none" : "block" }}
            >
              Forgot password?{" "}
              <Link onClick={() => navigate("/auth/forgotPassword")}>
                Click here to reset.
              </Link>
            </Typography>
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

export default Auth;
