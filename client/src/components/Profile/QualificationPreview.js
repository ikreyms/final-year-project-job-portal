import { Grid, Typography } from "@mui/material";
import React from "react";

const QualificationPreview = ({ qualification }) => {
  return (
    <Grid container alignItems="center">
      <Grid item sx={{ width: 80 }}>
        <Typography variant="caption">{qualification.completedOn}</Typography>
      </Grid>
      <Grid item>
        <Typography variant="body2" fontWeight="400">
          {qualification.courseName}, {qualification.institute}
        </Typography>
      </Grid>
    </Grid>
  );
};

export default QualificationPreview;
