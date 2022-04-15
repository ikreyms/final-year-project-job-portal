import React, { useRef } from "react";
import { Tabs, Tab, Box, useMediaQuery } from "@mui/material";
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
import Resume from "./Resume";
import { useTheme } from "@mui/styles";
import Branding from "./Branding";

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
                Applied Jobs
              </TabPanel>
              <TabPanel value={value} index={3}>
                Notifications
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
                Admin not done
              </TabPanel>
              <TabPanel value={value} index={1}>
                Admin not done
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
