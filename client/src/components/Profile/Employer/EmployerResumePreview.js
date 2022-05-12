import { Grid, Stack, Typography } from "@mui/material";
import moment from "moment";
import React from "react";
import useStyles from "../styles";

const EmployerResumePreview = ({ seekerId }) => {
  const classes = useStyles();
  return (
    <>
      <Typography variant="h6" color="primary">
        Resume
      </Typography>
      {seekerId.about && (
        <>
          <Typography
            className={classes.resumeHeadings}
            color="primary"
            mt={2}
            mb={1}
          >
            Intro
          </Typography>
          <Typography variant="subtitle2" fontWeight={400}>
            {seekerId.about}
          </Typography>
        </>
      )}
      <Typography
        className={classes.resumeHeadings}
        color="primary"
        mt={2}
        mb={1}
      >
        Basic Information
      </Typography>
      <Grid
        container
        spacing={{ z: 1 }}
        columns={{ z: 1, xs: 4 }}
        sx={{ flexGrow: 1 }}
      >
        <Grid item xxs={1} xs={2}>
          <Stack direction="row" spacing={1}>
            <Typography variant="subtitle2">Full Name:</Typography>
            <Typography variant="subtitle2" fontWeight={400}>
              {seekerId.firstName} {seekerId.lastName}
            </Typography>
          </Stack>
        </Grid>
        <Grid item xxs={1} xs={2}>
          <Stack direction="row" spacing={1}>
            <Typography variant="subtitle2">NID:</Typography>
            <Typography variant="subtitle2" fontWeight={400}>
              {seekerId.nid}
            </Typography>
          </Stack>
        </Grid>
        <Grid item xxs={1} xs={2}>
          <Stack direction="row" spacing={1}>
            <Typography variant="subtitle2">DOB:</Typography>
            <Typography variant="subtitle2" fontWeight={400}>
              {moment(seekerId.dob).format("DD/MM/YYYY")}
            </Typography>
          </Stack>
        </Grid>
        <Grid item xxs={1} xs={2}>
          <Stack direction="row" spacing={1}>
            <Typography variant="subtitle2">Gender:</Typography>
            <Typography variant="subtitle2" fontWeight={400}>
              {seekerId.gender}
            </Typography>
          </Stack>
        </Grid>
        <Grid item xxs={1} xs={2}>
          <Stack direction="row" spacing={1}>
            <Typography variant="subtitle2">Marital Status:</Typography>
            <Typography variant="subtitle2" fontWeight={400}>
              {seekerId.maritalStatus}
            </Typography>
          </Stack>
        </Grid>
        <Grid item xxs={1} xs={2}>
          <Stack direction="row" spacing={1}>
            <Typography variant="subtitle2">Contact Number:</Typography>
            <Typography variant="subtitle2" fontWeight={400}>
              {seekerId.contact}
            </Typography>
          </Stack>
        </Grid>
        <Grid item xxs={1} xs={2}>
          <Stack direction="row" spacing={1}>
            <Typography variant="subtitle2">Email:</Typography>
            <Typography variant="subtitle2" fontWeight={400}>
              {seekerId.email}
            </Typography>
          </Stack>
        </Grid>
      </Grid>
      {seekerId.qualifications?.length > 0 && (
        <>
          <Typography
            className={classes.resumeHeadings}
            color="primary"
            mt={2}
            mb={1}
          >
            Qualifications
          </Typography>
          {seekerId.qualifications.map((qualification, index) => (
            <Grid container alignItems="center" key={index}>
              <Grid item flexBasis={80}>
                <Typography variant="subtitle2" fontWeight={400}>
                  {moment(qualification.completedOn).format("YYYY")}
                </Typography>
              </Grid>
              <Grid item>
                <Typography variant="subtitle2">
                  {qualification.courseName}, {qualification.institute}
                </Typography>
              </Grid>
            </Grid>
          ))}
        </>
      )}

      {seekerId.experiences?.length > 0 && (
        <>
          <Typography
            className={classes.resumeHeadings}
            color="primary"
            mt={2}
            mb={1}
          >
            Experience
          </Typography>
          {seekerId.experiences.map((experience, index) => (
            <Grid container alignItems="center" key={index}>
              <Grid item flexBasis={80}>
                <Typography variant="subtitle2" fontWeight={400}>
                  {moment(experience.from).format("YYYY")}-
                  {moment(experience.to).format("YYYY")}
                </Typography>
              </Grid>
              <Grid item>
                <Typography variant="subtitle2">
                  {experience.jobTitle}, {experience.employer}
                </Typography>
              </Grid>
            </Grid>
          ))}
        </>
      )}

      {seekerId.skills?.length > 0 && (
        <>
          <Typography
            className={classes.resumeHeadings}
            color="primary"
            mt={2}
            mb={1}
          >
            Skills
          </Typography>
          {seekerId.skills.map((skill, index) => (
            <Typography variant="subtitle2" fontWeight={400} key={index}>
              &#8226; {skill.name}
            </Typography>
          ))}
        </>
      )}
    </>
  );
};

export default EmployerResumePreview;
