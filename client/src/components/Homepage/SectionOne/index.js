import { Box, Button, Typography } from "@mui/material";
import React from "react";
import useStyles from "./styles";
import sectionOneImg from "../../../assets/sectionOneImg.jpg";
import { useNavigate } from "react-router-dom";

const SectionOne = () => {
  const classes = useStyles();
  const navigate = useNavigate();
  return (
    <Box className={classes.section}>
      <Box className={classes.boxContainer}>
        <Box className={classes.sectionBox}>
          <Box className={classes.boxContent}>
            <Typography variant="h2" color="secondary" fontWeight="bold">
              Find the job that's right for you.
            </Typography>
            <Typography variant="subtitle1" mt={2}>
              Explore the most up-to-date job board in the Maldives.
            </Typography>
            {/* // need better text here */}
            <Box className={classes.buttonWrapper}>
              <Button
                variant="contained"
                disableElevation
                className={classes.button}
                onClick={() => navigate("/jobs")}
              >
                Explore Jobs
              </Button>
              <Button variant="outlined" onClick={() => navigate("/employers")}>
                View Employers
              </Button>
            </Box>
          </Box>
        </Box>
        <img src={sectionOneImg} alt="img" className={classes.sectionBoxImg} />
      </Box>
    </Box>
  );
};

export default SectionOne;
