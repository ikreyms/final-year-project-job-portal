import { Box } from "@mui/material";
import React from "react";
import { useParams } from "react-router-dom";
import useStyles from "./styles";

const Job = () => {
  const { id: jobId } = useParams();
  const classes = useStyles();
  return (
    <Box className={classes.section}>
      <Box className={classes.container}>{jobId}</Box>
    </Box>
  );
};

export default Job;
