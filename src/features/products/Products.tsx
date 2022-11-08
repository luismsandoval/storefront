import {
  Card,
  CardContent,
  Typography,
  CardMedia,
  CardActions,
  Button,
} from "@mui/material";
import Grid2 from "@mui/material/Unstable_Grid2/Grid2";
import { useAppSelector } from "../../app/hooks";
import { Product as SProduct, selectedProducts } from "./productsSlice";

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
      {products.map((product) => {
        return (
          <Grid2>
            <Product product={product} />
          </Grid2>
        );
      })}
    </Grid2>
  );
};

export const Product = ({ product }: { product: SProduct }) => {
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
      </CardContent>
      <CardActions>
        <Button size="small">Details</Button>
        <Button size="small">Add to cart</Button>
      </CardActions>
    </Card>
  );
};
