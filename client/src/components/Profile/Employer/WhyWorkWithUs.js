import { Box, Grid, IconButton, TextField, Typography } from "@mui/material";
import React from "react";
import useStyles from "../styles";
import DeleteIcon from "@mui/icons-material/Close";
import { isObjectEmpty } from "../../../assets/utils";

const WhyWorkWithUs = ({
  whyWorkWithUs,
  setWhyWorkWithUs,
  errorResponse,
  no,
}) => {
  const classes = useStyles();

  const handleChange = (e) => {
    setWhyWorkWithUs((prev) =>
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
    const newBenefits = whyWorkWithUs.filter((benefit, index) => {
      return index !== no - 1;
    });
    setWhyWorkWithUs(newBenefits);
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
          Benefit {no}{" "}
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
            label="Heading"
            margin="dense"
            name="heading"
            value={whyWorkWithUs[no - 1].heading}
            onChange={handleChange}
            error={
              !isObjectEmpty(errorResponse)
                ? errorResponse.error?.[`whyWorkWithUs.${no - 1}.heading`]
                  ? true
                  : false
                : false
            }
            helperText={
              errorResponse?.error?.[`whyWorkWithUs.${no - 1}.heading`]
            }
          />
        </Grid>
        <Grid item z={2}>
          <TextField
            fullWidth
            size="small"
            className={classes.formControl}
            label="Body"
            margin="dense"
            multiline
            maxRows={6}
            name="body"
            value={whyWorkWithUs[no - 1].body}
            onChange={handleChange}
            error={
              !isObjectEmpty(errorResponse)
                ? errorResponse.error?.[`whyWorkWithUs.${no - 1}.body`]
                  ? true
                  : false
                : false
            }
            helperText={errorResponse?.error?.[`whyWorkWithUs.${no - 1}.body`]}
          />
        </Grid>
      </Grid>
    </>
  );
};

export default WhyWorkWithUs;
