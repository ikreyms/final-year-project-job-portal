import { Box, Button, Container, Typography } from "@mui/material";
import React from "react";
import useStyles from "./styles";
import PostAddIcon from "@mui/icons-material/PostAdd";
import ManageIcon from "@mui/icons-material/Tune";
import NotifyIcon from "@mui/icons-material/NotificationsNone";
import clsx from "clsx";
import { useNavigate } from "react-router-dom";

const SectionTwo = () => {
  const classes = useStyles();
  const navigate = useNavigate();
  return (
    <Box className={classes.section}>
      <Box className={clsx(classes.box, classes.box1)}></Box>
      <Box className={clsx(classes.box, classes.box2)}></Box>
      <Container className={classes.container}>
        <Box className={classes.containerBox} pr={2}>
          <Box className={classes.content}>
            <Typography variant="h2" color="secondary" fontWeight="bold">
              Hiring process made easy.
            </Typography>
            <Typography variant="subtitle1" mt={2} mb={3}>
              We offer specialized features for employers to ease the
              recruitment process.
            </Typography>
            <Button
              variant="contained"
              disableElevation
              className={classes.button}
              onClick={() => navigate("/auth")}
            >
              Create Employer Account
            </Button>
          </Box>
        </Box>
        <Box className={clsx(classes.containerBox, classes.hideContainerBox)}>
          <Box className={clsx(classes.content, classes.contentPadding)}>
            <Box className={classes.feature}>
              <PostAddIcon className={classes.contentIcon} fontSize="large" />
              <Box className={classes.featureDetails}>
                <Typography variant="h6">Post Jobs</Typography>
                <Typography variant="subtitle2" fontWeight="regular">
                  Post about vacant positions at your company for job seekers to
                  view and apply.
                </Typography>
              </Box>
            </Box>
            <Box className={classes.feature}>
              <ManageIcon className={classes.contentIcon} fontSize="large" />
              <Box className={classes.featureDetails}>
                <Typography variant="h6">Manage Job Applications</Typography>
                <Typography variant="subtitle2" fontWeight="regular">
                  Receive and filter job applications and choose the most
                  suitable candidates for interview.
                </Typography>
              </Box>
            </Box>
            <Box className={classes.feature}>
              <NotifyIcon className={classes.contentIcon} fontSize="large" />
              <Box className={classes.featureDetails}>
                <Typography variant="h6">Notify Applicants</Typography>
                <Typography variant="subtitle2" fontWeight="regular">
                  Notify applicants about interview timings and rejected
                  applications.
                </Typography>
              </Box>
            </Box>
          </Box>
        </Box>
      </Container>
    </Box>
  );
};

export default SectionTwo;
