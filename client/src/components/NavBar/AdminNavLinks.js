import React from "react";
import { Link, Stack } from "@mui/material";
import useStyles from "./styles";

const AdminNavLinks = () => {
  const classes = useStyles();
  return (
    <Stack direction="row" className={classes.navlinks}>
      <Link underline="none" className={classes.navlink}>
        Profile
      </Link>
      <Link underline="none" className={classes.navlink}>
        Logout
      </Link>
    </Stack>
  );
};

export default AdminNavLinks;
