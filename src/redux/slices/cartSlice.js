import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from '../../axios';
import { logout, saveUser } from './userSlice';

const initialState = {
    cartItems: [],
    cartTotal: 0,
    cartCount: 0,
    cartLoading: true,
    isFetch: false,
};

const getCartItems = createAsyncThunk(
    '/cart/getCartItems',
    async (args, { getState }) => {
        console.log('get cart request');
        const { token } = getState().user;
        const response = await axios.get('/cart', {
            headers: { Authorization: `Bearer ${token}` },
        });
        return response.data;
    }
);

export const cartSlice = createSlice({
    name: 'cart',
    initialState,
    reducers: {
        addItemToCart: (state, action) => {
            for (let i = 0; i < state.cartItems.length; i++) {
                if (state.cartItems[i].productId === action.payload._id) {
                    state.cartItems[i].quantity++;
                    state.cartCount += 1;
                    state.cartTotal += action.payload.price;
                    return;
                }
            }
            state.cartItems.push({
                productId: action.payload._id,
                quantity: 1,
                product: action.payload,
            });
            state.cartCount += 1;
            state.cartTotal += action.payload.price;
        },
        deleteCartItem: (state, action) => {
            state.cartCount -= action.payload.quantity;
            state.cartTotal -=
                action.payload.quantity * action.payload.product.price;
            state.cartItems = state.cartItems.filter((item) => {
                return item.productId !== action.payload.productId;
            });
        },
    },
    extraReducers: {
        [getCartItems.fulfilled]: (state, action) => {
            state.cartItems = action.payload.cartItems;
            state.cartTotal = action.payload.cartTotal;
            let total = 0;
            for (let i = 0; i < action.payload.cartItems.length; i++) {
                total += action.payload.cartItems[i].quantity;
            }
            state.cartCount = total;
            state.cartLoading = false;
        },
        [getCartItems.rejected]: (state, action) => {
            state.cartLoading = false;
        },
        [logout]: (state, action) => {
            state.cartItems = [];
            state.cartTotal = 0;
            state.cartCount = 0;
        },
        [saveUser]: (state, action) => {
            state.isFetch = !state.isFetch;
        },
    },
});

export const { addItemToCart, deleteCartItem } = cartSlice.actions;

export { getCartItems };

export default cartSlice.reducer;
