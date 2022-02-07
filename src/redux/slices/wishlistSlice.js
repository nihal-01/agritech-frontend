import { createSlice } from '@reduxjs/toolkit';

const getWishlist = () => {
    if (localStorage.getItem('wishlist')) {
        return JSON.parse(localStorage.getItem('wishlist'));
    }
    return [];
};

const initialState = {
    wishlistItems: getWishlist(),
};

const wishlistSlice = createSlice({
    name: 'wishlist',
    initialState,
    reducers: {
        addToWishlist: (state, action) => {
            state.wishlistItems.push(action.payload);
        },
        deleteWishlist: (state, action) => {
            state.wishlistItems = state.wishlistItems.filter((item) => {
                return item._id !== action.payload;
            });
        },
    },
});

export const { addToWishlist, deleteWishlist } = wishlistSlice.actions;

export default wishlistSlice.reducer;
