import { Grid, Typography } from "@mui/material";
import React from "react";

const WhyWorkWithUsPreview = ({ benefit, variant }) => {
  return (
    <Grid
      container
      alignItems="flex-start"
      flexDirection="column"
      sx={{ mb: 1 }}
    >
      <Grid item>
        <Typography variant={variant} sx={{ color: "primary.dark" }}>
          &#8226; {benefit.heading}
        </Typography>
      </Grid>
      <Grid item>
        <Typography variant={variant} fontWeight="400">
          {benefit.body}
        </Typography>
      </Grid>
    </Grid>
  );
};

export default WhyWorkWithUsPreview;
