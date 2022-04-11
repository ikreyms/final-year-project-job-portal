import { Grid, TextField, Typography } from "@mui/material";
import React from "react";
import useStyles from "./styles";

const Qualification = ({ no, qualifications, setQualifications }) => {
  const classes = useStyles();

  const handleChange = (e) => {
    setQualifications((prev) =>
      prev.map((obj, index) => {
        if (index === no - 1) {
          return { ...obj, [e.target.name]: e.target.value };
        }
        return obj;
      })
    );
  };

  return (
    <>
      <Typography mt={2} mb={1}>
        Qualification {no}
      </Typography>
      <Grid
        container
        spacing={{ z: 1 }}
        columns={{ z: 1, xs: 2 }}
        sx={{ flexGrow: 1 }}
      >
        <Grid item z={2}>
          <TextField
            fullWidth
            size="small"
            className={classes.formControl}
            label="Institute"
            margin="dense"
            name="institute"
            value={qualifications[no - 1].institute}
            onChange={handleChange}
          />
        </Grid>
        <Grid item z={2} xs={1}>
          <TextField
            fullWidth
            size="small"
            className={classes.formControl}
            label="Year"
            margin="dense"
            name="completedOn"
            value={qualifications[no - 1].completedOn}
            onChange={handleChange}
          />
        </Grid>
        <Grid item z={2} xs={1}>
          <TextField
            fullWidth
            size="small"
            className={classes.formControl}
            label="Level"
            margin="dense"
            name="level"
            value={qualifications[no - 1].level}
            onChange={handleChange}
          />
        </Grid>
        <Grid item z={2}>
          <TextField
            fullWidth
            size="small"
            className={classes.formControl}
            label="Course"
            margin="dense"
            name="courseName"
            value={qualifications[no - 1].courseName}
            onChange={handleChange}
          />
        </Grid>
      </Grid>
    </>
  );
};

export default Qualification;
