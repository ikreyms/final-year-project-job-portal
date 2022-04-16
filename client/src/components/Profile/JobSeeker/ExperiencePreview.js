import { Grid, Typography } from "@mui/material";
import moment from "moment";
import React, { useEffect, useState } from "react";

const ExperiencePreview = ({ experience }) => {
  const [fromDateString, setFromDateString] = useState("");
  const [toDateString, setToDateString] = useState("");

  useEffect(() => {
    setFromDateString(moment(experience.from).format("YYYY"));
    setToDateString(moment(experience.to).format("YYYY"));
  }, []);
  return (
    <Grid container alignItems="center">
      <Grid item sx={{ width: 80 }}>
        <Typography variant="body2">
          {fromDateString}-{toDateString}
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
