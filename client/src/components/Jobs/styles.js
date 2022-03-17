import { makeStyles } from "@mui/styles";

const useStyles = makeStyles((theme) => ({
  section: {},
  container: {
    ...theme.presetStyles.containerStyle,
  },
  searchControls: {
    marginTop: theme.spacing(1),
    marginBottom: theme.spacing(4),
    width: "100%",
    display: "flex",
    // flexGrow: 1,
    alignItems: "center",
    flexWrap: "wrap",
    gap: theme.spacing(2),
  },
}));

export default useStyles;
