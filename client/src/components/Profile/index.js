import React, { useRef } from "react";
import { Tabs, Tab, Box, useMediaQuery } from "@mui/material";
import { useSelector } from "react-redux";
import useStyles from "./styles";
import TabPanel from "./TabPanel";
import DashboardJobSeeker from "./JobSeeker/DashboardJobSeeker";
import {
  employerProfileTabs,
  jobSeekerProfileTabs,
  adminProfileTabs,
} from "../../assets/dataArrays";
import DashboardEmployer from "./Employer/DashboardEmployer";
import Resume from "./JobSeeker/Resume";
import { useTheme } from "@mui/styles";
import Branding from "./Employer/Branding";
import JobPosts from "./Employer/JobPosts";
import AppliedJobs from "./JobSeeker/AppliedJobs";
import ReceivedApplications from "./Employer/ReceivedApplications";
import Notifications from "./JobSeeker/Notifications";
import Interviews from "./Employer/Interviews";
import DashboardAdmin from "./Admin/DashboardAdmin";
import Following from "./JobSeeker/Following";
import NotificationsAdmin from "./Admin/NotificationsAdmin";

const Profile = () => {
  const classes = useStyles();

  const theme = useTheme();
  const matches = useMediaQuery(theme.breakpoints.down("xs"));

  const resumeRef = useRef();
  const brandingRef = useRef();

  const accountType = useSelector((state) => state.user?.accountType);

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
                orientation={matches ? "horizontal" : "vertical"}
                variant="scrollable"
                value={value}
                onChange={handleChange}
                className={classes.tabs}
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
                <Resume />
              </TabPanel>
              <TabPanel value={value} index={2}>
                <Following />
              </TabPanel>
              <TabPanel value={value} index={3}>
                <AppliedJobs />
              </TabPanel>
              <TabPanel value={value} index={4}>
                <Notifications />
              </TabPanel>
            </>
          ) : accountType === "Employer" ? (
            <>
              <Tabs
                orientation={matches ? "horizontal" : "vertical"}
                variant="scrollable"
                value={value}
                onChange={handleChange}
                className={classes.tabs}
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
                <Branding />
              </TabPanel>
              <TabPanel value={value} index={2}>
                <JobPosts />
              </TabPanel>
              <TabPanel value={value} index={3}>
                <ReceivedApplications />
              </TabPanel>
              <TabPanel value={value} index={4}>
                <Interviews />
              </TabPanel>
            </>
          ) : accountType === "Admin" ? (
            <>
              <Tabs
                orientation={matches ? "horizontal" : "vertical"}
                variant="scrollable"
                value={value}
                onChange={handleChange}
                className={classes.tabs}
              >
                {adminProfileTabs.map((item, index) => (
                  <Tab key={index} label={item} />
                ))}
              </Tabs>
              <TabPanel value={value} index={0}>
                <DashboardAdmin />
              </TabPanel>
              <TabPanel value={value} index={1}>
                <NotificationsAdmin />
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
