import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    orders: [],
    skip: 0,
    totalOrders: 0,
    status: 'all',
    payType: 'all',
    time: 'all',
};

export const ordersSlice = createSlice({
    name: 'orders',
    initialState,
    reducers: {
        setAllOrders: (state, action) => {
            state.orders = action.payload.orders;
            state.skip = action.payload.skip;
            state.totalOrders = action.payload.totalOrders;
        },
        updateSkip: (state, action) => {
            state.skip = action.payload;
        },
        updateStatus: (state, action) => {
            const objIndex = state.orders.findIndex((order) => {
                return order._id === action.payload._id;
            });
            state.orders[objIndex].orderStatus = action.payload.status;
        },
    },
});

export const { setAllOrders, updateSkip, updateStatus } = ordersSlice.actions;

export default ordersSlice.reducer;
