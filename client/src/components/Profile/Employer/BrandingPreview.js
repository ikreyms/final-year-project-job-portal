import { Box, Divider, IconButton, Typography } from "@mui/material";
import React from "react";
import useStyles from "../styles";
import EditIcon from "@mui/icons-material/Edit";
import WhyWorkWithUsPreview from "./WhyWorkWithUsPreview";

const BrandingPreview = ({ profileData, brandingRef }) => {
  const classes = useStyles();
  return (
    <>
      <Divider sx={{ mt: 4 }} />
      {profileData.about && (
        <>
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
            }}
          >
            <Typography
              className={classes.resumeHeadings}
              color="primary"
              mt={3}
              mb={1}
            >
              About
            </Typography>
            <IconButton
              onClick={() => brandingRef.current.click()}
              sx={{ mt: 1 }}
            >
              <EditIcon fontSize="small" />
            </IconButton>
          </Box>
          <Typography variant="body2">{profileData.about}</Typography>
        </>
      )}

      {profileData.mission && (
        <>
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
            }}
          >
            <Typography
              className={classes.resumeHeadings}
              color="primary"
              mt={3}
              mb={1}
            >
              Mission
            </Typography>
            <IconButton
              onClick={() => brandingRef.current.click()}
              sx={{ mt: 1 }}
            >
              <EditIcon fontSize="small" />
            </IconButton>
          </Box>
          <Typography variant="body2">{profileData.mission}</Typography>
        </>
      )}

      {profileData.whyWorkWithUs?.length > 0 && (
        <>
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
            }}
          >
            <Typography
              className={classes.resumeHeadings}
              color="primary"
              mt={3}
              mb={1}
            >
              Why work with us?
            </Typography>
            <IconButton
              onClick={() => brandingRef.current.click()}
              sx={{ mt: 1 }}
            >
              <EditIcon fontSize="small" />
            </IconButton>
          </Box>
          {profileData.whyWorkWithUs.map((benefit, index) => (
            <WhyWorkWithUsPreview
              key={index}
              benefit={benefit}
              variant="body2"
            />
          ))}
        </>
      )}
    </>
  );
};

export default BrandingPreview;
