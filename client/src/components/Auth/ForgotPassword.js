import { Box, Button, TextField, Typography } from "@mui/material";
import { useRef, useState } from "react";
import useStyles from "./styles";
import axios from "axios";

const ForgotPassword = () => {
  const classes = useStyles();

  const [email, setEmail] = useState("");
  const [validationError, setValidationError] = useState("");

  const responseText = useRef();

  const submitHandler = async (e) => {
    e.preventDefault();
    responseText.current.style.display = "none";
    if (email === "") {
      setValidationError("Enter a valid Email address.");
      return;
    }
    setValidationError("");
    try {
      const response = await axios.post(
        "http://localhost:2900/api/auth/forgotPassword",
        { email }
      );
      console.log(response);
      responseText.current.style.display = "block";
      responseText.current.innerText = response.data.message;
    } catch (error) {
      console.log(error.response);
      responseText.current.style.display = "block";
      responseText.current.innerText = error.response.data.error;
    }
  };

  return (
    <Box className={classes.container}>
      <form className={classes.resetForm} onSubmit={submitHandler} noValidate>
        <Typography variant="h6" mb={2}>
          Provide your email address to reset the password.
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
          error={validationError === "" ? false : true}
          helperText={validationError}
        />

        <Button
          disableElevation
          variant="contained"
          className={classes.resetButton}
          type="submit"
        >
          Reset Password
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
