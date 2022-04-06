import React from "react";
import { Tabs, Tab, Typography, Box } from "@mui/material";
import { useSelector } from "react-redux";
import useStyles from "./styles";
import TabPanel from "./TabPanel";
import Dashboard from "./Dashboard";
import {
  employerProfileTabs,
  jobSeekerProfileTabs,
  adminProfileTabs,
} from "../../assets/dataArrays";

const Profile = () => {
  const classes = useStyles();
  const accountType = useSelector((state) => state.user?.accountType);
  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <Box className={classes.section}>
      <Box className={classes.container}>
        <Box className={classes.main}>
          <Tabs
            orientation="vertical"
            variant="scrollable"
            value={value}
            onChange={handleChange}
            sx={{ borderRight: 1, borderColor: "divider", width: 180 }}
          >
            {accountType === "Job Seeker" ? (
              jobSeekerProfileTabs.map((item) => <Tab label={item} />)
            ) : accountType === "Employer" ? (
              employerProfileTabs.map((item) => <Tab label={item} />)
            ) : accountType === "Admin" ? (
              adminProfileTabs.map((item) => <Tab label={item} />)
            ) : (
              <Tab label="Please Login" />
            )}
          </Tabs>
          <TabPanel value={value} index={0}>
            <Dashboard />
          </TabPanel>
          <TabPanel value={value} index={1}>
            Branding
          </TabPanel>
          <TabPanel value={value} index={2}>
            Jobs
          </TabPanel>
          <TabPanel value={value} index={3}>
            Applications
          </TabPanel>
          <TabPanel value={value} index={4}>
            Interviews
          </TabPanel>
        </Box>
      </Box>
    </Box>
  );
};

export default Profile;
