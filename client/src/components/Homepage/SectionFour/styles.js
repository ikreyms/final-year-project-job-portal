import { makeStyles } from "@mui/styles";

const useStyles = makeStyles((theme) => ({
  section: {
    backgroundColor: theme.palette.primary.main,
    padding: theme.spacing(5),
  },
  container: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    ...theme.presetStyles.containerStyle,
  },
}));

export default useStyles;
