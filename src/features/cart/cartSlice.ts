import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../../app/store";

export interface Product {
  image_url: string;
  name: string;
  description: string;
  category: string;
  price: string;
  inventory: number;
}

interface CartState {
  cart: Product[];
  // cart: Map<Product, number>;
}

const initialState: CartState = {
  cart: [],
  // cart: new Map(),
};

export const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addToCart(state, action: PayloadAction<Product>) {
      for (const product of state.cart) {
        if (product.name === action.payload.name) {
          product.inventory++;
          return;
        }
      }
      state.cart.push({ ...action.payload, inventory: 1 });
    },
    removeFromCart(state, action: PayloadAction<Product>) {
      for (let i = 0; i <= state.cart.length; i++) {
        if (state.cart[i].name === action.payload.name) {
          state.cart[i].inventory--;
          if (state.cart[i].inventory <= 0) {
            state.cart.splice(i, 1);
          }
          return;
        }
      }
    },
  },
});

export const { addToCart, removeFromCart } = cartSlice.actions;

export const cart = (state: RootState): Product[] => state.cart.cart;

export default cartSlice.reducer;
