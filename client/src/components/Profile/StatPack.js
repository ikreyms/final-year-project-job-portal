import { Box, Typography } from "@mui/material";
import React from "react";
import NumberFormat from "react-number-format";
import useStyles from "./styles";

const StatPack = ({ stat, caption, color }) => {
  const classes = useStyles();

  return (
    <Box className={classes.statPack}>
      <Box className={classes.statCircle}>
        <Typography variant="h6">
          <NumberFormat value={stat} thousandSeparator displayType="text" />
        </Typography>
      </Box>
      <Typography
        mt={1.8}
        variant="caption"
        sx={{ fontWeight: 500 }}
        color={color}
      >
        {caption}
      </Typography>
    </Box>
  );
};

export default StatPack;
