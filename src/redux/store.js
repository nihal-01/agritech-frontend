import { configureStore } from '@reduxjs/toolkit';
import { categoriesReducer, productsReducer, userReducer } from './slices';

export const store = configureStore({
    reducer: {
        user: userReducer,
        categories: categoriesReducer,
        products: productsReducer,
    },
    devTools: true,
});
