"use client";

import { createTheme } from "@mui/material";

// Create a theme instance.
const themeLight = createTheme({
  cssVariables: true,
  palette: {
    mode: "light",
  },
});

export default themeLight;
