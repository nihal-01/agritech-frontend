import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from '../../axios';

const initialState = {
    products: [],
    loading: true,
    skip: 0,
    limit: 12,
    totalProducts: 0,
    gridView: true,
    search: '',
    sort: 'default',
    filters: {
        category: 'all',
        price: 0,
    },
    isEdit: false,
    editProductId: '',
};

const fetchProducts = createAsyncThunk(
    '/products/fetchProducts',
    async (args, { getState }) => {
        console.log('product request');
        const { skip, sort, filters, search } = getState().products;
        const response = await axios.get(
            `/products?skip=${skip}&sort=${sort}&category=${filters.category}&search=${search}`
        );
        return response.data;
    }
);

export const productsSlice = createSlice({
    name: 'products',
    initialState,
    reducers: {
        clearFilters: (state) => {
            state.loading = true;
            state.products = [];
            state.skip = 0;
            state.filters.category = 'all';
            state.filters.price = 0;
            state.sort = 'default';
            state.search = '';
        },
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
        updateIsEdit: (state, action) => {
            state.isEdit = action.payload.isEdit;
            state.editProductId = action.payload?.editProductId;
        },
        updateProduct: (state, action) => {
            const objIndex = state.products.findIndex((product) => {
                return product._id === action.payload._id;
            });
            state.products[objIndex] = action.payload;
        },
        updateSearch: (state, action) => {
            state.search = action.payload;
        },
        updateProductLoading: (state, action) => {
            state.loading = action.payload;
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
    updateIsEdit,
    updateProduct,
    clearFilters,
    updateSearch,
    updateProductLoading,
} = productsSlice.actions;

export { fetchProducts };

export default productsSlice.reducer;
