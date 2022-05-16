import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Box,
  Checkbox,
  Divider,
  Stack,
  Typography,
} from "@mui/material";
import React, { useEffect, useRef, useState } from "react";
import useStyles from "../styles";
import axios from "axios";
import { useSelector } from "react-redux";
import { useTheme } from "@mui/system";
import moment from "moment";
import NotificationPreview from "./NotificationPreview";
import NotificationActions from "./NotificationActions";

const NotificationPanel = () => {
  const classes = useStyles();

  const seekerId = useSelector((state) => state?.user.id);

  const [notifications, setNotifications] = useState([]);

  const [selection, setSelection] = useState([]);

  const getNotifications = async () => {
    try {
      const response = await axios.get(
        `http://localhost:2900/api/notifications/${seekerId}`
      );
      setNotifications(response.data.notifications);
      console.log(response.data);
    } catch (error) {
      console.log(error.response);
    }
  };

  useEffect(() => {
    getNotifications();
  }, []);

  const theme = useTheme();
  console.log(theme);
  return (
    <Box className={classes.panelWrapper}>
      <Typography variant="h5" mb={2}>
        Notifications
      </Typography>

      {selection.length > 0 && <NotificationActions selection={selection} />}

      <Divider sx={{ mt: 1, mb: 3 }} />

      {notifications.length > 0
        ? notifications.map((notification) => (
            <NotificationPreview
              key={notification._id}
              notification={notification}
              notifications={notifications}
              selection={selection}
              setSelection={setSelection}
            />
          ))
        : "You have no notifications."}
    </Box>
  );
};

export default NotificationPanel;
