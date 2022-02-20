import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    adminSidebar: false,
    filterSidebar: false,
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
    },
});

export const { updateAdminSidebar, updateFilterSidebar } = layoutSlice.actions;

export default layoutSlice.reducer;
