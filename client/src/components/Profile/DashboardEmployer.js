import { Box, Divider, Link, Typography } from "@mui/material";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import logo from "../../assets/logo.svg";
import ExclamationMark from "@mui/icons-material/ErrorOutline";
import useStyles from "./styles";
import StatPack from "./StatPack";

const DashboardEmployer = ({ brandingRef }) => {
  const classes = useStyles();

  const id = useSelector((state) => state.user?.id);

  const [profileData, setProfileData] = useState({});

  const loadProfileData = async () => {
    try {
      const response = await axios.get(
        `http://localhost:2900/api/employers/${id}`
      );
      const employer = response.data.employer;
      setProfileData(employer);
    } catch (error) {
      console.log(error.response);
    }
  };

  useEffect(() => {
    loadProfileData();
    console.log(profileData);
  }, []);
  return (
    <Box sx={{ p: 4 }}>
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
            <Typography variant="body2">{profileData.email}</Typography>
          </Box>
        </Box>
        <Box
          className={classes.headerMinor}
          sx={{
            display:
              !(
                !profileData.about ||
                !profileData.whyWorkWithUs ||
                !profileData.mission
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
      {profileData.about && (
        <>
          <Typography variant="h6" mt={3} mb={1}>
            About
          </Typography>
          <Typography variant="body2">{profileData.about}</Typography>
        </>
      )}

      {profileData.mission && (
        <>
          <Typography variant="h6" mt={3} mb={1}>
            Mission
          </Typography>
          <Typography variant="body2">{profileData.mission}</Typography>
        </>
      )}
      {profileData.whyWorkWithUs && (
        <>
          <Typography variant="h6" mt={3} mb={1}>
            Why work with us?
          </Typography>
          <Typography variant="body2">{profileData.whyWorkWithUs}</Typography>
        </>
      )}
      <Divider sx={{ mt: 4, mb: 5 }} />
      <Box className={classes.statPacks}>
        <StatPack stat={123} caption="Received Applications" color="info" />
        <StatPack stat={123} caption="Job Posts" color="info" />
        <StatPack stat={123} caption="Interviews Scheduled" color="info" />
      </Box>
    </Box>
  );
};

export default DashboardEmployer;
