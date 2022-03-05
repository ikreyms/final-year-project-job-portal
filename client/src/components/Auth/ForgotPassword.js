import {
  Box,
  Button,
  TextField,
  Typography,
  CircularProgress,
} from "@mui/material";
import { useRef, useState } from "react";
import useStyles from "./styles";
import axios from "axios";

const ForgotPassword = () => {
  const classes = useStyles();

  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);

  const [btnDisabled, setBtnDisabled] = useState(false);
  const [btnText, setBtnText] = useState("Send Mail");

  const [validationText, setValidationText] = useState("");

  const responseText = useRef();

  const submitHandler = async (e) => {
    e.preventDefault();
    setLoading(true);
    responseText.current.style.display = "none";
    if (email === "") {
      setValidationText("Enter a valid Email address.");
      setLoading(false);
      return;
    }
    setValidationText("");
    try {
      const response = await axios.post(
        "http://localhost:2900/api/auth/forgotPassword",
        { email }
      );
      console.log(response);
      responseText.current.style.display = "block";
      responseText.current.innerText = response.data.message;
      setBtnText("Mail Sent");
      setBtnDisabled(true);
      setEmail("");
      setLoading(false);
    } catch (error) {
      setLoading(false);
      console.log(error.response);
      responseText.current.style.display = "block";
      responseText.current.innerText = error.response.data.error;
    }
  };

  return (
    <Box className={classes.container}>
      <form className={classes.resetForm} onSubmit={submitHandler} noValidate>
        <Typography variant="h6">Provide your Email address.</Typography>
        <Typography variant="caption" mb={2} paragraph>
          Please provide the email address that was used to register your
          account. We will be sending a link to that email address for resetting
          the password.
        </Typography>
        <TextField
          autoComplete="off"
          className={classes.formControl}
          label="Email Address"
          type="email"
          required
          margin="dense"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          error={validationText === "" ? false : true}
          helperText={validationText}
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
        <Typography
          variant="subtitle2"
          mt={2}
          ref={responseText}
          sx={{ display: "none" }}
        ></Typography>
      </form>
    </Box>
  );
};

export default ForgotPassword;
