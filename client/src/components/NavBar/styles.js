import { makeStyles } from "@mui/styles";

const useStyles = makeStyles((theme) => ({
  appbar: {
    boxShadow: "none !important",
    [theme.breakpoints.up("lg")]: {
      width: "90% !important",
      margin: "auto",
    },
  },
  toolbar: {
    backgroundColor: theme.palette.grey[40],
    justifyContent: "space-between",
    position: "relative",
  },
  navlinks: {
    alignSelf: "stretch",
    marginLeft: theme.spacing(3),
    [theme.breakpoints.down("sm")]: {
      display: "none !important",
    },
  },
  navlink: {
    height: "100%",
    boxSizing: "border-box",
    textDecoration: "none",
    textTransform: "uppercase",
    fontSize: "0.75rem",
    letterSpacing: "0.07em",
    color: "#6C6C6C !important",
    paddingRight: theme.spacing(2),
    paddingLeft: theme.spacing(2),
    paddingTop: theme.spacing(2),
    "&:hover": {
      color: theme.palette.primary.main,
      borderBottom: `3px solid ${theme.palette.primary.main}`,
      cursor: "pointer",
    },
    "&:active": {
      color: `${theme.palette.primary.main} !important`,
    },
  },
  navlinkSpecial: {
    color: `${theme.palette.primary.main} !important`,
    fontWeight: "bold",
    "&:active": {
      color: `${theme.palette.primary.dark} !important`,
    },
  },
  menuButton: {
    [theme.breakpoints.up("sm")]: {
      display: "none !important",
    },
  },
  drawer: {},
}));

export const paperProps = {
  sx: {
    width: "50%",
  },
};

export default useStyles;
