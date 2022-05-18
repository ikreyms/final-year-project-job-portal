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
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../../redux/actionCreators";

const MobileDrawer = ({ loggedIn, accountType }) => {
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const classes = useStyles();
  const navigate = useNavigate();

  const dispatch = useDispatch();
  const profileId = useSelector((state) => state.user?.id);

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
      case "profile":
        navigate(`/profile/${profileId}`);
        break;
      case "auth":
        navigate("/auth");
        break;
      case "logout":
        dispatch(logout());
        navigate("/");
        localStorage.clear();
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
              <JobsIcon fontSize="small" />
            </ListItemIcon>
            <ListItemText>Jobs</ListItemText>
          </ListItem>

          {accountType !== "Employer" && (
            <ListItem onClick={() => onDrawerClose("employers")}>
              <ListItemIcon>
                <EmployersIcon fontSize="small" />
              </ListItemIcon>
              <ListItemText>Employers</ListItemText>
            </ListItem>
          )}

          <ListItem onClick={() => onDrawerClose("about")}>
            <ListItemIcon>
              <AboutIcon fontSize="small" />
            </ListItemIcon>
            <ListItemText>About</ListItemText>
          </ListItem>
        </List>
        {!loggedIn ? (
          <>
            <Divider />
            <ListItem onClick={() => onDrawerClose("auth")}>
              <ListItemIcon>
                <LoginIcon fontSize="small" />
              </ListItemIcon>
              <ListItemText>Login</ListItemText>
            </ListItem>
          </>
        ) : loggedIn && accountType === "employer" ? (
          <>
            <Divider />
            <ListItem>
              <ListItemIcon>
                <PostIcon fontSize="small" />
              </ListItemIcon>
              <ListItemText>Post A Job</ListItemText>
            </ListItem>
            <ListItem onClick={() => onDrawerClose("profile")}>
              <ListItemIcon>
                <ProfileIcon fontSize="small" />
              </ListItemIcon>
              <ListItemText>Profile</ListItemText>
            </ListItem>
            <ListItem onClick={() => onDrawerClose("logout")}>
              <ListItemIcon>
                <LogoutIcon fontSize="small" />
              </ListItemIcon>
              <ListItemText>Logout</ListItemText>
            </ListItem>
          </>
        ) : loggedIn && accountType === "jobseeker" ? (
          <>
            <Divider />
            <ListItem onClick={() => onDrawerClose("profile")}>
              <ListItemIcon>
                <ProfileIcon fontSize="small" />
              </ListItemIcon>
              <ListItemText>Profile</ListItemText>
            </ListItem>
            <ListItem onClick={() => onDrawerClose("logout")}>
              <ListItemIcon>
                <LogoutIcon fontSize="small" />
              </ListItemIcon>
              <ListItemText>Logout</ListItemText>
            </ListItem>
          </>
        ) : (
          <>
            <Divider />
            <ListItem onClick={() => onDrawerClose("profile")}>
              <ListItemIcon>
                <ProfileIcon />
              </ListItemIcon>
              <ListItemText>Profile</ListItemText>
            </ListItem>
            <ListItem onClick={() => onDrawerClose("logout")}>
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
