import { makeStyles } from "@mui/styles";
import bgTexture from "../../../assets/bgTexture.png";
const useStyles = makeStyles((theme) => ({
  section: {
    backgroundColor: "white",
    display: "flex",
    position: "relative",
    marginTop: theme.spacing(6),
    height: "420px",
    [theme.breakpoints.down("sm")]: { marginTop: theme.spacing(2) },
    [theme.breakpoints.down("xs")]: {
      height: "500px",
      marginTop: theme.spacing(1),
    },
    [theme.breakpoints.down("xxs")]: { height: "540px" },
  },
  box: { height: "100%", width: "50%" },
  box1: { backgroundColor: "transparent" },
  box2: {
    background: `url(${bgTexture})`,
    [theme.breakpoints.down("sm")]: { display: "none" },
  },
  container: {
    position: "absolute",
    display: "flex !important",
    alignItems: "center",
    top: "50%",
    left: "50%",
    transform: "translate(-50%,-50%)",
    padding: `0 ${theme.spacing(3)}`,
    [theme.breakpoints.down("sm")]: {
      padding: `0 ${theme.spacing(2)}`,
    },
    [theme.breakpoints.up("lg")]: {
      maxWidth: "90% !important",
      margin: "auto",
    },
  },
  containerBox: {
    width: "50% !important",
    flexGrow: 1,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  hideContainerBox: {
    [theme.breakpoints.down("sm")]: { display: "none" },
  },
  content: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "flex-start",
  },
  contentIcon: {
    margin: theme.spacing(2),
    marginLeft: theme.spacing(4),
  },
  contentPadding: {
    // padding: `0 ${theme.spacing(2)}`,
  },
  feature: {
    display: "flex",
    alignItems: "center",
    marginTop: theme.spacing(1),
    marginBottom: theme.spacing(1),
  },
  //   containerBox2: { backgroundColor },
}));

export default useStyles;
