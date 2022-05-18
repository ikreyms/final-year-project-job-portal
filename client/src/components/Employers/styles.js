import { makeStyles } from "@mui/styles";

const useStyles = makeStyles((theme) => ({
  section: { paddingBottom: theme.spacing(3) },
  container: {
    ...theme.presetStyles.containerStyle,
  },
  searchControls: {
    marginTop: theme.spacing(4),
    marginBottom: theme.spacing(4),
    width: "100%",
    display: "flex",
    flexGrow: 1,
    alignItems: "center",
    flexWrap: "wrap",
    gap: theme.spacing(2),
  },
  button: {
    height: 56,
    flexGrow: 1,
  },
  popularEmployers: {
    display: "flex",
    flexWrap: "wrap",
    gap: 1,
    padding: theme.spacing(1),
  },
  popularEmployerCard: {
    cursor: "pointer",
    "&:hover": {
      boxShadow: theme.shadows[2],
    },
    [theme.breakpoints.down("xs")]: {
      boxShadow: theme.shadows[2],
    },
    width: 300,
    padding: theme.spacing(2),
    [theme.breakpoints.down("xxs")]: {
      paddingLeft: 0,
    },
  },
  searchResult: {
    padding: `${theme.spacing(1)} ${theme.spacing(2)}`,
    [theme.breakpoints.down("xxs")]: {
      padding: `${theme.spacing(1)} ${theme.spacing(1)}`,
    },
  },
  about: {
    [theme.breakpoints.down("xs")]: {
      display: "none",
    },
  },
}));

export default useStyles;
