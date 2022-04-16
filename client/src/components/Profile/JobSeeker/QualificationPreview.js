import { Grid, Typography } from "@mui/material";
import moment from "moment";
import React, { useEffect, useState } from "react";

const QualificationPreview = ({ qualification }) => {
  const [completedOnString, setCompletedOnString] = useState("");

  useEffect(() => {
    setCompletedOnString(moment(qualification.completedOn).format("YYYY"));
  }, []);

  return (
    <Grid container alignItems="center">
      <Grid item sx={{ width: 80 }}>
        <Typography variant="body2">{completedOnString}</Typography>
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
