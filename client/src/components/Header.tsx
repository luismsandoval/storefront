import { Typography, AppBar, Toolbar, Card } from "@mui/material";
import { Lightswitch } from "./Lightswitch";
import { SimpleCart } from "../features/cart/SimpleCart";

export const Header = () => {
  return (
    <AppBar position="sticky">
      <Toolbar>
        <Typography variant="h2" sx={{ flexGrow: 1 }}>
          Storefront
        </Typography>
        <Lightswitch />
        <SimpleCart />
      </Toolbar>
    </AppBar>
  );
};
