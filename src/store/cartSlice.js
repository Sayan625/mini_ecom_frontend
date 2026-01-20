import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  cart: null,
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    setCart(state, action) {
      state.cart = action.payload;
    },
    clearCart(state) {
      state.cart = null;
    },
  },
});

export const { setCart, clearCart } = cartSlice.actions;
export default cartSlice.reducer;
