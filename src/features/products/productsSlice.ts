import { createEntityAdapter, createSlice, type PayloadAction } from '@reduxjs/toolkit';
import type { Product } from '@/features/products/types';
import { mockProducts } from '@/data/mockProducts';

const productsAdapter = createEntityAdapter<Product>();

const initialState = productsAdapter.getInitialState();
const seededState = productsAdapter.setAll(initialState, mockProducts);

const productsSlice = createSlice({
  name: 'products',
  initialState: seededState,
  reducers: {
    addProduct: productsAdapter.addOne,
    updateProduct: productsAdapter.updateOne,
    deleteProduct: (state, action: PayloadAction<string>) => {
      productsAdapter.removeOne(state, action.payload);
    },
  },
});

export const { addProduct, updateProduct, deleteProduct } = productsSlice.actions;

export const {
  selectAll: selectAllProducts,
  selectById: selectProductById,
  selectIds: selectProductIds,
} = productsAdapter.getSelectors((state: { products: ReturnType<typeof productsSlice.reducer> }) => state.products);

export default productsSlice.reducer;
