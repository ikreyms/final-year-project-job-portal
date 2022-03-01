import {
  Divider,
  Drawer,
  IconButton,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
} from "@mui/material";
import JobsIcon from "@mui/icons-material/WorkOutlineOutlined";
import EmployersIcon from "@mui/icons-material/Business";
import AboutIcon from "@mui/icons-material/InfoOutlined";
import LoginIcon from "@mui/icons-material/Login";
import LogoutIcon from "@mui/icons-material/Logout";
import PostIcon from "@mui/icons-material/PostAdd";
import ProfileIcon from "@mui/icons-material/AccountCircleOutlined";
import { Menu as MenuIcon } from "@mui/icons-material";
import React, { useState } from "react";
import useStyles from "./styles";
import { paperProps } from "./styles";
import { useNavigate } from "react-router-dom";

const MobileDrawer = ({ loggedIn, accountType }) => {
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const classes = useStyles();
  const navigate = useNavigate();

  const onDrawerClose = (text) => {
    setIsDrawerOpen(false);
    switch (text) {
      case "jobs":
        navigate("/jobs");
        break;
      case "employers":
        navigate("/employers");
        break;
      case "about":
        navigate("/about");
        break;
      case "auth":
        navigate("/auth");
        break;
      default:
        return;
    }
  };
  return (
    <>
      <IconButton
        onClick={() => setIsDrawerOpen(!isDrawerOpen)}
        className={classes.menuButton}
      >
        <MenuIcon />
      </IconButton>
      <Drawer
        variant="temporary"
        anchor="right"
        elevation={2}
        open={isDrawerOpen}
        onClose={() => onDrawerClose("")}
        className={classes.drawer}
        PaperProps={paperProps}
      >
        <List>
          <ListItem onClick={() => onDrawerClose("jobs")}>
            <ListItemIcon>
              <JobsIcon />
            </ListItemIcon>
            <ListItemText>Jobs</ListItemText>
          </ListItem>
          <ListItem onClick={() => onDrawerClose("employers")}>
            <ListItemIcon>
              <EmployersIcon />
            </ListItemIcon>
            <ListItemText>Employers</ListItemText>
          </ListItem>
          <ListItem onClick={() => onDrawerClose("about")}>
            <ListItemIcon>
              <AboutIcon />
            </ListItemIcon>
            <ListItemText>About</ListItemText>
          </ListItem>
        </List>
        {!loggedIn ? (
          <>
            <Divider />
            <ListItem onClick={() => onDrawerClose("auth")}>
              <ListItemIcon>
                <LoginIcon />
              </ListItemIcon>
              <ListItemText>Login</ListItemText>
            </ListItem>
          </>
        ) : loggedIn && accountType === "employer" ? (
          <>
            <Divider />
            <ListItem>
              <ListItemIcon>
                <PostIcon />
              </ListItemIcon>
              <ListItemText>Post A Job</ListItemText>
            </ListItem>
            <ListItem>
              <ListItemIcon>
                <ProfileIcon />
              </ListItemIcon>
              <ListItemText>Profile</ListItemText>
            </ListItem>
            <ListItem>
              <ListItemIcon>
                <LogoutIcon />
              </ListItemIcon>
              <ListItemText>Logout</ListItemText>
            </ListItem>
          </>
        ) : loggedIn && accountType === "jobseeker" ? (
          <>
            <Divider />
            <ListItem>
              <ListItemIcon>
                <ProfileIcon />
              </ListItemIcon>
              <ListItemText>Profile</ListItemText>
            </ListItem>
            <ListItem>
              <ListItemIcon>
                <LogoutIcon />
              </ListItemIcon>
              <ListItemText>Logout</ListItemText>
            </ListItem>
          </>
        ) : (
          <>
            <Divider />
            <ListItem>
              <ListItemIcon>
                <ProfileIcon />
              </ListItemIcon>
              <ListItemText>Profile</ListItemText>
            </ListItem>
            <ListItem>
              <ListItemIcon>
                <LogoutIcon />
              </ListItemIcon>
              <ListItemText>Logout</ListItemText>
            </ListItem>
          </>
        )}
      </Drawer>
    </>
  );
};

export default MobileDrawer;
