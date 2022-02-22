import { Box, Button, Typography } from "@mui/material";
import React from "react";
import { useNavigate } from "react-router-dom";
import useStyles from "./styles";

const SectionFour = () => {
  const classes = useStyles();
  const navigate = useNavigate();
  return (
    <Box className={classes.section}>
      <Box className={classes.container}>
        <Typography variant="subtitle1" align="center" color="white" mb={2}>
          Register now to get access to all the features!
        </Typography>
        <Button
          variant="contained"
          color="secondary"
          className={classes.button}
          fullWidth
          onClick={() => navigate("/auth")}
        >
          Register
        </Button>
      </Box>
    </Box>
  );
};

export default SectionFour;
