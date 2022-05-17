import React, { useEffect, useRef, useState } from "react";
import {
  Avatar,
  Box,
  Button,
  Chip,
  Link,
  Rating,
  Stack,
  Typography,
  Snackbar,
} from "@mui/material";
import SectorIcon from "@mui/icons-material/DonutSmall";
import FollowersIcon from "@mui/icons-material/Loyalty";
import RatingIcon from "@mui/icons-material/Star";
import LocationIcon from "@mui/icons-material/LocationOn";
import MailIcon from "@mui/icons-material/Mail";
import PhoneIcon from "@mui/icons-material/Phone";
import logo from "../../assets/logo.svg";
import useStyles, { primaryBtnSxProps, secondaryBtnSxProps } from "./styles";
import { useSelector } from "react-redux";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Header = ({ employer, loggedIn, userType }) => {
  const classes = useStyles();

  const navigate = useNavigate();

  const userId = useSelector((state) => state.user.id);
  const accountType = useSelector((state) => state.user.accountType);

  const [following, setFollowing] = useState(false);

  const [rated, setRated] = useState(false);
  const [ratedValue, setRatedValue] = useState(0);

  const [snackbarOpen, setSnackbarOpen] = useState(false);

  const pleaseLoginText = useRef();
  const ratingForm = useRef();

  const followActionHandler = async () => {
    if (!loggedIn) {
      pleaseLoginText.current.style.display = "block";
    } else if (userType === "Job Seeker") {
      setFollowing(!following);
      if (!following) await followEmployer();
      else await unfollowEmployer();
    }
  };

  const followEmployer = async () => {
    try {
      const response = await axios.patch(
        `http://localhost:2900/api/users/follow/${userId}/${employer.id}`
      );
      console.log(response);
    } catch (error) {
      console.log(error.response);
    }
  };

  const unfollowEmployer = async () => {
    try {
      const response = await axios.patch(
        `http://localhost:2900/api/users/unfollow/${userId}/${employer.id}`
      );
      console.log(response);
    } catch (error) {
      console.log(error.response);
    }
  };

  const addRatingActionHandler = () => {
    if (!loggedIn) {
      pleaseLoginText.current.style.display = "block";
    } else if (userType === "Job Seeker") {
      ratingForm.current.style.display = "flex";
    }
  };

  const getUserRatingsAndFollowing = async () => {
    try {
      const response = await axios.get(
        `http://localhost:2900/api/users/${userId}/getUserRatingsAndFollowing`
      );
      const data = await response.data;
      const followingList = data.following;
      const ratingsList = data.ratings;

      for (const index in followingList) {
        setFollowing(false);
        if (followingList[index]._id === employer._id) {
          setFollowing(true);
          break;
        }
      }

      for (const index in ratingsList) {
        setRated(false);
        if (ratingsList[index]._id === employer._id) {
          setRated(true);
          const value = Number(ratingsList[index].value);
          setRatedValue(value);
          break;
        }
      }
    } catch (error) {
      console.log(error.respone);
    }
  };

  const rateEmployer = async () => {
    if (ratedValue === null && typeof ratedValue === "object") setRatedValue(0);

    try {
      const response = await axios.patch(
        `http://localhost:2900/api/users/rate/${userId}/${employer._id}/${ratedValue}`
      );
      console.log(response.data);
    } catch (error) {
      console.log(error.response);
    }
  };

  const removeEmployer = async () => {
    try {
      const response = await axios.delete(
        `http://localhost:2900/api/employers/${employer._id}`
      );
      console.log(response.data);
      navigate("/employers");
    } catch (error) {
      console.log(error.response);
    }
  };

  useEffect(() => {
    if (loggedIn) {
      getUserRatingsAndFollowing();
    }
  }, []);

  useEffect(() => {
    rateEmployer();
  }, [ratedValue]);

  return (
    <Box className={classes.header}>
      <Box className={classes.headerContainer}>
        <Box className={classes.mainContent}>
          <Box className={classes.headerContent}>
            <img
              alt="Employer logo"
              src={!employer.image ? logo : employer.image}
              className={classes.logo}
            />
            <Box className={classes.mainInfo} sx={{ flexGrow: 1 }}>
              <Stack direction="row" alignItems="center" spacing={1}>
                <Typography variant="h6" color="white">
                  {employer.companyName}
                </Typography>
                <Chip
                  label={employer.openings === 1 ? "Opening" : "Openings"}
                  color={employer.openings === 0 ? "error" : "success"}
                  size="small"
                  avatar={
                    <Avatar
                      sx={
                        employer.openings === 0
                          ? {
                              bgcolor: "error.dark",
                              color: "white !important",
                              fontWeight: "bold",
                            }
                          : {
                              bgcolor: "success.dark",
                              color: "white !important",
                              fontWeight: "bold",
                            }
                      }
                    >
                      {employer.openings}
                    </Avatar>
                  }
                />
              </Stack>
              <Stack direction="row" alignItems="center" spacing={2}>
                <Stack direction="row" alignItems="center" spacing={0.5}>
                  <SectorIcon fontSize="small" sx={{ color: "white" }} />
                  <Typography
                    variant="subtitle1"
                    color="white"
                    fontWeight={300}
                  >
                    {employer.sector}
                  </Typography>
                </Stack>
                <Stack direction="row" alignItems="center" spacing={0.5}>
                  <FollowersIcon fontSize="small" sx={{ color: "white" }} />
                  <Typography
                    variant="subtitle1"
                    color="white"
                    fontWeight={300}
                  >
                    {`${employer.followers} ${
                      employer.followers === 1 ? "Follower" : "Followers"
                    }`}
                  </Typography>
                </Stack>
                <Stack direction="row" alignItems="center" spacing={0.5}>
                  <RatingIcon fontSize="small" sx={{ color: "white" }} />
                  <Typography
                    variant="subtitle1"
                    color="white"
                    fontWeight={300}
                  >
                    {employer.rating.toFixed(1)}
                  </Typography>
                </Stack>
              </Stack>
            </Box>
          </Box>
          <Box>
            <Box className={classes.headerActions}>
              {accountType === "Admin" ? (
                <Button
                  size="small"
                  variant="contained"
                  disableElevation
                  // sx={primaryBtnSxProps}
                  color="error"
                  onClick={removeEmployer}
                >
                  Remove Employer
                </Button>
              ) : (
                <>
                  <Button
                    size="small"
                    variant="contained"
                    disableElevation
                    sx={primaryBtnSxProps}
                    onClick={followActionHandler}
                  >
                    {following ? "Following" : "Follow"}
                  </Button>
                  <Button
                    size="small"
                    variant="outlined"
                    sx={secondaryBtnSxProps}
                    onClick={addRatingActionHandler}
                  >
                    {/* {rated? ():("Add a Rating")} */}
                    {rated
                      ? `You rated ${ratedValue?.toFixed(1)}`
                      : "Add a Rating"}
                  </Button>
                </>
              )}
            </Box>
            <Typography
              variant="subtitle2"
              sx={{ color: "white", mt: 1, display: "none" }}
              ref={pleaseLoginText}
            >
              Please{" "}
              <Link href="/auth" sx={{ color: "white", cursor: "pointer" }}>
                login
              </Link>{" "}
              to follow and rate employers.
            </Typography>

            <Box className={classes.ratingForm} ref={ratingForm}>
              <Rating
                value={ratedValue}
                size="medium"
                precision={0.5}
                sx={{ width: 120, mt: 1 }}
                onChange={(e, value) => {
                  setRated(true);
                  setSnackbarOpen(true);
                  setRatedValue(value);
                }}
              />
            </Box>
            <Snackbar
              open={snackbarOpen}
              autoHideDuration={3000}
              message="Ratings updated."
              onClose={(e, reason) => {
                if (reason === "clickaway") {
                  return;
                }
                setSnackbarOpen(false);
              }}
              sx={{ m: 2 }}
            />
          </Box>
        </Box>
        <Box className={classes.contactInfo}>
          <Stack
            direction="row"
            spacing={0.9}
            alignItems="center"
            className={classes.contactStack}
          >
            <Typography
              variant="subtitle2"
              fontWeight={300}
              sx={{ color: "white", cursor: "pointer" }}
            >
              {employer.location ? employer.location : "N/A"}
            </Typography>
            <LocationIcon
              fontSize="0.3rem"
              sx={{ color: "white" }}
              className={classes.contactStackIcon}
            />
          </Stack>
          <Stack
            direction="row"
            spacing={0.9}
            alignItems="center"
            className={classes.contactStack}
          >
            <Typography
              variant="subtitle2"
              fontWeight={300}
              sx={{ color: "white", cursor: "pointer" }}
            >
              {employer.email}
            </Typography>
            <MailIcon
              fontSize="0.3rem"
              sx={{ color: "white" }}
              className={classes.contactStackIcon}
            />
          </Stack>
          <Stack
            direction="row"
            spacing={0.9}
            alignItems="center"
            className={classes.contactStack}
          >
            <Typography
              variant="subtitle2"
              fontWeight={300}
              sx={{ color: "white", cursor: "pointer" }}
            >
              {employer.contact ? employer.contact : "N/A"}
            </Typography>
            <PhoneIcon
              fontSize="0.3rem"
              sx={{ color: "white" }}
              className={classes.contactStackIcon}
            />
          </Stack>
        </Box>
      </Box>
    </Box>
  );
};

export default Header;
