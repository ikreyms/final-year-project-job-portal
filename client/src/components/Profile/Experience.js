import { Grid, TextField, Typography } from "@mui/material";
import React from "react";
import useStyles from "./styles";

const Experience = ({ no }) => {
  const classes = useStyles();
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
          />
        </Grid>
        <Grid item z={2}>
          <TextField
            fullWidth
            size="small"
            className={classes.formControl}
            label="Job Title"
            margin="dense"
          />
        </Grid>
        <Grid item z={1} xs={1}>
          <TextField
            fullWidth
            size="small"
            className={classes.formControl}
            label="From"
            margin="dense"
          />
        </Grid>
        <Grid item z={1} xs={1}>
          <TextField
            fullWidth
            size="small"
            className={classes.formControl}
            label="To"
            margin="dense"
          />
        </Grid>
        <Grid item z={1} xs={1}>
          <TextField
            fullWidth
            size="small"
            className={classes.formControl}
            label="Duration"
            margin="dense"
          />
        </Grid>
        <Grid item z={2}>
          <TextField
            fullWidth
            size="small"
            className={classes.formControl}
            label="Job Category"
            margin="dense"
          />
        </Grid>
      </Grid>
    </>
  );
};

export default Experience;
