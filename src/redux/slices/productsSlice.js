import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from '../../axios';

const initialState = {
    products: [],
    loading: true,
    skip: 0,
    limit: 12,
    totalProducts: 0,
    gridView: true,
    sort: 'default',
    filters: {
        category: 'all',
        price: 0,
    },
};

const fetchProducts = createAsyncThunk(
    '/products/fetchProducts',
    async (args, { getState }) => {
        console.log('product request');
        const { skip, sort, filters } = getState().products;
        const response = await axios.get(
            `/products?skip=${skip}&sort=${sort}&category=${filters.category}`
        );
        return response.data;
    }
);

export const productsSlice = createSlice({
    name: 'products',
    initialState,
    reducers: {
        updateSkip: (state, action) => {
            state.skip = action.payload;
        },
        updateCategory: (state, action) => {
            state.skip = 0;
            state.filters.category = action.payload;
        },
        updateSort: (state, action) => {
            state.skip = 0;
            state.sort = action.payload;
        },
        deleteProduct: (state, action) => {
            state.products = state.products.filter((product) => {
                return product._id !== action.payload;
            });
        },
    },
    extraReducers: {
        [fetchProducts.fulfilled]: (state, action) => {
            state.products = action.payload.products;
            state.skip = action.payload.skip;
            state.limit = action.payload.limit;
            state.totalProducts = action.payload.totalProducts;
            state.loading = false;
        },
    },
});

export const {
    updateSkip,
    setMinAndMaxPrice,
    updateCategory,
    updateSort,
    deleteProduct,
} = productsSlice.actions;

export { fetchProducts };

export default productsSlice.reducer;
