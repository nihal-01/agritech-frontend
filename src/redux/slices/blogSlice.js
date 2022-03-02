import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from '../../axios';

const initialState = {
    posts: [],
    postCategories: [],
    skip: 0,
    totalPosts: 0,
    limit: 0,
    loading: true,
    blogComments: [],
    recentPosts: [],
    recentLoading: true,
};

const fetchPosts = createAsyncThunk(
    '/blog/fetchPosts',
    async (args, { getState }) => {
        console.log('posts fetching');
        const { skip } = getState().blog;
        const response = await axios.get(`/posts?skip=${skip}`);
        return response.data;
    }
);

const fetchPostCategories = createAsyncThunk(
    '/blog/fetchPostCategories',
    async (args, { getState }) => {
        console.log('post categories fetching');
        const response = await axios.get('/post-categories');
        return response.data;
    }
);

const fetchRecentPosts = createAsyncThunk(
    '/blog/fetchRecentPosts',
    async (args, { getState }) => {
        console.log('recent post fetching');
        const response = await axios.get(`/posts?limit=${5}`);
        return response.data;
    }
);

const blogSlice = createSlice({
    name: 'blog',
    initialState,
    reducers: {
        updateSkip: (state, action) => {
            state.skip = action.payload;
        },
        deletePost: (state, action) => {
            state.posts = state.posts.filter((product) => {
                return product._id !== action.payload;
            });
        },
        clearPostFilters: (state, action) => {
            state.loading = true;
            state.limit = 0;
            state.posts = [];
            state.totalPosts = 0;
            state.skip = 0;
        },
        updatePostLoading: (state, action) => {
            state.loading = action.payload;
        },
        setBlogComments: (state, action) => {
            state.blogComments = action.payload;
        },
        updateBlogComments: (state, action) => {
            state.blogComments.push(action.payload);
        },
    },
    extraReducers: {
        [fetchPosts.fulfilled]: (state, action) => {
            state.totalPosts = action.payload.totalPosts;
            state.skip = action.payload.skip;
            state.limit = action.payload.limit;
            state.posts = action.payload.posts;
            state.loading = false;
        },
        [fetchPostCategories.fulfilled]: (state, action) => {
            state.postCategories = action.payload;
        },
        [fetchRecentPosts.fulfilled]: (state, action) => {
            state.recentPosts = action.payload.posts;
            state.recentLoading = false;
        },
    },
});

export { fetchPostCategories, fetchPosts, fetchRecentPosts };

export const {
    updateSkip,
    deletePost,
    clearPostFilters,
    updatePostLoading,
    setBlogComments,
    updateBlogComments,
} = blogSlice.actions;

export default blogSlice.reducer;
