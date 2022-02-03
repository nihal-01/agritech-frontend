import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    isLoggedIn: false,
    user: {},
    token: '',
};

export const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        saveUser: (state, action) => {
            state.user = action.payload.user;
            state.token = action.payload.token;
            state.isLoggedIn = true;

            localStorage.setItem('token', action.payload.token);
        },
        logout: (state) => {
            state.isLoggedIn = false;
            state.user = {};
            state.token = '';
            localStorage.removeItem('token');
        },
    },
});

export const { saveUser, logout } = userSlice.actions;

export default userSlice.reducer;
