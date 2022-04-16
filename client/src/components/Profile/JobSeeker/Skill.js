import { Box, IconButton, TextField, Typography } from "@mui/material";
import React from "react";
import useStyles from "../styles";
import { isObjectEmpty } from "../../../assets/utils";
import DeleteIcon from "@mui/icons-material/Close";

const Skill = ({ no, skills, setSkills, errorResponse }) => {
  const classes = useStyles();

  const handleChange = (e) => {
    setSkills((prev) =>
      prev.map((obj, index) => {
        if (index === no - 1) {
          return { ...obj, [e.target.name]: e.target.value };
        }
        return obj;
      })
    );
  };

  const removeHandler = (e) => {
    e.preventDefault();
    const newSkills = skills.filter((skill, index) => {
      return index !== no - 1;
    });
    setSkills(newSkills);
  };

  return (
    <>
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        <Typography mt={3} mb={1} variant="caption">
          Skill {no}
        </Typography>
        <IconButton onClick={removeHandler} sx={{ mt: 1 }}>
          <DeleteIcon fontSize="small" />
        </IconButton>
      </Box>

      <TextField
        fullWidth
        size="small"
        className={classes.formControl}
        label="Skill"
        margin="dense"
        name="name"
        value={skills[no - 1].name}
        onChange={handleChange}
        error={
          !isObjectEmpty(errorResponse)
            ? errorResponse.error?.[`skills.${no - 1}.name`]
              ? true
              : false
            : false
        }
        helperText={errorResponse?.error?.[`skills.${no - 1}.name`]}
      />
    </>
  );
};

export default Skill;
