import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  products: [],
  // pagination
  page: 0,
  size: 10,
  totalPages: 0,
  totalElements: 0,
};

const productSlice = createSlice({
  name: "product",
  initialState,
  reducers: {
    setProductPage(state, action) {
      const { content, page, size, totalPages, totalElements } = action.payload;

      state.products = content;
      state.page = page;
      state.size = size;
      state.totalPages = totalPages;
      state.totalElements = totalElements;
    },

    updateProduct(state, action) {
      const updated = action.payload;
      const index = state.products.findIndex(p => p.id === updated.id);
      if (index !== -1) {
        state.products[index] = updated;
      }
    },


    setPage(state, action) {
      state.page = action.payload;
    },

    clearProducts(state) {
      return initialState;
    },
  },
});

export const {
  setProductPage,
  addProduct,
  updateProduct,
  setCategories,
  setPage,
  clearProducts,
} = productSlice.actions;

export default productSlice.reducer;
