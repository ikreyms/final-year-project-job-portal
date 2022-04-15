import { Grid, Typography } from "@mui/material";
import React from "react";

const ExperiencePreview = ({ experience }) => {
  return (
    <Grid container alignItems="center">
      <Grid item sx={{ width: 80 }}>
        <Typography variant="body2">
          {experience.from}-{experience.to}
        </Typography>
      </Grid>
      <Grid item>
        <Typography variant="body2" fontWeight="400">
          {experience.jobTitle}, {experience.employer}
        </Typography>
      </Grid>
    </Grid>
  );
};

export default ExperiencePreview;
