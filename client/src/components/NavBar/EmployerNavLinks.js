import React from "react";
import { Link, Stack, Divider } from "@mui/material";
import clsx from "clsx";
import useStyles from "./styles";
import { useSelector } from "react-redux";

const EmployerNavLinks = () => {
  const classes = useStyles();

  const state = useSelector((state) => state);

  const gotoProfile = () => {
    console.log("redux state", state);
  };

  return (
    <Stack direction="row" className={classes.navlinks}>
      <Link
        underline="none"
        className={clsx(classes.navlink, classes.navlinkSpecial)}
      >
        Post a Job
      </Link>
      <Divider orientation="vertical" />
      <Link underline="none" className={classes.navlink} onClick={gotoProfile}>
        Profile
      </Link>
      <Link underline="none" className={classes.navlink}>
        Logout
      </Link>
    </Stack>
  );
};

export default EmployerNavLinks;
