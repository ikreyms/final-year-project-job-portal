import { makeStyles } from "@mui/styles";

const useStyles = makeStyles((theme) => ({
  container: {
    ...theme.presetStyles.containerStyle,
  },
  content: {
    display: "flex",
    borderRadius: theme.shape.borderRadius,
    boxShadow: theme.shadows[4],
    margin: `${theme.spacing(5)} ${theme.spacing(5)}`,
    [theme.breakpoints.down("sm")]: {
      margin: `${theme.spacing(5)} ${theme.spacing(2)}`,
    },
    overflow: "hidden",
    [theme.breakpoints.down("xs")]: {
      marginLeft: theme.spacing(1),
      marginRight: theme.spacing(1),
    },
    [theme.breakpoints.down("xxs")]: {
      marginTop: theme.spacing(2),
      marginLeft: theme.spacing(0),
      marginRight: theme.spacing(0),
    },
  },
  promoBox: {
    padding: theme.spacing(6),
    width: "40%",
    [theme.breakpoints.down("xs")]: {
      display: "none",
    },
    backgroundColor: theme.palette.primary.dark,
    display: "flex",
    alignItems: "flex-start",
  },
  promoBoxTextContainer: {},
  promoHeading: {
    color: "white",
    marginTop: `${theme.spacing(3)}!important`,
    marginBottom: `${theme.spacing(1)}!important`,
    fontWeight: "400 !important",
    lineHeight: "1.5rem !important",
  },
  promoText: {
    color: theme.palette.grey[40],
    fontWeight: "300 !important",
    marginBottom: `${theme.spacing(3)}!important`,
  },
  formBox: {
    padding: theme.spacing(6),
    width: "60%",
    [theme.breakpoints.down("xs")]: {
      width: "100%",
      padding: theme.spacing(3),
    },
    [theme.breakpoints.down("xxs")]: {
      padding: theme.spacing(2),
    },
  },
  form: {
    display: "flex",
    flexDirection: "column",
  },
  resetForm: {
    height: "70vh",
    padding: `${theme.spacing(4)} 0`,
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    [theme.breakpoints.up("xxs")]: {
      width: "80%",
      margin: "auto",
    },
    [theme.breakpoints.up("sm")]: {
      width: "50%",
      margin: "auto",
    },
  },
  formControl: {
    margin: `${theme.spacing(1)} 0 ${theme.spacing(1)} !important`,
  },
  submitButton: {
    height: "3.4rem",
    margin: `${theme.spacing(2)} 0 ${theme.spacing(3)} !important`,
  },
  resetButton: {
    height: "3.4rem",
    // marginTop: theme.spacing(2),
    margin: `${theme.spacing(2)} 0 ${theme.spacing(1)} !important`,
  },
}));

export default useStyles;
