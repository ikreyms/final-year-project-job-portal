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
    [theme.breakpoints.down("xs")]: {
      flexDirection: "column",
      padding: `0 ${theme.spacing(1)}`,
    },
  },
  tabs: {
    borderRight: `1px solid ${theme.palette.divider}`,
    width: 180,
    [theme.breakpoints.down("xs")]: {
      width: "100%",
      borderRight: "none",
    },
  },
  panelWrapper: {
    padding: theme.spacing(4),
    [theme.breakpoints.down("xxs")]: {
      paddingRight: theme.spacing(1),
      paddingLeft: theme.spacing(1),
    },
  },

  //dashboard
  header: {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    [theme.breakpoints.down(770)]: {
      flexDirection: "column",
      alignItems: "flex-start",
    },
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
    [theme.breakpoints.down(770)]: {
      marginRight: 0,
      paddingTop: theme.spacing(2),
      alignItems: "flex-start",
    },
  },
  profilePic: {
    height: 100,
    width: 100,
    borderRadius: "50%",
    cursor: "pointer !important",
    overflow: "hidden",
    objectFit: "cover",
  },
  headerMainTextWrapper: {
    marginLeft: theme.spacing(3),
    display: "flex",
    flexDirection: "column",
    alignItems: "flex-start",
  },
  statPacks: {
    display: "flex",
    justifyContent: "space-evenly",
    flexWrap: "wrap",
    [theme.breakpoints.down(510)]: {
      gap: theme.spacing(3),
    },
  },
  statPack: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    margin: `0 ${theme.spacing(1)}`,
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

  // resume
  resumeHeadings: {
    color: theme.palette.primary.dark,
    fontSize: "0.9rem !important",
    fontWeight: "400",
    textTransform: "uppercase",
  },
  formControl: {
    margin: `${theme.spacing(1)} 0 ${theme.spacing(1)} !important`,
  },
  formSection: {
    display: "flex",
    justifyContent: "space-between",
    gap: theme.spacing(3),
    [theme.breakpoints.down(490)]: {
      flexDirection: "column",
    },
  },
}));

export default useStyles;
