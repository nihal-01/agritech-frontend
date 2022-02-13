import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    adminSidebar: false,
};

export const layoutSlice = createSlice({
    name: 'layout',
    initialState,
    reducers: {
        updateAdminSidebar: (state, action) => {
            state.adminSidebar = action.payload;
        },
    },
});

export const { updateAdminSidebar } = layoutSlice.actions;

export default layoutSlice.reducer;
