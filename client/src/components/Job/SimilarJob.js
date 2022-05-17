import React from "react";
import {
  Card,
  CardActionArea,
  CardMedia,
  Typography,
  Box,
  CardContent,
} from "@mui/material";
import logo from "../../assets/logo.svg";
import moment from "moment";

const SimilarJob = ({ job, onClick }) => {
  return (
    <Card elevation={1} onClick={onClick}>
      <CardActionArea
        sx={{ display: "flex", justifyContent: "flex-start", px: 2 }}
      >
        <CardMedia
          component="img"
          image={job?.postedBy?.image ? job?.postedBy?.image : logo}
          height="40"
          sx={{ maxWidth: 40, borderRadius: "50%", cursor: "pointer" }}
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

export default SimilarJob;
