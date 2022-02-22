import { makeStyles } from "@mui/styles";

const useStyles = makeStyles((theme) => ({
  footer: {
    background: theme.palette.secondary.main,
    padding: `${theme.spacing(4)} ${theme.spacing(2)}`,
  },
  container: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    [theme.breakpoints.down("xs")]: { alignItems: "flex-start" },
  },
  linksWrapper: {
    marginTop: theme.spacing(3),
    marginBottom: theme.spacing(4),
    width: "80%",
    display: "flex",
    flexWrap: "wrap",
    justifyContent: "space-evenly",
    [theme.breakpoints.down("xs")]: { flexDirection: "column" },
  },
  links: {
    display: "flex",
    flexDirection: "column",
    margin: `0 ${theme.spacing(2)} ${theme.spacing(3)}`,
    [theme.breakpoints.down("xs")]: {
      margin: 0,
      marginBottom: theme.spacing(2),
    },
  },
  link: {
    fontWeight: 200,
    fontSize: "0.8rem",
    color: `${theme.palette.grey[300]} !important`,
    padding: `${theme.spacing(0.8)} 0`,
    cursor: "pointer",
    textDecoration: "none !important",
    "&:hover": { textDecoration: "underline !important" },
  },
  copyright: {
    fontWeight: 100,
    fontSize: "0.7rem",
    color: `${theme.palette.grey[400]} !important`,
  },
}));

export default useStyles;
