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

const Header = ({ employer, loggedIn, userType }) => {
  const classes = useStyles();

  const userId = useSelector((state) => state.user.id);

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
      // need HTTP request to update user's rating values and employer ratings.
    }
  };

  const getUserRatingsAndFollowing = async () => {
    try {
      const response = await axios.get(
        `http://localhost:2900/api/users/${userId}/getUserRatingsAndFollowing`
      );
      const data = await response.data;
      const followingList = data.following;

      for (const index in followingList) {
        setFollowing(false);
        console.log("listName", followingList[index].companyName);
        console.log("employerName", employer.companyName);
        if (followingList[index].companyName === employer.companyName) {
          setFollowing(true);
          break;
        }
      }
    } catch (error) {
      console.log(error.respone);
    }
  };

  useEffect(() => {
    if (loggedIn) {
      getUserRatingsAndFollowing();
    }
  }, []);

  useEffect(() => {
    //HTTP request required here to update ratings of user and employer on ratedValue change <= prepare when doing backend
    //the function should basically check if its first rating or not;
    //if it is first rating the employer name would not be available in user ratings list
    //if first rating: update from employers update =>
    // "totalRatings","rating"
    // else update: "totalRatings" and "rating"
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
                {rated ? `You rated ${ratedValue.toFixed(1)}` : "Add a Rating"}
              </Button>
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
