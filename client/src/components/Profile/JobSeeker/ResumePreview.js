import { Box, Divider, IconButton, Typography } from "@mui/material";
import React from "react";
import ExperiencePreview from "./ExperiencePreview";
import QualificationPreview from "./QualificationPreview";
import useStyles from "../styles";
import EditIcon from "@mui/icons-material/Edit";

const ResumePreview = ({ profileData, resumeRef }) => {
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
              onClick={() => resumeRef.current.click()}
              sx={{ mt: 1 }}
            >
              <EditIcon fontSize="small" />
            </IconButton>
          </Box>
          <Typography variant="body2">{profileData.about}</Typography>
        </>
      )}

      {profileData.qualifications?.length > 0 && (
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
              Qualifications
            </Typography>
            <IconButton
              onClick={() => resumeRef.current.click()}
              sx={{ mt: 1 }}
            >
              <EditIcon fontSize="small" />
            </IconButton>
          </Box>
          {profileData.qualifications.map((qualification, index) => (
            <QualificationPreview key={index} qualification={qualification} />
          ))}
        </>
      )}

      {profileData.experiences?.length > 0 && (
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
              Work Experience
            </Typography>
            <IconButton
              onClick={() => resumeRef.current.click()}
              sx={{ mt: 1 }}
            >
              <EditIcon fontSize="small" />
            </IconButton>
          </Box>
          {profileData.experiences.map((experience, index) => (
            <ExperiencePreview key={index} experience={experience} />
          ))}
        </>
      )}

      {profileData.skills?.length > 0 && (
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
              Skills
            </Typography>
            <IconButton
              onClick={() => resumeRef.current.click()}
              sx={{ mt: 1 }}
            >
              <EditIcon fontSize="small" />
            </IconButton>
          </Box>
          {profileData.skills.map((skill, index) => (
            <Typography variant="body2" key={index}>
              &#8226; {skill.name}
            </Typography>
          ))}
        </>
      )}
    </>
  );
};

export default ResumePreview;
