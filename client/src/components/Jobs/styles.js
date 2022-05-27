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
    alignItems: "center",
    flexWrap: "wrap",
    gap: theme.spacing(1),
    [theme.breakpoints.down(712)]: {
      flexDirection: "column",
      gap: theme.spacing(2),
    },
  },
  control: { width: "100%" },
  jobsContainer: {
    width: "100%",
    display: "flex",
    flexDirection: "column",
    marginBottom: theme.spacing(3),
  },
  numberOfResults: {
    background: theme.palette.primary.main,
    padding: theme.spacing(1),
    marginBottom: theme.spacing(1),
    borderRadius: theme.shape.borderRadius,
  },
  jobDisplay: {
    width: "100%",
    display: "flex",
    flexDirection: "column",
    gap: 1,
  },
}));

export default useStyles;
