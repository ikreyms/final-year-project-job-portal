import { makeStyles } from "@mui/styles";

const useStyles = makeStyles((theme) => ({
  section: {},
  container: {
    ...theme.presetStyles.containerStyle,
  },
  searchControls: {
    marginTop: theme.spacing(2),
    marginBottom: theme.spacing(4),
    width: "100%",
    display: "flex",
    // flexGrow: 1,
    alignItems: "center",
    flexWrap: "wrap",
    gap: theme.spacing(2),
  },
  jobsContainer: {
    width: "100%",
    display: "flex",
    flexDirection: "column",
    marginBottom: theme.spacing(3),
  },
  numberOfResults: {
    background: theme.palette.primary.main,
    padding: theme.spacing(1),
  },
  jobDisplay: {
    width: "100%",
    display: "flex",
    flexDirection: "column",
    gap: 1,
  },
}));

export default useStyles;
