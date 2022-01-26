import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from '../../axios';

const initialState = {
    categories: [],
    isEdit: false,
    editCategory: {},
};

const fetchCategories = createAsyncThunk(
    '/categories/fetchCategories',
    async () => {
        console.log('categories request');
        const response = await axios.get('/categories');
        return response.data;
    }
);

export const categoriesSlice = createSlice({
    name: 'categories',
    initialState,
    reducers: {
        addCategory: (state, action) => {
            state.categories.push(action.payload);
        },
        deleteCategory: (state, action) => {
            state.categories = state.categories.filter((category) => {
                return category._id !== action.payload;
            });
        },
        updateIsEdit: (state, action) => {
            state.isEdit = action.payload.isEdit;
            state.editCategory = action.payload?.category || {};
        },
        updateCategory: (state, action) => {
            const objIndex = state.categories.findIndex((category) => {
                return category._id === action.payload._id;
            });
            state.categories[objIndex] = action.payload;
        },
    },
    extraReducers: {
        [fetchCategories.fulfilled]: (state, action) => {
            state.categories = action.payload;
        },
    },
});

export const { addCategory, deleteCategory, updateIsEdit, updateCategory } =
    categoriesSlice.actions;

export { fetchCategories };

export default categoriesSlice.reducer;
