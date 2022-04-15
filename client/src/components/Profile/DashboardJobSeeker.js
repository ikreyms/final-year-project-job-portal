import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import axios from "axios";
import { Box, Divider, Link, Typography } from "@mui/material";
import ExclamationMark from "@mui/icons-material/ErrorOutline";
import logo from "../../assets/logo.svg";
import useStyles from "./styles";
import StatPack from "./StatPack";
import ResumePreview from "./ResumePreview";

const DashboardJobSeeker = ({ resumeRef }) => {
  const classes = useStyles();

  const id = useSelector((state) => state.user?.id);

  const [profileData, setProfileData] = useState({});

  const loadProfileData = async () => {
    try {
      const response = await axios.get(`http://localhost:2900/api/users/${id}`);
      const user = response.data.user;
      setProfileData(user);
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
              {profileData.firstName} {profileData.lastName}
            </Typography>
            <Typography variant="body2">{profileData.email}</Typography>
          </Box>
        </Box>
        <Box
          className={classes.headerMinor}
          sx={{
            display:
              !(
                !profileData.image ||
                !profileData.contact ||
                !profileData.gender ||
                !profileData.dob ||
                !profileData.maritalStatus ||
                !profileData.about ||
                !profileData.qualifications ||
                !profileData.experiences ||
                !profileData.skills
              ) && "none",
          }}
        >
          <Typography
            variant="caption"
            color="error.main"
            sx={{ display: "inline-flex", alignItems: "center", gap: 1 }}
          >
            <ExclamationMark fontSize="small" /> Resume Incomplete
          </Typography>
          <Typography variant="caption">
            <Link
              onClick={() => {
                resumeRef.current.click();
              }}
            >
              Click here{" "}
            </Link>
            to complete resume
          </Typography>
        </Box>
      </Box>

      <Divider sx={{ mt: 4, mb: 4 }} />
      <Box className={classes.statPacks}>
        <StatPack stat={123} caption="Jobs Applied" color="info" />
        <StatPack stat={123} caption="Interviews" color="success" />
        <StatPack stat={123} caption="Rejected" color="error" />
      </Box>
      {(profileData.about ||
        profileData.qualifications?.length > 0 ||
        profileData.experiences?.length > 0 ||
        profileData.skills?.length > 0) && (
        <ResumePreview profileData={profileData} resumeRef={resumeRef} />
      )}
    </Box>
  );
};

export default DashboardJobSeeker;
