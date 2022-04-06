import { Link, Stack } from "@mui/material";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import useStyles from "./styles";
import { logout } from "../../redux/actionCreators";
import { useNavigate } from "react-router-dom";

const JobSeekerNavLinks = () => {
  const classes = useStyles();

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const profileId = useSelector((state) => state.user?.id);
  const state = useSelector((state) => state);

  const logoutUser = () => {
    dispatch(logout());
    navigate("/");
    localStorage.clear();
  };

  return (
    <Stack direction="row" className={classes.navlinks}>
      <Link
        underline="none"
        className={classes.navlink}
        onClick={() => {
          console.log(state);
          navigate(`profile/${profileId}`);
        }}
      >
        Profile
      </Link>
      <Link underline="none" className={classes.navlink} onClick={logoutUser}>
        Logout
      </Link>
    </Stack>
  );
};

export default JobSeekerNavLinks;
