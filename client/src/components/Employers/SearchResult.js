import {
  Card,
  Box,
  CardMedia,
  CardContent,
  Typography,
  Button,
} from "@mui/material";
import React from "react";
import logo from "../../assets/logo.svg";
import StarIcon from "@mui/icons-material/Stars";
import useStyles from "./styles";

const SearchResult = ({ employer, onClick }) => {
  const classes = useStyles();

  return (
    <Card className={classes.searchResult} elevation={1}>
      <Box display="flex" alignItems="center">
        <CardMedia
          component="img"
          image={employer.image ? employer.image : logo}
          height="40"
          sx={{ maxWidth: 40, borderRadius: "50%", cursor: "pointer" }}
          alt="employer logo"
          onClick={onClick}
        />
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            flexBasis: 350,
            maxWidth: 250,
          }}
        >
          <CardContent
            sx={{
              px: 2,
              py: 2,
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
            }}
          >
            <Typography
              variant="subtitle2"
              sx={{ cursor: "pointer" }}
              onClick={onClick}
            >
              {employer.companyName}
            </Typography>
            <Box sx={{ display: "flex", alignItems: "center", gap: 0.3 }}>
              <Typography variant="body2">
                {employer.rating.toFixed(1)}
              </Typography>
              <StarIcon color="secondary" />
            </Box>
          </CardContent>
        </Box>
        <Typography
          variant="caption"
          paragraph
          sx={{ flexBasis: 300, flexGrow: 1 }}
          className={classes.about}
        >
          {employer.about?.slice(0, 100)}...
        </Typography>
        <Box
          sx={{
            display: "flex",
            justifyContent: "flex-end",
            flexBasis: 400,
            justifySelf: "flex-end",
            flexWrap: "wrap",
            flexGrow: 1,
          }}
        >
          <Button
            variant="outlined"
            size="small"
            sx={{ textTransform: "capitalize", width: 90 }}
            onClick={onClick}
          >
            {employer.openings === 1
              ? `${employer.openings} Opening`
              : `${employer.openings} Openings`}
          </Button>
          <Button
            variant="outlined"
            size="small"
            sx={{ textTransform: "capitalize", width: 90 }}
            onClick={onClick}
          >
            Learn More
          </Button>
        </Box>
      </Box>
    </Card>
  );
};

export default SearchResult;
