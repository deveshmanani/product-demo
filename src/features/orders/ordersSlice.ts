import { createEntityAdapter, createSlice } from '@reduxjs/toolkit';
import type { Order } from '@/features/products/types';

const ordersAdapter = createEntityAdapter<Order>();

const ordersSlice = createSlice({
  name: 'orders',
  initialState: ordersAdapter.getInitialState(),
  reducers: {
    createOrder: ordersAdapter.addOne,
  },
});

export const { createOrder } = ordersSlice.actions;

export const {
  selectAll: selectAllOrders,
  selectById: selectOrderById,
} = ordersAdapter.getSelectors((state: { orders: ReturnType<typeof ordersSlice.reducer> }) => state.orders);

export default ordersSlice.reducer;
