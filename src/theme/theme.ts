"use client";

import { createTheme } from "@mui/material";

// Create a theme instance.
const theme = createTheme({
  cssVariables: true,
  palette: {
    mode: "dark",
    primary: {
      main: "#fc9dd6",
    },
    secondary: {
      main: "#6a5452",
    },
    background: {
      paper: "#120009",
      default: "#12000e",
    },
    text: {
      primary: "#f9f9f9",
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

export default theme;
