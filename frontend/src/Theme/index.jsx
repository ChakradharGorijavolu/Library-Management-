import { createTheme } from "@mui/material/styles";
import { useMemo, useState, useEffect } from "react"; // ⬅ Added useEffect
import { ThemeContext } from "./ThemeContext";

import { ThemeProvider } from "@mui/material";
import CssBaseline from "@mui/material/CssBaseline";

import { commonTheme } from "./common";
import { paletteLight } from "./paletteLight";
import { paletteDark } from "./paletteDark";

export default function ThemeWrapper({ children }) {

  // ⬇ Load theme from localStorage on first render
  const [mode, setMode] = useState(() => {
    return localStorage.getItem("themeMode") || "light"; 
  });

  // ⬇ Save the updated theme to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem("themeMode", mode);
  }, [mode]);

  const toggleTheme = () => {
    setMode((prev) => (prev === "light" ? "dark" : "light"));
  };

  const theme = useMemo(() => {
    const palette = mode === "light" ? paletteLight : paletteDark;

    return createTheme({
      palette,
      ...commonTheme,
    });
  }, [mode]);

  return (
    <ThemeContext.Provider value={{ mode, toggleTheme }}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        {children}
      </ThemeProvider>
    </ThemeContext.Provider>
  );
}
