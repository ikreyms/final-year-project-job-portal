import { Box, Link, Typography } from "@mui/material";
import React from "react";
import { useNavigate } from "react-router-dom";
import FooterLogo from "./FooterLogo";
import useStyles from "./styles";

const Footer = () => {
  const classes = useStyles();
  const navigate = useNavigate();
  return (
    <div className={classes.footer}>
      <Box component="div" className={classes.container}>
        <FooterLogo onClick={() => navigate("/")} />
        <Box component="div" className={classes.linksWrapper}>
          <Box component="div" className={classes.links}>
            <Link href="/jobs" className={classes.link}>
              Explore Jobs
            </Link>
            <Link href="/employers" className={classes.link}>
              View Employers
            </Link>
          </Box>
          <Box component="div" className={classes.links}>
            <Link href="/auth" className={classes.link}>
              Join as Job Seeker
            </Link>
            <Link href="/auth" className={classes.link}>
              Join as Employer
            </Link>
          </Box>
          <Box component="div" className={classes.links}>
            <Link href="/jobs" className={classes.link}>
              Apply to Jobs
            </Link>
            <Link className={classes.link}>Post Jobs</Link>
          </Box>
          <Box component="div" className={classes.links}>
            <Link href="/about" className={classes.link}>
              About Us
            </Link>
            <Link href="/about" className={classes.link}>
              Contact Us
            </Link>
          </Box>
        </Box>
        <Typography variant="p" className={classes.copyright}>
          &#169; 2022 Joblookup. All rights reserved.
        </Typography>
      </Box>
    </div>
  );
};

export default Footer;
