import { Box, Link, Stack, Typography } from "@mui/material";
import React from "react";
import useStyles from "./styles";
import HeaderLogo from "../NavBar/HeaderLogo";
import CallIcon from "@mui/icons-material/Call";
import EmailIcon from "@mui/icons-material/Email";

const About = () => {
  const classes = useStyles();
  return (
    <Box className={classes.section}>
      <Box className={classes.container}>
        <HeaderLogo />
        <Typography variant="subtitle1" className={classes.aboutHeading}>
          About Us
        </Typography>
        <Typography variant="subtitle1" className={classes.aboutPara}>
          Sed ut perspiciatis unde omnis iste natus error sit voluptatem
          accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae
          ab illo inventore veritatis et quasi architecto beatae vitae dicta
          sunt explicabo. Nemo enim ipsam voluptatem quia voluptas sit
          aspernatur aut odit aut fugit, sed quia consequuntur magni dolores eos
          qui ratione voluptatem sequi nesciunt. Neque porro quisquam est, qui
          dolorem ipsum quia dolor sit amet, consectetur, adipisci velit, sed
          quia non numquam eius modi tempora incidunt ut labore et dolore magnam
          aliquam quaerat voluptatem. Ut enim ad minima veniam, quis nostrum
          exercitationem ullam corporis suscipit laboriosam, nisi ut aliquid ex
          ea commodi consequatur? Quis autem vel eum iure reprehenderit qui in
          ea voluptate velit esse quam nihil molestiae consequatur, vel illum
          qui dolorem eum fugiat quo voluptas nulla pariatur.
        </Typography>
        <Typography variant="subtitle1" className={classes.aboutHeading}>
          Contact Us
        </Typography>
        <Typography variant="subtitle1" className={classes.aboutPara}>
          Reach us through any of the following methods.
        </Typography>
        <Stack direction="row" spacing={4} mt={2} flexWrap="wrap">
          <Stack alignItems="center" justifyContent="space-evenly">
            <CallIcon fontSize="large" sx={{ color: "grey.700" }} />
            <Typography variant="caption">Phone</Typography>
            <Typography variant="subtitle2" color="primary">
              (+960) 9948397
            </Typography>
          </Stack>
          <Stack alignItems="center">
            <EmailIcon
              fontSize="large"
              sx={{ color: "grey.700" }}
              justifyContent="space-evenly"
            />
            <Typography variant="caption">Email</Typography>
            <Typography variant="subtitle2">
              <Link href="mailto:info@joblookup.com">info@joblookup.com</Link>
            </Typography>
          </Stack>
        </Stack>
      </Box>
    </Box>
  );
};

export default About;
