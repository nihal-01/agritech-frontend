import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    isLoggedIn: false,
    user: {},
    token: '',
    allUsers: [],
    search: '',
    skip: 0,
    totalUsers: 0,
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
        setAllUsers: (state, action) => {
            state.allUsers = action.payload.users;
            state.totalUsers = action.payload.totalUsers;
        },
        updateSkip: (state, action) => {
            state.skip = action.payload;
        },
        updateSearch: (state, action) => {
            state.search = action.payload;
        },
        deleteUser: (state, action) => {
            state.allUsers = state.allUsers.filter((user) => {
                return user._id !== action.payload;
            });
        },
        updateUser: (state, action) => {
            state.user.fname = action.payload.fname;
            state.user.lname = action.payload.lname;
            state.user.email = action.payload.email;
            state.user.avatar = action.payload.avatar;
        },
    },
});

export const {
    saveUser,
    logout,
    setAllUsers,
    updateSkip,
    updateSearch,
    deleteUser,
    updateUser,
} = userSlice.actions;

export default userSlice.reducer;
