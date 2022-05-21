import {
  Box,
  Button,
  CircularProgress,
  Link,
  TextField,
  Typography,
} from "@mui/material";
import { useState } from "react";
import useStyles from "./styles";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";

const ForgotPassword = () => {
  const classes = useStyles();

  const navigate = useNavigate();

  const [password, setPassword] = useState("");
  const [repeatPassword, setRepeatPassword] = useState("");

  const [loading, setLoading] = useState(false);

  const [btnDisabled, setBtnDisabled] = useState(false);
  const [btnText, setBtnText] = useState("Reset Password");

  const [serverResponse, setServerResponse] = useState({});

  const params = useParams();

  const submitHandler = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const { resetToken } = params;
      const response = await axios.post(
        `http://localhost:2900/api/auth/resetPassword/${resetToken}`,
        { password, repeatPassword }
      );
      setServerResponse(response.data);
      setBtnDisabled(true);
      setBtnText("Password Reset Successful");
      setLoading(false);
      setPassword("");
      setRepeatPassword("");
      navigate("/auth");
    } catch (error) {
      console.log(error.response);
      setServerResponse(error.response.data);
      setLoading(false);
    }
  };

  return (
    <Box className={classes.container}>
      <form className={classes.resetForm} onSubmit={submitHandler} noValidate>
        <Typography variant="h6">Enter new password.</Typography>
        <Typography variant="caption" mb={2} paragraph>
          Please enter the new preferred password and repeat the password.
        </Typography>
        <TextField
          autoComplete="off"
          className={classes.formControl}
          label="New Password"
          type="password"
          required
          margin="dense"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          error={
            !serverResponse
              ? false
              : serverResponse?.error?.password
              ? true
              : false
          }
          helperText={serverResponse?.error?.password}
        />
        <TextField
          autoComplete="off"
          className={classes.formControl}
          label="Repeat Password"
          type="password"
          required
          margin="dense"
          value={repeatPassword}
          onChange={(e) => setRepeatPassword(e.target.value)}
          error={
            !serverResponse
              ? false
              : serverResponse?.error?.repeatPassword
              ? true
              : false
          }
          helperText={serverResponse?.error?.repeatPassword}
        />

        <Button
          disableElevation
          variant="contained"
          className={classes.resetButton}
          type="submit"
          disabled={btnDisabled}
          endIcon={
            <CircularProgress
              size={20}
              sx={{ color: "white", opacity: loading ? 1 : 0 }}
            />
          }
        >
          {btnText}
        </Button>
        <Box
          sx={{
            display: !serverResponse?.error?.resetToken ? "none" : "flex",
            gap: 1,
            alignItems: "center",
            mt: 2,
          }}
        >
          <Typography
            variant="subtitle2"
            sx={{
              color: "error.main",
            }}
          >
            {serverResponse?.error?.resetToken}
          </Typography>
          <Typography variant="subtitle2">
            Click here to{" "}
            <Link variant="subtitle2" href="/auth/forgotPassword">
              get new reset link.
            </Link>
          </Typography>
        </Box>
        <Typography
          variant="subtitle2"
          color="success"
          sx={{ display: serverResponse?.success === true ? "block" : "none" }}
        >
          Password reset successful. Go to{" "}
          <Link variant="subtitle2" href="/auth">
            login
          </Link>
        </Typography>
      </form>
    </Box>
  );
};

export default ForgotPassword;
