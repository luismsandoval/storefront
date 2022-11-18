import {
  Button,
  Drawer,
  List,
  Box,
  ListItem,
  Typography,
  Divider,
  ListItemText,
  ListItemButton,
  Card,
} from "@mui/material";
import { useState } from "react";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import {
  incrementInventory,
  decrementInventory,
} from "../products/productsSlice";
import { cart, removeFromCart, addToCart, Product } from "./cartSlice";

export const SimpleCart = () => {
  const shoppingCart = useAppSelector(cart);
  const dispatch = useAppDispatch();

  const handleDelete = (product: Product) => {
    dispatch(removeFromCart(product));
    dispatch(incrementInventory(product));
  };

  const handleIncrement = (product: Product) => {
    dispatch(addToCart(product));
    dispatch(decrementInventory(product));
  };

  const list = (callback: Function) => (
    <Box
      sx={{ width: 250 }}
      role="presentation"
      onClick={toggleDrawer}
      onKeyDown={toggleDrawer}
    >
      <List>
        <ListItem disablePadding>
          <Typography variant="h4">Cart</Typography>
          <Button onClick={() => callback()} sx={{ flexGrow: 1 }}>
            Close
          </Button>
        </ListItem>
        <Divider />
        {shoppingCart
          /*.filter(
            (value, index, self) =>
              index === self.findIndex((t) => t.name === value.name)
          )*/
          .map((product, idx) => {
            return (
              <ListItem key={idx} disablePadding>
                <ListItemButton>{product.name.S}</ListItemButton>
                <ListItemButton
                  onClick={(event) => {
                    handleDelete(product);
                  }}
                >
                  -
                </ListItemButton>
                <ListItemText primary={product.inventory.N} />
                <ListItemButton
                  onClick={(event) => {
                    handleIncrement(product);
                  }}
                >
                  +
                </ListItemButton>
              </ListItem>
            );
          })}
      </List>
    </Box>
  );

  const [state, setState] = useState(false);
  const toggleDrawer = (event: React.KeyboardEvent | React.MouseEvent) => {
    setState(!state);
  };

  return (
    <>
      <Card>
        <Button onClick={toggleDrawer}>cart[{shoppingCart.length}]</Button>
      </Card>
      <Drawer
        anchor="right"
        variant="persistent"
        open={state}
        // onClose={toggleDrawer}
        ModalProps={{
          keepMounted: true,
        }}
      >
        {list(toggleDrawer)}
      </Drawer>
    </>
  );
};
