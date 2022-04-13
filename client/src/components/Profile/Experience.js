import {
  Box,
  Grid,
  IconButton,
  MenuItem,
  TextField,
  Typography,
} from "@mui/material";
import React from "react";
import useStyles from "./styles";
import DeleteIcon from "@mui/icons-material/Close";
import moment from "moment";
import { experienceCategories } from "../../assets/dataArrays";
import { isObjectEmpty } from "../../assets/utils";

const Experience = ({ no, experiences, setExperiences, errorResponse }) => {
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
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        <Typography mt={2} mb={1}>
          Experience {no}{" "}
        </Typography>
        <IconButton sx={{ mt: 1 }}>
          <DeleteIcon fontSize="small" />
        </IconButton>
      </Box>
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
            error={
              !isObjectEmpty(errorResponse)
                ? errorResponse.error?.[`experiences.${no - 1}.employer`]
                  ? true
                  : false
                : false
            }
            helperText={
              errorResponse?.error?.[`experiences.${no - 1}.employer`]
            }
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
            error={
              !isObjectEmpty(errorResponse)
                ? errorResponse.error?.[`experiences.${no - 1}.jobTitle`]
                  ? true
                  : false
                : false
            }
            helperText={
              errorResponse?.error?.[`experiences.${no - 1}.jobTitle`]
            }
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
            value={
              experiences[no - 1].from
                ? moment(experiences[no - 1].from).format("YYYY")
                : ""
            }
            onChange={handleChange}
            error={
              !isObjectEmpty(errorResponse)
                ? errorResponse.error?.[`experiences.${no - 1}.from`]
                  ? true
                  : false
                : false
            }
            helperText={errorResponse?.error?.[`experiences.${no - 1}.from`]}
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
            value={
              experiences[no - 1].to
                ? moment(experiences[no - 1].to).format("YYYY")
                : ""
            }
            onChange={handleChange}
            error={
              !isObjectEmpty(errorResponse)
                ? errorResponse.error?.[`experiences.${no - 1}.to`]
                  ? true
                  : false
                : false
            }
            helperText={errorResponse?.error?.[`experiences.${no - 1}.to`]}
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
            type="number"
            value={experiences[no - 1].duration}
            onChange={handleChange}
            error={
              !isObjectEmpty(errorResponse)
                ? errorResponse.error?.[`experiences.${no - 1}.duration`]
                  ? true
                  : false
                : false
            }
            helperText={
              errorResponse?.error?.[`experiences.${no - 1}.duration`]
            }
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
            select
            value={
              experiences[no - 1].category
                ? experiences[no - 1].category
                : experienceCategories[0]
            }
            onChange={handleChange}
            error={
              !isObjectEmpty(errorResponse)
                ? errorResponse.error?.[`experiences.${no - 1}.category`]
                  ? true
                  : false
                : false
            }
            helperText={
              errorResponse?.error?.[`experiences.${no - 1}.category`]
            }
          >
            {experienceCategories.map((category, index) => (
              <MenuItem value={category} key={index}>
                {category}
              </MenuItem>
            ))}
          </TextField>
        </Grid>
      </Grid>
    </>
  );
};

export default Experience;
