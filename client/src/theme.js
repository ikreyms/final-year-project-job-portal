import { createTheme } from "@mui/material";

let theme = createTheme({
  palette: {
    primary: { main: "#2296D8" },
    secondary: { main: "#2F2E41" },
    grey: {
      40: "#fdfdfd",
    },
    divider: "#E0E0E0",
  },
  breakpoints: {
    values: {
      lg: 1024,
      sm: 740,
      xs: 635,
      xxs: 340,
      z: 0,
    },
  },
  components: {
    MuiLink: {
      styleOverrides: {
        root: {
          cursor: "pointer",
        },
      },
    },
  },
});

theme = createTheme(theme, {
  presetStyles: {
    containerStyle: {
      padding: `0 ${theme.spacing(3)}`,
      [theme.breakpoints.down("sm")]: {
        padding: `0 ${theme.spacing(2)}`,
      },
      [theme.breakpoints.up("lg")]: {
        width: "90% !important",
        margin: "auto",
      },
    },
  },
});

export default theme;
