import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    isLoggedIn: false,
    user: {},
};

export const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        saveUser: (state, action) => {
            state.isLoggedIn = true;
            state.user = action.payload;

            localStorage.setItem('token', action.payload.token);
        },
        logout: (state) => {
            state.isLoggedIn = false;
            state.user = {};
            localStorage.removeItem('token');
        },
    },
});

export const { saveUser, logout } = userSlice.actions;

export default userSlice.reducer;
