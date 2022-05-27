import { makeStyles } from "@mui/styles";

const useStyles = makeStyles((theme) => ({
  section: {
    backgroundColor: "white",
    paddingTop: theme.spacing(6),
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
    alignItems: "center",
    justifyContent: "space-between",
  },
  sectionBox: { width: "50%", flexGrow: 1 },
  boxContent: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "flex-start",
  },
  buttonWrapper: { marginTop: theme.spacing(3) },
  button: {
    marginRight: `${theme.spacing(1)} !important`,
    [theme.breakpoints.down("xxs")]: {
      marginBottom: `${theme.spacing(1)} !important`,
    },
  },
  sectionBoxImg: {
    [theme.breakpoints.down("sm")]: { display: "none" },
    height: "100%",
    width: "50%",
  },
}));

export default useStyles;
