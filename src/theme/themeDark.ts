"use client";

import { createTheme } from "@mui/material";
import { grey } from "@mui/material/colors";

// Create a theme instance.
const themeDark = createTheme({
  cssVariables: true,
  palette: {
    mode: "dark",
    primary: {
      main: "#fc9dd6ff",
      // contrastText: lighten("#04283eff", 0.2),
    },
    secondary: {
      main: "#6a5452ff",
      // contrastText: lighten("#006b50", 0.2),
    },
    error: {
      main: "#610404",
    },
    warning: {
      main: "#FECC17",
    },
    background: {
      default: "#131923ff",
      paper: grey[800],
    },
  },
  components: {
    MuiDrawer: {
      styleOverrides: {
        paper: {
          backgroundColor: "#0b0006ff",
        },
      },
    },
  },
});

export default themeDark;
