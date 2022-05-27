import { Typography } from "@mui/material";
import React from "react";

const Intro = () => {
  return (
    <>
      <Typography variant="h2" color="secondary" fontWeight="bold" mt={3}>
        Find the right job for you.
      </Typography>
      <Typography variant="subtitle1" mt={1}>
        Explore our vast catalogue of jobs posted by employers registered with
        us. Filter the jobs and apply to the jobs you prefer with convenience.
      </Typography>
    </>
  );
};

export default Intro;
