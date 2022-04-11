import { Grid, TextField, Typography } from "@mui/material";
import React from "react";
import useStyles from "./styles";

const Experience = ({ no, experiences, setExperiences }) => {
  const classes = useStyles();

  const handleChange = (e) => {
    setExperiences((prev) =>
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
        Experience {no}
      </Typography>
      <Grid
        container
        spacing={{ z: 1 }}
        columns={{ z: 1, xs: 3 }}
        sx={{ flexGrow: 1 }}
      >
        <Grid item z={2}>
          <TextField
            fullWidth
            size="small"
            className={classes.formControl}
            label="Employer"
            margin="dense"
            name="employer"
            value={experiences[no - 1].employer}
            onChange={handleChange}
          />
        </Grid>
        <Grid item z={2}>
          <TextField
            fullWidth
            size="small"
            className={classes.formControl}
            label="Job Title"
            margin="dense"
            name="jobTitle"
            value={experiences[no - 1].jobTitle}
            onChange={handleChange}
          />
        </Grid>
        <Grid item z={1} xs={1}>
          <TextField
            fullWidth
            size="small"
            className={classes.formControl}
            label="From"
            margin="dense"
            name="from"
            value={experiences[no - 1].from}
            onChange={handleChange}
          />
        </Grid>
        <Grid item z={1} xs={1}>
          <TextField
            fullWidth
            size="small"
            className={classes.formControl}
            label="To"
            margin="dense"
            name="to"
            value={experiences[no - 1].to}
            onChange={handleChange}
          />
        </Grid>
        <Grid item z={1} xs={1}>
          <TextField
            fullWidth
            size="small"
            className={classes.formControl}
            label="Duration"
            margin="dense"
            name="duration"
            value={experiences[no - 1].duration}
            onChange={handleChange}
          />
        </Grid>
        <Grid item z={2}>
          <TextField
            fullWidth
            size="small"
            className={classes.formControl}
            label="Job Category"
            margin="dense"
            name="category"
            value={experiences[no - 1].category}
            onChange={handleChange}
          />
        </Grid>
      </Grid>
    </>
  );
};

export default Experience;
