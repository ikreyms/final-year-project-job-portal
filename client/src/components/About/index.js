import { Box } from "@mui/material";
import React from "react";
import useStyles from "./styles";

const About = () => {
  const classes = useStyles();
  return <Box className={classes.container}>About</Box>;
};

export default About;
