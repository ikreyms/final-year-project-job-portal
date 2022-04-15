import { Box, Divider, Link, Rating, Typography } from "@mui/material";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import logo from "../../assets/logo.svg";
import ExclamationMark from "@mui/icons-material/ErrorOutline";
import useStyles from "./styles";
import StatPack from "./StatPack";
import BrandingPreview from "./BrandingPreview";

const DashboardEmployer = ({ brandingRef }) => {
  const classes = useStyles();

  const id = useSelector((state) => state.user?.id);

  const [profileData, setProfileData] = useState({});
  const [rating, setRating] = useState(0);

  const loadProfileData = async () => {
    try {
      const response = await axios.get(
        `http://localhost:2900/api/employers/${id}`
      );
      const employer = response.data.employer;
      setProfileData(employer);
      setRating(employer.rating);
      console.log(employer);
    } catch (error) {
      console.log(error.response);
    }
  };

  useEffect(() => {
    loadProfileData();
    console.log(profileData);
  }, []);

  return (
    <Box className={classes.panelWrapper}>
      <Box className={classes.header}>
        <Box className={classes.headerMain}>
          <img
            src={profileData.image ? profileData.image : logo}
            alt="profilePic"
            className={classes.profilePic}
          />
          <Box className={classes.headerMainTextWrapper}>
            <Typography variant="h6" sx={{ textTransform: "uppercase" }}>
              {profileData.companyName}
            </Typography>
            <Typography variant="caption">
              {profileData.followers !== 1
                ? `${profileData.followers} Followers`
                : `${profileData.followers} Follower`}
            </Typography>
            <Rating
              value={rating}
              readOnly
              size="small"
              precision={0.5}
              sx={{ ml: "-3px" }}
            />
          </Box>
        </Box>
        <Box
          className={classes.headerMinor}
          sx={{
            display:
              !(
                !profileData.image ||
                !profileData.about ||
                !profileData.whyWorkWithUs.length > 0 ||
                !profileData.mission ||
                !profileData.location ||
                !profileData.contact
              ) && "none",
          }}
        >
          <Typography
            variant="caption"
            color="error.main"
            sx={{ display: "inline-flex", alignItems: "center", gap: 1 }}
          >
            <ExclamationMark fontSize="small" /> Branding Incomplete
          </Typography>
          <Typography variant="caption">
            <Link
              onClick={() => {
                brandingRef.current.click();
              }}
            >
              Click here{" "}
            </Link>
            to complete branding
          </Typography>
        </Box>
      </Box>

      <Divider sx={{ mt: 4, mb: 4 }} />
      <Box className={classes.statPacks}>
        <StatPack stat={123} caption="Received Applications" color="info" />
        <StatPack
          stat={profileData.totalJobsPosted}
          caption="Total Jobs Posted"
          color="info"
        />
        <StatPack stat={123} caption="Interviews Scheduled" color="info" />
      </Box>
      {(profileData.about ||
        profileData.mission ||
        profileData.whyWorkWithUs?.length > 0) && (
        <BrandingPreview profileData={profileData} brandingRef={brandingRef} />
      )}
    </Box>
  );
};

export default DashboardEmployer;
