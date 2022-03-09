import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    adminSidebar: false,
    filterSidebar: false,
    productCard: false,
    productCardId: '',
};

export const layoutSlice = createSlice({
    name: 'layout',
    initialState,
    reducers: {
        updateAdminSidebar: (state, action) => {
            state.adminSidebar = action.payload;
        },
        updateFilterSidebar: (state, action) => {
            state.filterSidebar = action.payload;
        },
        updateProductCard: (state, action) => {
            state.productCard = action.payload?.productCard;
            state.productCardId = action.payload?.productCardId;
        },
    },
});

export const { updateAdminSidebar, updateFilterSidebar, updateProductCard } =
    layoutSlice.actions;

export default layoutSlice.reducer;
