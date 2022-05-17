import {
  Box,
  Card,
  CardActionArea,
  CardContent,
  CardMedia,
  Typography,
} from "@mui/material";
import React from "react";
import moment from "moment";
import logo from "../../assets/logo.svg";
import useStyles from "./styles";

const JobResult = ({ job, onClick }) => {
  const classes = useStyles();
  return (
    <Card className={classes.jobResult} elevation={1} onClick={onClick}>
      <CardActionArea
        sx={{ display: "flex", justifyContent: "flex-start", px: 2 }}
      >
        <CardMedia
          component="img"
          image={job?.postedBy?.image ? job?.postedBy?.image : logo}
          height="40"
          sx={{ maxWidth: 40, borderRadius: 1, cursor: "pointer" }}
          alt="employer logo"
        />
        <CardContent
          sx={{
            width: "100%",
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <Box sx={{ display: "flex", flexDirection: "column" }}>
            <Typography variant="subtitle2">{job.title}</Typography>
            <Typography variant="caption">
              {job?.postedBy?.companyName}
              <br />
            </Typography>
            <Typography variant="caption">MVR {job.salary}</Typography>
          </Box>
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              alignItems: "flex-end",
            }}
          >
            <Typography variant="caption">
              {moment(job.postDate).fromNow()}
            </Typography>
          </Box>
        </CardContent>
      </CardActionArea>
    </Card>
  );
};

export default JobResult;
