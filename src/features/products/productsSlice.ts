import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../../app/store";
import allProducts from "./data";

export interface Product {
  image_url: string;
  name: string;
  description: string;
  category: string;
  price: string;
  inventory: number;
}

export interface ProductState {
  selectedCategory: string | undefined;
  allProducts: Product[];
}

const initialState: ProductState = {
  selectedCategory: undefined,
  allProducts,
};

export const productsSlice = createSlice({
  name: "products",
  initialState,
  reducers: {
    selectCategory(state, action: PayloadAction<string | undefined>) {
      state.selectedCategory = action.payload;
      state.allProducts =
        state.selectedCategory === undefined
          ? allProducts
          : allProducts.filter(
              (product) => product.category === state.selectedCategory
            );
    },
  },
});

export const { selectCategory } = productsSlice.actions;

export const selectedProducts = (state: RootState): Product[] =>
  state.products.allProducts;

export const selectedCategory = (state: RootState): string | undefined => state.products.selectedCategory;

export default productsSlice.reducer;
