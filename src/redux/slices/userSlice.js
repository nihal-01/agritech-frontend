import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from '../../axios';

const initialState = {
    isLoggedIn: false,
    user: {},
    token: '',
    allUsers: [],
    search: '',
    skip: 0,
    totalUsers: 0,
    loading: true,
};

const fetchUsers = createAsyncThunk(
    '/user/fetchUsers',
    async (args, { getState }) => {
        const { skip, search, token } = getState().user;
        const response = await axios.get(
            `/users/all?skip=${skip}&search=${search}`,
            {
                headers: { Authorization: `Bearer ${token}` },
            }
        );
        return response.data;
    }
);

export const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        clearUserFilters: (state, action) => {
            state.loading = true;
            state.allUsers = [];
            state.skip = 0;
            state.search = '';
        },
        saveUser: (state, action) => {
            localStorage.setItem('token', action.payload.token);

            state.user = action.payload.user;
            state.token = action.payload.token;
            state.isLoggedIn = true;
        },
        logout: (state) => {
            state.isLoggedIn = false;
            state.user = {};
            state.token = '';
            localStorage.removeItem('token');
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
        updateUserLoading: (state, action) => {
            state.loading = action.payload;
        },
    },
    extraReducers: {
        [fetchUsers.fulfilled]: (state, action) => {
            state.allUsers = action.payload.users;
            state.totalUsers = action.payload.totalUsers;
            state.skip = action.payload.skip;
            state.loading = false;
        },
    },
});

export const {
    saveUser,
    logout,
    updateSkip,
    updateSearch,
    deleteUser,
    updateUser,
    clearUserFilters,
    updateUserLoading,
} = userSlice.actions;

export { fetchUsers };

export default userSlice.reducer;
