import { Box, Typography } from "@mui/material";
import React from "react";
import useStyles from "./styles";

const StatPack = ({ stat, caption, color }) => {
  const classes = useStyles();

  return (
    <Box className={classes.statPack}>
      <Box className={classes.statCircle}>{stat}</Box>
      <Typography mt={1.8} variant="caption" color={color}>
        {caption}
      </Typography>
    </Box>
  );
};

export default StatPack;
