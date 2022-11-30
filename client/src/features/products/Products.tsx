import {
  Card,
  CardContent,
  Typography,
  CardMedia,
  CardActions,
  Button,
  Skeleton,
  Box,
  Modal,
  ImageList,
  ImageListItem,
  ImageListItemBar,
  IconButton,
} from "@mui/material";
import Grid2 from "@mui/material/Unstable_Grid2/Grid2";
import InfoIcon from "@mui/icons-material/Info";
import { useAppSelector, useAppDispatch } from "../../app/hooks";
import {
  Product as SProduct,
  selectedProducts,
  decrementInventory,
  currentStatus,
  updateProductInventory,
} from "./productsSlice";
import { addToCart } from "../cart/cartSlice";
import React, { useState } from "react";
import { Container } from "@mui/system";

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
                  <Product product={product} products={products} />
                </Grid2>
              );
            })}
    </Grid2>
  );
};

interface FuncProps {
  open: boolean;
  handleModal: () => void;
  handleClick: (product: SProduct) => void;
  product: SProduct;
  products: SProduct[];
}

export const Product = ({
  product,
  products,
}: {
  product: SProduct;
  products: SProduct[];
}) => {
  const [open, setOpen] = useState(false);

  const dispatch = useAppDispatch();
  const handleClick = (item: SProduct) => {
    dispatch(addToCart(item));
    dispatch(decrementInventory(item));
    dispatch(updateProductInventory(item));
  };

  const handleModal = () => {
    setOpen(!open);
  };

  return (
    <>
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
          <Button
            size="small"
            onClick={(event: React.MouseEvent<HTMLButtonElement, MouseEvent>) =>
              handleModal()
            }
          >
            Details
          </Button>
          <Button
            size="small"
            onClick={(event: React.MouseEvent<HTMLButtonElement, MouseEvent>) =>
              handleClick(product)
            }
          >
            Add to cart
          </Button>
        </CardActions>
        <ProductModal
          open={open}
          handleModal={handleModal}
          handleClick={handleClick}
          product={product}
          products={products}
        />
      </Card>
    </>
  );
};

export const ProductModal: React.FC<FuncProps> = ({
  open,
  handleModal,
  handleClick,
  product,
  products,
}) => {
  const style = {
    position: "absolute" as "absolute",
    bottom: "50%",
    left: "50%",
    transform: "translate(-50%, 50%)",
    width: "auto",
    height: "85%",
    bgcolor: "background.paper",
    border: "2px solid #000",
    boxShadow: 24,
    p: 4,
    textAlign: "center",
  };

  return (
    <Modal
      open={open}
      onClose={(event: React.MouseEvent<HTMLButtonElement, MouseEvent>) =>
        handleModal()
      }
    >
      <Container>
        <Box sx={style}>
          <img src={product.image_url.S} alt={product.name.S} width={450}></img>
          <Box sx={{ float: "left", position: "absolute", marginLeft: "10" }}>
            <Typography id="modal-modal-title" variant="h6" component="h2">
              {product.name.S}
            </Typography>
            <Typography id="modal-modal-description">
              {product.description.S}
            </Typography>
            <Typography variant="h6">{product.price.S}</Typography>
          </Box>
          <Box>
            <Button
              size="small"
              onClick={(
                event: React.MouseEvent<HTMLButtonElement, MouseEvent>
              ) => handleClick(product)}
              sx={{ float: "right", marginRight: "10" }}
            >
              Add to cart
            </Button>
          </Box>
          <ImgList />
        </Box>
      </Container>
    </Modal>
  );
};

export const ImgList = () => {
  const products = useAppSelector(selectedProducts);

  return (
    <Container sx={{ textAlign: "center", mt: "10%" }}>
      <Typography>
        Recommended products:
      </Typography>
      <ImageList
        sx={{ height: "400px", textAlign: "center" }}
        cols={3}
        rowHeight={"auto"}
      >
        {products.map((product: SProduct) => (
          <ImageListItem>
            <img src={product.image_url.S} alt={product.name.S} />
            <ImageListItemBar
              title={product.name.S}
              subtitle={product.price.S}
              actionIcon={
                <IconButton
                  sx={{ color: "rgba(255, 255, 255, 0.54)" }}
                  aria-label={`info about ${product.description.S}`}
                >
                  <InfoIcon />
                </IconButton>
              }
            />
          </ImageListItem>
        ))}
      </ImageList>
    </Container>
  );
};
