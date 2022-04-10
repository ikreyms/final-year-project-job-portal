import { Grid, TextField, Typography } from "@mui/material";
import React from "react";
import useStyles from "./styles";

const Qualification = ({ no }) => {
  const classes = useStyles();
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
          />
        </Grid>
        <Grid item z={2} xs={1}>
          <TextField
            fullWidth
            size="small"
            className={classes.formControl}
            label="Year"
            margin="dense"
          />
        </Grid>
        <Grid item z={2} xs={1}>
          <TextField
            fullWidth
            size="small"
            className={classes.formControl}
            label="Level"
            margin="dense"
          />
        </Grid>
        <Grid item z={2}>
          <TextField
            fullWidth
            size="small"
            className={classes.formControl}
            label="Course"
            margin="dense"
          />
        </Grid>
      </Grid>
    </>
  );
};

export default Qualification;
