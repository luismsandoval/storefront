import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { useEffect } from "react";
import { RootState, store } from "../../app/store";
// import allProducts from "./data";

interface String {
  S: string;
}

interface Number {
  N: number;
}

export interface Product {
  id: String;
  image_url: String;
  name: String;
  description: String;
  category: String;
  price: String;
  inventory: Number;
}

export interface ProductState {
  status: "loading" | "idle";
  error: string | null;
  allProducts: Product[];
  selectedCategory: string | undefined;
  selectedProducts: Product[];
}

const initialState: ProductState = {
  status: "loading",
  error: null,
  allProducts: [],
  selectedCategory: undefined,
  selectedProducts: [],
};

export const fetchProducts = createAsyncThunk<Product[]>(
  "products/fetch",

  async (thunkApi) => {
    const response = await fetch("http://localhost:3001/products");
    const data: Product[] = await response.json();

    if (response.status !== 200) {
      return thunkApi.rejectWithValue({
        message: "Failed to fetch todos.",
      });
    }
    return data;
  }
);

export const updateProductInventory = createAsyncThunk<Product, Product>(
  "products/update",

  async (product, thunkApi) => {
    console.log("thunk: ", product);
    const response = await fetch(
      `http://localhost:3001/products/${product.id.S}`,
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          id: { S: product.id.S },
          inventory: { N: product.inventory.N-- },
        }),
      }
    );
    console.log(response);
    return response.json();
  }
);

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
              (product) => product.category.S === state.selectedCategory
            );
    },
    decrementInventory(state, action: PayloadAction<Product>) {
      for (const product of state.allProducts) {
        if (product.name.S === action.payload?.name.S) {
          product.inventory.N--;
        }
        state.selectedProducts =
          state.selectedCategory === undefined
            ? state.allProducts
            : state.allProducts.filter(
                (product) => product.category.S === state.selectedCategory
              );
      }
    },
    incrementInventory(state, action: PayloadAction<Product>) {
      for (const product of state.allProducts) {
        if (product.name.S === action.payload?.name.S) {
          product.inventory.N++;
        }
        state.selectedProducts =
          state.selectedCategory === undefined
            ? state.allProducts
            : state.allProducts.filter(
                (product) => product.category.S === state.selectedCategory
              );
      }
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchProducts.pending, (state) => {
      state.status = "loading";
      state.error = null;
    });

    builder.addCase(fetchProducts.fulfilled, (state, { payload }) => {
      state.allProducts = [...payload];
      state.selectedProducts = [...payload];
      state.status = "idle";
    });

    builder.addCase(fetchProducts.rejected, (state, { payload }) => {
      if (payload) state.error = payload.message;
      state.status = "idle";
    });
  },
});

export const { selectCategory, decrementInventory, incrementInventory } =
  productsSlice.actions;

export const selectedProducts = (state: RootState): Product[] =>
  state.products.selectedProducts;

export const currentStatus = (state: RootState): string =>
  state.products.status;

export const selectedCategory = (state: RootState): string | undefined =>
  state.products.selectedCategory;

export const selectStatus = (state: RootState) => state.products.status;

export default productsSlice.reducer;
