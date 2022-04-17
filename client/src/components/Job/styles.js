import { makeStyles } from "@mui/styles";

const useStyles = makeStyles((theme) => ({
  container: {
    ...theme.presetStyles.containerStyle,
  },
  main: {
    display: "flex",
    marginTop: `${theme.spacing(2)} !important`,
    marginBottom: `${theme.spacing(3)} !important`,
    [theme.breakpoints.down("xs")]: { flexDirection: "column" },
  },
  actionArea: {
    width: "80%",
    padding: theme.spacing(3),
    [theme.breakpoints.down("xs")]: {
      width: "100%",
      paddingRight: 0,
      paddingLeft: 0,
    },
  },
  jobDisplay: {
    width: "100%",
    display: "flex",
    flexDirection: "column",
    gap: 1,
  },
  btnSet: {
    display: "flex",
    gap: 2,
    flexWrap: "wrap",
  },
  btn: {
    flexGrow: 1,
    [theme.breakpoints.down("xs")]: { flexBasis: 1 },
  },
  resumeHeadings: {
    color: theme.palette.primary.dark,
    fontSize: "0.9rem !important",
    fontWeight: "400",
    textTransform: "uppercase",
  },
}));

export default useStyles;
