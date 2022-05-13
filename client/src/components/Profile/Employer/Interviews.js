import { Box, Divider, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import useStyles from "../styles";
import axios from "axios";
import moment from "moment";
import { useSelector } from "react-redux";

const Interviews = () => {
  const classes = useStyles();

  const empId = useSelector((state) => state?.user.id);

  const [interviews, setInterviews] = useState([]);

  const loadInterviewData = async () => {
    try {
      const response = await axios.get(
        `http://localhost:2900/api/interviews/${empId}`
      );
      console.log(response);
      setInterviews(response.data.interviews);
    } catch (error) {
      console.log(error.response);
      setInterviews([]);
    }
  };

  useEffect(() => {
    loadInterviewData();
  }, []);

  return (
    <Box className={classes.panelWrapper}>
      {interviews.length > 0
        ? interviews.map((interview) => (
            <>
              <Box>empId: {interview.empId}</Box>
              <Box>appIds: [{interview.appIds}]</Box>
              <Box>venue: {interview.venue}</Box>
              <Box>
                date: {moment(interview.interviewDate).format("DD/MM/YYYY")}
              </Box>
              <Box>
                time: {moment(interview.interviewTime).format("HH:mm")} hrs
              </Box>
              <Divider />
            </>
          ))
        : "No interviews scheduled."}
    </Box>
  );
};

export default Interviews;
