import { makeStyles } from "@mui/styles";
import backgroundImg from "../../../assets/bgSectionThree.jpg";
import overlayImg from "../../../assets/bgTexture.png";

const useStyles = makeStyles((theme) => ({
  section: {
    padding: theme.spacing(5),
    backgroundImage: `url(${backgroundImg})`,
    backgroundPosition: "center Top",
    zIndex: 0,
    position: "relative",
    "&:before": {
      position: "absolute",
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      content: '""',
      display: "block",
      backgroundImage: `url(${overlayImg})`,
      opacity: 0.95,
      zIndex: -999,
    },
  },
  boxContainer: {
    padding: `0 ${theme.spacing(3)}`,
    [theme.breakpoints.down("sm")]: {
      padding: `0 ${theme.spacing(2)}`,
    },
    [theme.breakpoints.up("lg")]: {
      width: "90% !important",
      margin: "auto",
    },
    display: "flex",
    justifyContent: "space-around",
    alignItems: "center",
    flexWrap: "wrap",
  },
  box: {
    backgroundColor: "white",
    width: 180,
    height: 180,
    padding: `${theme.spacing(2)} ${theme.spacing(1)}`,
    margin: `${theme.spacing(2)} ${theme.spacing(1)}`,
    borderRadius: theme.shape.borderRadius,
    boxShadow: theme.shadows[10],
    cursor: "pointer",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  content: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
  },
  text: {
    color: `${theme.palette.grey[600]} !important`,
    textTransform: "uppercase",
  },
}));

export default useStyles;
