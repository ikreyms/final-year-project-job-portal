import { Box, Divider, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import useStyles from "../styles";
import axios from "axios";
import { useSelector } from "react-redux";
import NotificationPreview from "./NotificationPreview";
import NotificationActions from "./NotificationActions";

const NotificationsAdmin = () => {
  const classes = useStyles();

  const seekerId = useSelector((state) => state?.user.id);

  const [notifications, setNotifications] = useState([]);

  const [selection, setSelection] = useState([]);

  const [clearPressed, setClearPressed] = useState(false);

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

  return (
    <Box className={classes.panelWrapper}>
      <Typography variant="h5">
        Notifications ({notifications?.length})
      </Typography>

      <NotificationActions
        selection={selection}
        setSelection={setSelection}
        notifications={notifications}
        getNotifications={getNotifications}
        clearPressed={clearPressed}
        setClearPressed={setClearPressed}
      />

      <Divider sx={{ mt: 1, mb: 3 }} />

      {notifications.length > 0
        ? notifications.map((notification, i) => (
            <NotificationPreview
              key={notification._id}
              notification={notification}
              notifications={notifications}
              selection={selection}
              setSelection={setSelection}
              getNotifications={getNotifications}
              clearPressed={clearPressed}
            />
          ))
        : "You have no notifications."}
    </Box>
  );
};

export default NotificationsAdmin;
