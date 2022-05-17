import { AppBar, Link, Stack, Toolbar } from "@mui/material";
import AdminNavLinks from "./AdminNavLinks";
import EmployerNavLinks from "./EmployerNavLinks";
import GuestNavLinks from "./GuestNavLinks";
import HeaderLogo from "./HeaderLogo";
import JobSeekerNavLinks from "./JobSeekerNavLinks";
import MobileDrawer from "./MobileDrawer";
import useStyles from "./styles";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

const NavBar = () => {
  const classes = useStyles();

  const loggedIn = useSelector((state) => state.loggedIn);
  const accountType = useSelector((state) => state.user?.accountType);

  const navigate = useNavigate();

  return (
    <AppBar position="static" elevation={1} className={classes.appbar}>
      <Toolbar variant="dense" className={classes.toolbar}>
        <HeaderLogo onClick={() => navigate("/")} />
        <Stack
          direction="row"
          className={classes.navlinks}
          style={{ marginRight: "auto" }}
        >
          {accountType !== "Employer" && (
            <>
              <Link href="/jobs" underline="none" className={classes.navlink}>
                Jobs
              </Link>
              <Link
                href="/employers"
                underline="none"
                className={classes.navlink}
              >
                Employers
              </Link>
            </>
          )}
          <Link href="/about" underline="none" className={classes.navlink}>
            About
          </Link>
        </Stack>

        {!loggedIn ? (
          <GuestNavLinks />
        ) : loggedIn && accountType === "Employer" ? (
          <EmployerNavLinks />
        ) : loggedIn && accountType === "Job Seeker" ? (
          <JobSeekerNavLinks />
        ) : (
          <AdminNavLinks />
        )}

        <MobileDrawer loggedIn={loggedIn} accountType={accountType} />
      </Toolbar>
    </AppBar>
  );
};

export default NavBar;
