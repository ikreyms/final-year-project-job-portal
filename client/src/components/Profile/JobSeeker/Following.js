import {
  Box,
  Card,
  CardActionArea,
  CardContent,
  CardMedia,
  Divider,
  Link,
  Stack,
  Typography,
} from "@mui/material";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import useStyles from "../styles";
import FollowedEmployer from "./FollowedEmployer";
import { useNavigate } from "react-router-dom";

const Following = () => {
  const classes = useStyles();

  const id = useSelector((state) => state?.user.id);

  const [following, setFollowing] = useState([]);

  const getFollowing = async () => {
    try {
      const response = await axios.get(
        `http://localhost:2900/api/users/${id}/getUserRatingsAndFollowing`
      );
      console.log(response);
      setFollowing(response.data.following);
    } catch (error) {
      console.log(error.response);
    }
  };

  useEffect(() => {
    getFollowing();
  }, []);

  const navigate = useNavigate();

  return (
    <Box className={classes.panelWrapper}>
      <Typography variant="h5" mb={2}>
        Following
      </Typography>

      <Divider sx={{ mt: 1, mb: 3 }} />

      <Box sx={{ display: "flex", gap: 3, flexWrap: "wrap" }}>
        {following.length > 0 ? (
          following.map((employer) => (
            <FollowedEmployer
              employer={employer}
              onClick={() => navigate(`/employers/${employer._id}`)}
            />
          ))
        ) : (
          <Typography>
            You do not follow any employers.{" "}
            <Link onClick={() => navigate(`/employers`)}>Go to Employers</Link>
          </Typography>
        )}
      </Box>
    </Box>
  );
};

export default Following;
