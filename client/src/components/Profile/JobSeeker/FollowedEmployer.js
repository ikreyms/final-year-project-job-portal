import {
  Card,
  CardActionArea,
  CardContent,
  CardMedia,
  Typography,
} from "@mui/material";
import React from "react";
import logo from "../../../assets/logo.svg";

const FollowedEmployer = ({ employer, onClick }) => {
  return (
    <Card elevation={0} sx={{ width: 180 }} onClick={onClick}>
      <CardActionArea
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          pt: 3,
          pb: 1,
          px: 2,
        }}
      >
        <CardMedia
          component="img"
          image={employer.image ? employer.image : logo}
          height="70"
          sx={{ width: 70, borderRadius: "50%" }}
          alt="employer logo"
        />
        <CardContent
          sx={{
            whiteSpace: "nowrap",
            overflow: "hidden",
            textOverflow: "ellipsis !important",
          }}
        >
          <Typography variant="caption" align="center">
            {employer.companyName}
          </Typography>
        </CardContent>
      </CardActionArea>
    </Card>
  );
};

export default FollowedEmployer;
