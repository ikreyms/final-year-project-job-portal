import { Button, Stack, Typography } from "@mui/material";
import React from "react";

const NotificationActions = ({ selection }) => {
  return (
    <Stack direction="row" justifyContent="space-between" alignItems="center">
      <Typography variant="caption" mt={0.1}>
        Selected: {selection.length}
      </Typography>
      <Stack direction="row" spacing={1}>
        <Button size="small" disableElevation>
          Mark As Read
        </Button>
        <Button size="small" disableElevation>
          Mark As Unread
        </Button>
      </Stack>
    </Stack>
  );
};

export default NotificationActions;
