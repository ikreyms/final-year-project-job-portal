import {
  Box,
  Button,
  Card,
  CardActions,
  CardContent,
  CardMedia,
  Rating,
  Typography,
} from "@mui/material";
import useStyles from "./styles";
import logo from "../../assets/logo.svg";

const PopularEmployerCard = ({ employer, onClick }) => {
  const classes = useStyles();
  return (
    <Card
      elevation={0}
      className={classes.popularEmployerCard}
      onClick={onClick}
    >
      <Box display="flex" alignItems="center">
        <CardMedia
          component="img"
          image={employer.image ? employer.image : logo}
          height="40"
          sx={{ width: 40, borderRadius: "50%" }}
          alt="employer logo"
        />
        <Box>
          <CardContent sx={{ px: 2, py: 0 }}>
            <Typography variant="subtitle2">{employer.companyName}</Typography>
            <Box
              sx={{ display: "flex", alignItems: "center", gap: 1, mb: 0.5 }}
            >
              <Rating
                value={employer.rating}
                readOnly
                size="small"
                precision={0.5}
              />
              <Typography fontSize="0.9rem" pt={0.32} fontWeight="300">
                {employer.ratingsSubmitted} reviews
              </Typography>
            </Box>
          </CardContent>
          <CardActions sx={{ px: 2, py: 0 }}>
            <Button
              variant="text"
              size="small"
              sx={{ p: 0, fontSize: "0.8rem" }}
            >
              {employer.openings}{" "}
              {employer.openings === 0 || employer.openings !== 1
                ? "Openings"
                : "Opening"}
            </Button>
            <Button
              variant="text"
              size="small"
              sx={{ px: 1, py: 0, fontSize: "0.8rem" }}
            >
              Learn More
            </Button>
          </CardActions>
        </Box>
      </Box>
    </Card>
  );
};

export default PopularEmployerCard;
