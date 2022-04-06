import { makeStyles } from "@mui/styles";

const useStyles = makeStyles((theme) => ({
  section: {},
  container: {
    ...theme.presetStyles.containerStyle,
  },
  main: {
    borderRadius: theme.shape.borderRadius,
    boxShadow: theme.shadows[4],
    display: "flex",
    margin: `${theme.spacing(4)} 0 ${theme.spacing(4)}`,
  },
}));

export default useStyles;
