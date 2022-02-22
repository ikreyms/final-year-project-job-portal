import { Box, Typography } from "@mui/material";
import React from "react";
import { useNavigate } from "react-router-dom";
import useStyles from "./styles";
import NumberFormat from "react-number-format";

const SectionThree = () => {
  const classes = useStyles();
  const navigate = useNavigate();
  return (
    <Box className={classes.section}>
      <Box className={classes.boxContainer}>
        <Box className={classes.box} onClick={() => navigate("/employers")}>
          <Box className={classes.content}>
            <Typography variant="h3" align="center" color="primary">
              <NumberFormat value={452} thousandSeparator displayType="text" />
            </Typography>
            <Typography
              variant="subtitle2"
              align="center"
              color="secondary"
              className={classes.text}
            >
              Registered Employers
            </Typography>
          </Box>
        </Box>
        <Box className={classes.box} onClick={() => navigate("/jobs")}>
          <Box className={classes.content}>
            <Typography variant="h3" align="center" color="primary">
              <NumberFormat value={9332} thousandSeparator displayType="text" />
            </Typography>
            <Typography
              variant="subtitle2"
              align="center"
              color="secondary"
              className={classes.text}
            >
              Jobs Posted
            </Typography>
          </Box>
        </Box>
        <Box className={classes.box}>
          <Box className={classes.content}>
            <Typography variant="h3" align="center" color="primary">
              <NumberFormat value={2923} thousandSeparator displayType="text" />
            </Typography>
            <Typography
              variant="subtitle2"
              align="center"
              color="secondary"
              className={classes.text}
            >
              Job Seekers
            </Typography>
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

export default SectionThree;
