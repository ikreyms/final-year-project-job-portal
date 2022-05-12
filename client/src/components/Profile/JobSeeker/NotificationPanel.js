import { Box, Divider, Typography } from "@mui/material";
import React from "react";
import useStyles from "../styles";

const NotificationPanel = () => {
  const classes = useStyles();

  const getNotifications = async () => {};
  return (
    <Box className={classes.panelWrapper}>
      <Typography variant="h5">Notifications</Typography>
      {/* <Typography variant="body1" mb={2}>
        The jobs you have applied recently are displayed here.
      </Typography> */}
      <Divider sx={{ mt: 1, mb: 3 }} />
    </Box>
  );
};

export default NotificationPanel;
