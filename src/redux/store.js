import { configureStore } from '@reduxjs/toolkit';

import {
    cartReducer,
    categoriesReducer,
    productsReducer,
    userReducer,
} from './slices';

export const store = configureStore({
    reducer: {
        user: userReducer,
        categories: categoriesReducer,
        products: productsReducer,
        cart: cartReducer,
    },
    devTools: true,
});
