import React, { createContext, useState } from "react";
import { useMediaQuery, createTheme } from "@mui/material";

const SettingsContext = createContext();

const SettingsProvider = (props: any) => {
  const prefersDarkMode = useMediaQuery("(prefers-color-scheme: dark)");
  const [darkMode, setDarkMode] = useState(prefersDarkMode);

  const theme = React.useMemo(
    () =>
      createTheme({
        palette: {
          mode: darkMode ? "dark" : "light",
        },
      }),
    [darkMode]
  );

  const toggleDarkMode = (event: React.ChangeEvent<HTMLInputElement>) => {
    setDarkMode(!darkMode);
  };

  return (
    <SettingsContext.Provider value={{ theme, toggleDarkMode, darkMode }}>
      {props.children}
    </SettingsContext.Provider>
  );
};

export { SettingsProvider, SettingsContext };
