import {
  Grid,
  TextField,
  Typography,
  IconButton,
  Box,
  MenuItem,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import useStyles from "../styles";
import moment from "moment";
import DeleteIcon from "@mui/icons-material/Close";
import { certificateLevelsResume } from "../../../assets/dataArrays";
import { isObjectEmpty } from "../../../assets/utils";

const Qualification = ({
  no,
  qualifications,
  setQualifications,
  errorResponse,
}) => {
  const classes = useStyles();

  const [completedOn, setCompletedOn] = useState("");

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

  const removeHandler = (e) => {
    e.preventDefault();
    const newQualifications = qualifications.filter((qualification, index) => {
      return index !== no - 1;
    });
    setQualifications(newQualifications);
  };

  useEffect(() => {
    if (qualifications[no - 1].completedOn) {
      setCompletedOn(
        moment(qualifications[no - 1]?.completedOn).format("YYYY")
      );
    }
  }, []);

  useEffect(() => {
    setQualifications((prev) =>
      prev.map((obj, index) => {
        if (index === no - 1) {
          return { ...obj, completedOn: completedOn };
        }
        return obj;
      })
    );
  }, [completedOn]);

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
        <IconButton onClick={removeHandler} sx={{ mt: 1 }}>
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
            value={qualifications[no - 1]?.institute}
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
            placeholder="YYYY"
            // value={qualifications[no - 1]?.completedOn}
            value={completedOn}
            // onChange={handleChange}
            onChange={(e) => setCompletedOn(e.target.value)}
            error={
              !isObjectEmpty(errorResponse)
                ? errorResponse.error?.[`qualifications.${no - 1}.completedOn`]
                  ? true
                  : false
                : false
            }
            helperText={
              errorResponse?.error?.[`qualifications.${no - 1}.completedOn`] &&
              "Please provide the completed year."
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
              qualifications[no - 1]?.level
                ? qualifications[no - 1].level
                : certificateLevelsResume[0]
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
            {certificateLevelsResume.map((level, index) => (
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
            value={qualifications[no - 1]?.courseName}
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
