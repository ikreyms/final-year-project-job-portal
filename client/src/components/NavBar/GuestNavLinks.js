import React from "react";
import { Link, Stack } from "@mui/material";
import clsx from "clsx";
import useStyles from "./styles";

const GuestNavLinks = () => {
  const classes = useStyles();
  return (
    <Stack direction="row" className={classes.navlinks}>
      <Link
        href="/auth"
        underline="none"
        className={clsx(classes.navlink, classes.navlinkSpecial)}
      >
        Login
      </Link>
    </Stack>
  );
};

export default GuestNavLinks;
