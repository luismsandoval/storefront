import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../../app/store";
import { Product } from "../products/productsSlice";

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
        if (product.name.S === action.payload.name.S) {
          product.inventory.N++;
          return;
        }
      }
      state.cart.push({ ...action.payload, inventory: {N: 1} });
    },
    removeFromCart(state, action: PayloadAction<Product>) {
      for (let i = 0; i <= state.cart.length; i++) {
        if (state.cart[i].name.S === action.payload.name.S) {
          state.cart[i].inventory.N--;
          if (state.cart[i].inventory.N <= 0) {
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
