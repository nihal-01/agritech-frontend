import { configureStore } from '@reduxjs/toolkit';

import {
    cartReducer,
    categoriesReducer,
    layoutReducer,
    productsReducer,
    userReducer,
    wishlistReducer,
} from './slices';

export const store = configureStore({
    reducer: {
        user: userReducer,
        categories: categoriesReducer,
        products: productsReducer,
        cart: cartReducer,
        wishlist: wishlistReducer,
        layout: layoutReducer,
    },
    devTools: true,
});
