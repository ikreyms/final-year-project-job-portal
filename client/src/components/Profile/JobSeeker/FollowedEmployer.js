import {
  Card,
  CardActionArea,
  CardContent,
  CardMedia,
  Rating,
  Typography,
} from "@mui/material";
import React from "react";
import logo from "../../../assets/logo.svg";

const FollowedEmployer = ({ employer, onClick }) => {
  return (
    <Card elevation={0} sx={{ width: 150 }} onClick={onClick}>
      <CardActionArea
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          pt: 2,
          pb: 1,
        }}
      >
        <CardMedia
          component="img"
          image={employer.image ? employer.image : logo}
          height="60"
          sx={{ width: 60, borderRadius: "50%" }}
          alt="employer logo"
        />
        <CardContent
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            whiteSpace: "nowrap",
            overflow: "hidden",
            textOverflow: "ellipsis !important",
          }}
        >
          <Typography variant="caption" align="center">
            {employer.companyName.length >= 26
              ? `${employer.companyName.substring(0, 23)}...`
              : employer.companyName}
          </Typography>
          <Rating
            value={employer.rating}
            readOnly
            size="small"
            precision={0.5}
          />
        </CardContent>
      </CardActionArea>
    </Card>
  );
};

export default FollowedEmployer;
