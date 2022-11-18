import { FormControlLabel, FormGroup, Switch } from "@mui/material";
import { useContext } from "react";
import { SettingsContext } from "../app/context";

export const Lightswitch = () => {
  const { toggleDarkMode, darkMode } = useContext(SettingsContext);
  const handleClick = () => toggleDarkMode();

  return (
    <FormControlLabel
      control={<Switch onChange={handleClick} checked={darkMode} />}
      label={darkMode ? "🌙" : "☀️"}
    />
  );
};
