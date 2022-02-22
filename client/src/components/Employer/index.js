import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import { Box } from "@mui/material";
import useStyles from "./styles";
import Header from "./Header";
import Body from "./Body";
import { useSelector } from "react-redux";

const Employer = () => {
  const classes = useStyles();
  const [employer, setEmployer] = useState(null);
  const { id } = useParams();

  const loggedIn = useSelector((state) => state.loggedIn);
  const userType = useSelector((state) => state.user.userType);

  const loadEmployer = async (id) => {
    const response = await axios.get(`http://localhost:4000/employers/${id}`);
    setEmployer(response.data);
  };

  useEffect(() => {
    loadEmployer(id);
  }, [id]);

  return (
    <Box className={classes.section}>
      {employer && (
        <Header employer={employer} loggedIn={loggedIn} userType={userType} />
      )}
      {employer && (
        <Body employer={employer} loggedIn={loggedIn} userType={userType} />
      )}
    </Box>
  );
};

export default Employer;
