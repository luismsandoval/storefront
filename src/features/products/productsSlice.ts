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
  selectedProducts: Product[];
}

const initialState: ProductState = {
  selectedCategory: undefined,
  allProducts,
  selectedProducts: allProducts,
};

export const productsSlice = createSlice({
  name: "products",
  initialState,
  reducers: {
    selectCategory(state, action: PayloadAction<string | undefined>) {
      state.selectedCategory = action.payload;
      state.selectedProducts =
        state.selectedCategory === undefined
          ? state.allProducts
          : state.allProducts.filter(
              (product) => product.category === state.selectedCategory
            );
    },
    decrementInventory(state, action: PayloadAction<Product>) {
      for (const product of state.allProducts) {
        if (product.name === action.payload?.name) {
          product.inventory--;
        }
        state.selectedProducts =
          state.selectedCategory === undefined
            ? state.allProducts
            : state.allProducts.filter(
                (product) => product.category === state.selectedCategory
              );
      }
    },
    incrementInventory(state, action: PayloadAction<Product>) {
      for (const product of state.allProducts) {
        if (product.name === action.payload?.name) {
          product.inventory++;
        }
        state.selectedProducts =
          state.selectedCategory === undefined
            ? state.allProducts
            : state.allProducts.filter(
                (product) => product.category === state.selectedCategory
              );
      }
    },
  },
});

export const { selectCategory, decrementInventory, incrementInventory } =
  productsSlice.actions;

export const selectedProducts = (state: RootState): Product[] =>
  state.products.selectedProducts;

export const selectedCategory = (state: RootState): string | undefined =>
  state.products.selectedCategory;

export default productsSlice.reducer;
