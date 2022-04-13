import {
  Grid,
  TextField,
  Typography,
  IconButton,
  Box,
  MenuItem,
} from "@mui/material";
import React from "react";
import useStyles from "./styles";
import moment from "moment";
import DeleteIcon from "@mui/icons-material/Close";
import { isObjectEmpty } from "../../assets/utils";
import { certificateLevels } from "../../assets/dataArrays";

const Qualification = ({
  no,
  qualifications,
  setQualifications,
  errorResponse,
}) => {
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
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        <Typography mt={2} mb={1}>
          Qualification {no}{" "}
        </Typography>
        <IconButton sx={{ mt: 1 }}>
          <DeleteIcon fontSize="small" />
        </IconButton>
      </Box>

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
            error={
              !isObjectEmpty(errorResponse)
                ? errorResponse.error?.[`qualifications.${no - 1}.institute`]
                  ? true
                  : false
                : false
            }
            helperText={
              errorResponse?.error?.[`qualifications.${no - 1}.institute`]
            }
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
            value={
              qualifications[no - 1].completedOn
                ? moment(qualifications[no - 1].completedOn).format("YYYY")
                : ""
            }
            onChange={handleChange}
            error={
              !isObjectEmpty(errorResponse)
                ? errorResponse.error?.[`qualifications.${no - 1}.completedOn`]
                  ? true
                  : false
                : false
            }
            helperText={
              errorResponse?.error?.[`qualifications.${no - 1}.completedOn`]
            }
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
            select
            value={
              qualifications[no - 1].level
                ? qualifications[no - 1].level
                : certificateLevels[0]
            }
            onChange={handleChange}
            error={
              !isObjectEmpty(errorResponse)
                ? errorResponse.error?.[`qualifications.${no - 1}.level`]
                  ? true
                  : false
                : false
            }
            helperText={
              errorResponse?.error?.[`qualifications.${no - 1}.level`]
            }
          >
            {certificateLevels.map((level, index) => (
              <MenuItem value={level} key={index}>
                {level}
              </MenuItem>
            ))}
          </TextField>
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
            error={
              !isObjectEmpty(errorResponse)
                ? errorResponse.error?.[`qualifications.${no - 1}.courseName`]
                  ? true
                  : false
                : false
            }
            helperText={
              errorResponse?.error?.[`qualifications.${no - 1}.courseName`]
            }
          />
        </Grid>
      </Grid>
    </>
  );
};

export default Qualification;
