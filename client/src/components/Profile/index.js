import React, { useRef } from "react";
import { Tabs, Tab, Typography, Box } from "@mui/material";
import { useSelector } from "react-redux";
import useStyles from "./styles";
import TabPanel from "./TabPanel";
import DashboardJobSeeker from "./DashboardJobSeeker";
import {
  employerProfileTabs,
  jobSeekerProfileTabs,
  adminProfileTabs,
} from "../../assets/dataArrays";
import DashboardEmployer from "./DashboardEmployer";

const Profile = () => {
  const classes = useStyles();

  const resumeRef = useRef();
  const brandingRef = useRef();

  const accountType = useSelector((state) => state.user?.accountType);
  const profileId = useSelector((state) => state.user?.id);
  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <Box className={classes.section}>
      <Box className={classes.container}>
        <Box className={classes.main}>
          {accountType === "Job Seeker" ? (
            <>
              <Tabs
                orientation="vertical"
                variant="scrollable"
                value={value}
                onChange={handleChange}
                sx={{ borderRight: 1, borderColor: "divider", width: 180 }}
              >
                {jobSeekerProfileTabs.map((item, index) => {
                  if (index === 1) {
                    return <Tab key={index} label={item} ref={resumeRef} />;
                  }
                  return <Tab key={index} label={item} />;
                })}
              </Tabs>
              <TabPanel value={value} index={0}>
                <DashboardJobSeeker resumeRef={resumeRef} />
              </TabPanel>
              <TabPanel value={value} index={1}>
                Resume
              </TabPanel>
              <TabPanel value={value} index={2}>
                Applied Jobs
              </TabPanel>
              <TabPanel value={value} index={3}>
                Notifications
              </TabPanel>
            </>
          ) : accountType === "Employer" ? (
            <>
              <Tabs
                orientation="vertical"
                variant="scrollable"
                value={value}
                onChange={handleChange}
                sx={{ borderRight: 1, borderColor: "divider", width: 180 }}
              >
                {employerProfileTabs.map((item, index) => {
                  if (index === 1)
                    return <Tab key={index} label={item} ref={brandingRef} />;
                  return <Tab key={index} label={item} />;
                })}
              </Tabs>
              <TabPanel value={value} index={0}>
                <DashboardEmployer brandingRef={brandingRef} />
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
            </>
          ) : accountType === "Admin" ? (
            <>
              <Tabs
                orientation="vertical"
                variant="scrollable"
                value={value}
                onChange={handleChange}
                sx={{ borderRight: 1, borderColor: "divider", width: 180 }}
              >
                {adminProfileTabs.map((item, index) => (
                  <Tab key={index} label={item} />
                ))}
              </Tabs>
              <TabPanel value={value} index={0}>
                <DashboardJobSeeker resumeRef={resumeRef} />
              </TabPanel>
              <TabPanel value={value} index={1}>
                Resume
              </TabPanel>
              <TabPanel value={value} index={2}>
                Applied Jobs
              </TabPanel>
              <TabPanel value={value} index={3}>
                Notifications
              </TabPanel>
            </>
          ) : (
            <>{<Tab label="Please Login" />}</>
          )}
        </Box>
      </Box>
    </Box>
  );
};

export default Profile;
