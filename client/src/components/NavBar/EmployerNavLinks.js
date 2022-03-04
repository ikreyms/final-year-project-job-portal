import React from "react";
import { Link, Stack, Divider } from "@mui/material";
import clsx from "clsx";
import useStyles from "./styles";
import { useSelector, useDispatch } from "react-redux";
import { logout } from "../../redux/actionCreators";
import { useNavigate } from "react-router-dom";

const EmployerNavLinks = () => {
  const classes = useStyles();

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const state = useSelector((state) => state);

  const gotoProfile = () => {
    console.log("redux state", state);
  };

  const logoutUser = () => {
    dispatch(logout());
    navigate("/");
    localStorage.clear();
    console.log("reduxstate on logout", state);
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
      <Link underline="none" className={classes.navlink} onClick={logoutUser}>
        Logout
      </Link>
    </Stack>
  );
};

export default EmployerNavLinks;
