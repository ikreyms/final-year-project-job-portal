import { Box, Divider, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import useStyles from "../styles";
import StatPack from "../StatPack";
import axios from "axios";

const DashboardAdmin = () => {
  const classes = useStyles();

  const [profileData, setProfileData] = useState({});

  const getProfileData = async () => {
    try {
      const response = await axios.get("http://localhost:2900/api/admin");
      setProfileData(response.data);
    } catch (error) {
      console.log(error.response);
    }
  };

  useEffect(() => {
    getProfileData();
  }, []);

  return (
    <Box className={classes.panelWrapper}>
      <Typography variant="h5" mb={2}>
        Admin Dashboard
      </Typography>

      <Divider sx={{ mt: 1, mb: 3 }} />

      <Box
        sx={{
          display: "flex",
          flexWrap: "wrap",
          gap: 2,
          justifyContent: "space-around",
        }}
      >
        <StatPack
          stat={profileData.seekerCount}
          caption="Seekers Registered"
          color="primary.dark"
        />
        <StatPack
          stat={profileData.employerCount}
          caption="Employers Registered"
          color="primary.dark"
        />
        <StatPack
          stat={profileData.verifiedEmployerCount}
          caption="Verified Employers"
          color="primary.dark"
        />
        <StatPack
          stat={profileData.jobCount}
          caption="Total Jobs Posted"
          color="primary.dark"
        />
        <StatPack
          stat={profileData.applicationCount}
          caption="Total Applications"
          color="primary.dark"
        />
      </Box>
    </Box>
  );
};

export default DashboardAdmin;
