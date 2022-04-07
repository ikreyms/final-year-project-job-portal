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

  //dashboard
  header: {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
  },
  headerMain: {
    display: "flex",
    alignItems: "center",
  },
  headerMinor: {
    marginRight: theme.spacing(2),
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  profilePic: {
    height: 100,
    cursor: "pointer !important",
  },
  headerMainTextWrapper: { marginLeft: theme.spacing(3) },
  statPacks: {
    display: "flex",
    justifyContent: "space-evenly",
  },
  statPack: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  statCircle: {
    color: theme.palette.primary.dark,
    height: 100,
    width: 100,
    borderRadius: "50%",
    boxShadow: theme.shadows[4],
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
}));

export default useStyles;
