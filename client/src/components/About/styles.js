import { makeStyles } from "@mui/styles";

const useStyles = makeStyles((theme) => ({
  section: {
    backgroundColor: theme.palette.primary.main,
    paddingTop: theme.spacing(5),
    paddingBottom: theme.spacing(5),
  },
  container: {
    ...theme.presetStyles.containerStyle,
    backgroundColor: theme.palette.grey[40],
    borderRadius: theme.shape.borderRadius,
    padding: theme.spacing(5),
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    [theme.breakpoints.down("sm")]: {
      paddingTop: theme.spacing(4),
      paddingBottom: theme.spacing(4),
    },
  },
  aboutHeading: {
    textTransform: "uppercase",
    letterSpacing: "5px !important",
    fontWeight: "500 !important",
    fontSize: "0.9rem !important",
    marginTop: `${theme.spacing(3)} !important`,
    marginBottom: `${theme.spacing(1)} !important`,
  },
  aboutPara: {
    fontSize: "0.85rem !important",
    textAlign: "center",
  },
}));

export default useStyles;
