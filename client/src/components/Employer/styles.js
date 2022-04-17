import { makeStyles } from "@mui/styles";

const useStyles = makeStyles((theme) => ({
  header: {
    backgroundColor: theme.palette.primary.dark,
    paddingTop: theme.spacing(3),
    paddingBottom: theme.spacing(3),
  },
  container: {
    ...theme.presetStyles.containerStyle,
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
  },
  headerContainer: {
    ...theme.presetStyles.containerStyle,
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    [theme.breakpoints.down("xs")]: {
      flexDirection: "column",
      alignItems: "flex-start",
    },
  },
  mainContent: {
    display: "flex",
    flexDirection: "column",
  },
  headerContent: {
    display: "flex",
    alignItems: "center",
  },
  logo: {
    height: 70,
    width: 70,
    borderRadius: "50%",
    objectFit: "cover",
    marginRight: theme.spacing(2),
  },
  mainInfo: {
    display: "flex",
    flexDirection: "column",
    alignItems: "flex-start",
  },
  headerActions: {
    marginTop: theme.spacing(2),
    display: "flex",
    alignItems: "center",
    gap: theme.spacing(1),
  },
  ratingForm: {
    display: "none",
    alignItems: "center",
    gap: theme.spacing(1),
    marginTop: theme.spacing(1),
  },
  contactInfo: {
    display: "flex",
    flexDirection: "column",
    alignItems: "flex-end",
    gap: 5,
    alignSelf: "flex-start",
    [theme.breakpoints.down("xs")]: {
      alignItems: "flex-start",
      marginTop: theme.spacing(3),
    },
  },
  contactStack: {
    [theme.breakpoints.down("xs")]: {
      flexDirection: "row-reverse !important",
      justifyContent: "flex-start",
    },
  },
  contactStackIcon: {
    [theme.breakpoints.down("xs")]: {
      paddingLeft: 0,
      paddingRight: "7.2px",
    },
  },
  tableHide: {
    [theme.breakpoints.down(568)]: {
      display: "none !important",
    },
  },
}));

export const primaryBtnSxProps = {
  backgroundColor: "white",
  color: "primary.dark",
  width: 120,
  height: 30,
  border: "1px solid white",
  "&:hover": {
    color: "white",
  },
};

export const secondaryBtnSxProps = {
  color: "white",
  borderColor: "white",
  width: 120,
  height: 30,
  "&:hover": {
    borderColor: "white",
  },
};

export default useStyles;
