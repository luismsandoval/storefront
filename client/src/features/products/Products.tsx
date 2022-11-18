import {
  Card,
  CardContent,
  Typography,
  CardMedia,
  CardActions,
  Button,
  Skeleton,
  Box,
} from "@mui/material";
import Grid2 from "@mui/material/Unstable_Grid2/Grid2";
import { useAppSelector, useAppDispatch } from "../../app/hooks";
import {
  Product as SProduct,
  selectedProducts,
  decrementInventory,
  fetchProducts,
  currentStatus,
  updateProductInventory,
} from "./productsSlice";
import { addToCart } from "../cart/cartSlice";
import React from "react";

export const Products = () => {
  const products = useAppSelector(selectedProducts);
  const status = useAppSelector(currentStatus);

  return (
    <Grid2
      container
      spacing={3}
      direction="row"
      justifyContent="center"
      columns={4}
    >
      {status === "loading"
        ? [1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((value) => {
            return (
              <Grid2 key={value}>
                <Skeleton variant="rectangular" width={275} height={275} />
                <Box sx={{ pt: 0.5 }}>
                  <Skeleton />
                  <Skeleton width="60%" />
                </Box>
              </Grid2>
            );
          })
        : products
            .filter((product) => product.inventory.N > 0)
            .map((product, idx) => {
              return (
                <Grid2 key={idx}>
                  <Product product={product} />
                </Grid2>
              );
            })}
    </Grid2>
  );
};

export const Product = ({ product }: { product: SProduct }) => {
  const dispatch = useAppDispatch();
  const handleClick = (item: SProduct) => {
    dispatch(addToCart(item));
    dispatch(decrementInventory(item));
    dispatch(updateProductInventory(item))
  };

  return (
    <Card raised sx={{ width: 275, height: "auto" }}>
      <CardMedia component="img" image={product.image_url.S} />
      <CardContent>
        <Typography gutterBottom variant="body1" component="div">
          {product.name.S}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          {product.description.S}
        </Typography>
        <Typography variant="body2"> {product.price.S} </Typography>
        <Typography variant="body2"> {product.inventory.N} </Typography>
      </CardContent>
      <CardActions>
        <Button size="small">Details</Button>
        <Button
          size="small"
          onClick={(event: React.MouseEvent<HTMLButtonElement, MouseEvent>) =>
            handleClick(product)
          }
        >
          Add to cart
        </Button>
      </CardActions>
    </Card>
  );
};
