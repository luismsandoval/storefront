import { Typography, AppBar, Toolbar } from "@mui/material";
import { Lightswitch } from "./Lightswitch";

export const Header = () => {
  return (
    <AppBar position="sticky">
      <Toolbar>
        <Typography variant="h2" sx={{ flexGrow: 1 }}>
          Storefront
        </Typography>
        <Lightswitch />
        <Typography>
          Cart
        </Typography>
      </Toolbar>
    </AppBar>
  );
};
