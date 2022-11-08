import { Box, Typography } from "@mui/material";
import { useAppSelector } from "../app/hooks";
import { selectedCategory } from "../features/products/productsSlice";

export const ActiveCategory = () => {
  const category = useAppSelector(selectedCategory);
  return (
    <Box>
      <Typography variant="h3" align="center">
        {category === undefined ? "All Items" : category}
      </Typography>
    </Box>
  );
};
