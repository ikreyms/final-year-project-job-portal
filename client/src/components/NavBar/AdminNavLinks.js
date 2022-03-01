import React from "react";
import { Link, Stack } from "@mui/material";
import useStyles from "./styles";
import { useSelector } from "react-redux";

const AdminNavLinks = () => {
  const classes = useStyles();

  const state = useSelector((state) => state);

  const gotoProfile = () => {
    console.log("redux state", state);
  };

  return (
    <Stack direction="row" className={classes.navlinks}>
      <Link underline="none" className={classes.navlink} onClick={gotoProfile}>
        Profile
      </Link>
      <Link underline="none" className={classes.navlink}>
        Logout
      </Link>
    </Stack>
  );
};

export default AdminNavLinks;
