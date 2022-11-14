import {
  Card,
  CardContent,
  Typography,
  CardMedia,
  CardActions,
  Button,
} from "@mui/material";
import Grid2 from "@mui/material/Unstable_Grid2/Grid2";
import { useAppSelector, useAppDispatch } from "../../app/hooks";
import {
  Product as SProduct,
  selectedProducts,
  decrementInventory,
} from "./productsSlice";
import { addToCart } from "../cart/cartSlice";
import React from "react";

export const Products = () => {
  const products = useAppSelector(selectedProducts);
  return (
    <Grid2
      container
      spacing={3}
      direction="row"
      justifyContent="center"
      columns={4}
    >
      {products
        .filter((product) => product.inventory > 0)
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
  };

  return (
    <Card raised sx={{ width: 275, height: "auto" }}>
      <CardMedia component="img" image={product.image_url} />
      <CardContent>
        <Typography gutterBottom variant="body1" component="div">
          {product.name}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          {product.description}
        </Typography>
        <Typography variant="body2"> {product.price} </Typography>
        <Typography variant="body2"> {product.inventory} </Typography>
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
