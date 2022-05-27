import { Box, IconButton, TextField, Typography } from "@mui/material";
import React from "react";
import useStyles from "../styles";
import DeleteIcon from "@mui/icons-material/Close";
import { isObjectEmpty } from "../../../assets/utils";

const Criteria = ({ criteria, setCriteria, errorResponse, no }) => {
  const classes = useStyles();

  const handleChange = (e) => {
    setCriteria((prev) =>
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
    const newCriteria = criteria.filter((criterion, index) => {
      return index !== no - 1;
    });
    setCriteria(newCriteria);
  };
  return (
    <Box>
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          height: 35,
        }}
      >
        <Typography mt={3} mb={1} variant="caption">
          Criterion {no}
        </Typography>
        <IconButton onClick={removeHandler} sx={{ mt: 1 }}>
          <DeleteIcon fontSize="small" />
        </IconButton>
      </Box>

      <TextField
        required
        fullWidth
        size="small"
        className={classes.formControl}
        label="Criterion"
        margin="dense"
        name="name"
        value={criteria[no - 1].name}
        onChange={handleChange}
        error={
          !isObjectEmpty(errorResponse)
            ? errorResponse.error?.[`criteria.${no - 1}.name`]
              ? true
              : false
            : false
        }
        helperText={errorResponse?.error?.[`criteria.${no - 1}.name`]}
      />
    </Box>
  );
};

export default Criteria;
