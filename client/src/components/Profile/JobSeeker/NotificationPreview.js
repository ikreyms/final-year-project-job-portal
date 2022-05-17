import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Checkbox,
  Stack,
  Typography,
} from "@mui/material";
import React, { useState, useEffect, useRef } from "react";
import moment from "moment";
import axios from "axios";

const NotificationPreview = ({
  notification,
  selection,
  setSelection,
  getNotifications,
  clearPressed,
}) => {
  const checkbox = useRef();

  const [selected, setSelected] = useState(false);

  const selectionChangeHandler = () => {
    setSelected(!selected);
    if (!selected) {
      let exists = false;
      for (const item in selection) {
        if (item === notification.id) {
          exists = true;
          break;
        }
      }
      if (exists === false) setSelection((prev) => [...prev, notification.id]);
    } else {
      const newSelection = selection.filter((item) => item !== notification.id);
      setSelection(newSelection);
    }
  };

  const changeStatus = async () => {
    try {
      const response = await axios.patch(
        `http://localhost:2900/api/notifications/${notification._id}/readOne`
      );
      console.log(response.data);
      getNotifications();
      setSelection([]);
    } catch (error) {
      console.log(error.response);
    }
  };

  useEffect(() => {
    setSelected(false);
  }, [notification.lastAttemptedChange, clearPressed]);

  return (
    <Stack direction="row" sx={{ justifyContent: "space-between" }}>
      <Checkbox
        ref={checkbox}
        checked={selected}
        sx={{ alignSelf: "flex-start", mt: 1.9, mr: 2 }}
        onChange={selectionChangeHandler}
      />
      <Accordion
        sx={{ width: 1, my: 0.5 }}
        square
        key={notification._id}
        // onClick={onNotificationClick}
        onClick={() => {
          if (notification.status !== "Read") return changeStatus();
        }}
      >
        <AccordionSummary>
          <Stack direction="row" justifyContent="space-between" width={1}>
            <Stack>
              <Typography
                variant="subtitle2"
                sx={{
                  color: notification.status === "Read" && "grey.600",
                }}
              >
                {notification.subject}
              </Typography>
              <Typography
                variant="caption"
                sx={{
                  color: notification.status === "Read" && "grey.500",
                }}
                // ref={notificationSummary}
              >
                {/* {notification.body.substring(0, 45)}... */}
                From: {notification?.postedBy?.companyName}
              </Typography>
            </Stack>
            <Typography
              variant="caption"
              sx={{
                color: notification.status === "Read" && "grey.500",
              }}
            >
              {moment(notification.createdAt).fromNow()}
            </Typography>
          </Stack>
        </AccordionSummary>
        <AccordionDetails sx={{ pt: 0 }}>
          <Typography variant="caption">{notification.body}</Typography>
          <br />
          <br />
          <Typography variant="caption">
            Notification Received @{" "}
            {moment(notification.createdAt).format("DD/MM/YYYY")} |{" "}
            {moment(notification.createdAt).format("HH:mm")} hrs
          </Typography>
        </AccordionDetails>
      </Accordion>
    </Stack>
  );
};

export default NotificationPreview;
