import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import './AdminBlogPage.scss';
import { adminNotFoundImg } from '../../../assets/images';
import AdminBlogSidebar from '../../../components/admin/AdminBlogSidebar/AdminBlogSidebar';
import { Loader } from '../../../components/customer';
import {
    clearPostFilters,
    fetchPostCategories,
    fetchPosts,
    updateBlogSearch,
    updatePostLoading,
    updateSkip,
} from '../../../redux/slices/blogSlice';
import AdminBlogSingleRow from './AdminBlogSingleRow';

function AdminBlogPage() {
    const [isBlogSidebarOpen, setBlogSidebarOpen] = useState(false);
    const [pageNumbers, setPageNumbers] = useState([]);
    const [searchTxt, setSearchTxt] = useState('');

    const { posts, skip, limit, totalPosts, loading, search } = useSelector(
        (state) => state.blog
    );
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(updatePostLoading(true));
        dispatch(fetchPostCategories());
        dispatch(fetchPosts());
    }, [dispatch, skip, search]);

    useEffect(() => {
        return () => {
            dispatch(clearPostFilters());
        };
    }, [dispatch]);

    useEffect(() => {
        const pageNo = [];
        for (var i = 1; i <= Math.ceil(totalPosts / limit); i++) {
            pageNo.push(i);
        }
        setPageNumbers(pageNo);
    }, [limit, totalPosts]);

    return (
        <div className='adminBlog'>
            <h1 className='adminBlog__title'>Blog</h1>
            <AdminBlogSidebar
                isBlogSidebarOpen={isBlogSidebarOpen}
                setBlogSidebarOpen={setBlogSidebarOpen}
            />
            <div className='adminBlog__options'>
                <form
                    className='adminBlog__options__search'
                    onSubmit={(e) => {
                        e.preventDefault();
                        dispatch(updateBlogSearch(searchTxt));
                    }}
                >
                    <input
                        type='text'
                        placeholder='Search blogs by name'
                        name='search'
                        onChange={(e) => {
                            setSearchTxt(e.target.value);
                        }}
                    />
                </form>
                <div className='adminBlog__options__button'>
                    <button
                        onClick={() => {
                            setBlogSidebarOpen(true);
                        }}
                    >
                        <span>+ Add Blog</span>
                    </button>
                </div>
            </div>
            {loading ? (
                <div className='adminBlog__loading'>
                    <Loader color={'#fff'} />
                </div>
            ) : posts.length < 1 ? (
                <div className='adminBlog__notFound'>
                    <img src={adminNotFoundImg} alt='' />
                    <p>Sorry, posts not found</p>
                </div>
            ) : (
                <div className='admin__table-wrapper'>
                    <div className='admin__table'>
                        <table>
                            <thead>
                                <tr>
                                    <th>Id</th>
                                    <th>Thumbnail</th>
                                    <th>Title</th>
                                    <th>Created</th>
                                    <th>Category</th>
                                    <th>Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                {posts.map((post) => {
                                    return (
                                        <AdminBlogSingleRow
                                            key={post._id}
                                            post={post}
                                        />
                                    );
                                })}
                            </tbody>
                        </table>
                    </div>

                    <div className='admin__table__bottom'>
                        <div className='admin__table__bottom__results'>
                            SHOWING {limit * skip + 1} -{' '}
                            {limit * (skip + 1) <= totalPosts
                                ? limit * (skip + 1)
                                : totalPosts}{' '}
                            OF {totalPosts}
                        </div>
                        <div className='admin__table__bottom__pagination'>
                            <button
                                className='admin__table__bottom__pagination__btn'
                                onClick={() => {
                                    dispatch(updateSkip(skip - 1));
                                }}
                                disabled={skip <= 0}
                            >
                                &lt;
                            </button>
                            {pageNumbers.map((number) => {
                                return (
                                    <button
                                        key={number}
                                        onClick={() => {
                                            dispatch(updateSkip(number - 1));
                                        }}
                                        className={
                                            skip + 1 === number
                                                ? 'admin__table__bottom__pagination__btn admin__table__bottom__pagination__btn__active'
                                                : 'admin__table__bottom__pagination__btn'
                                        }
                                    >
                                        {number}
                                    </button>
                                );
                            })}
                            <button
                                className='admin__table__bottom__pagination__btn'
                                onClick={() => {
                                    dispatch(updateSkip(skip + 1));
                                }}
                                disabled={
                                    skip + 1 >= Math.ceil(totalPosts / limit)
                                }
                            >
                                &gt;
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}

export default AdminBlogPage;
