import React, { useEffect } from 'react';
import { BsSearch } from 'react-icons/bs';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import {
    fetchPostCategories,
    fetchRecentPosts,
} from '../../../redux/slices/blogSlice';

import './BlogSidebar.scss';
import RecentPost from './RecentPost';

function BlogSidebar() {
    const { recentPosts, postCategories, recentLoading } = useSelector(
        (state) => state.blog
    );
    const dispatch = useDispatch();

    useEffect(() => {
        console.log('fetching blog sidebar...');
        dispatch(fetchPostCategories());
        dispatch(fetchRecentPosts());
    }, [dispatch]);

    return (
        <div className='blogSidebar'>
            <form className='blogSidebar__search'>
                <span>
                    <BsSearch />
                </span>
                <input type='text' placeholder='Search...' />
                <button>Search</button>
            </form>
            {recentLoading ? (
                <div className='blogSidebar__loading'>
                    <div className='blogSidebar__loading__categories'>
                        <div className='blogSidebar__loading__categories__title'></div>
                        <div className='blogSidebar__loading__categories__ul'>
                            <div className='blogSidebar__loading__categories__li'></div>
                            <div className='blogSidebar__loading__categories__li'></div>
                            <div className='blogSidebar__loading__categories__li'></div>
                            <div className='blogSidebar__loading__categories__li'></div>
                            <div className='blogSidebar__loading__categories__li'></div>
                        </div>
                    </div>

                    <div className='blogSidebar__loading__recent'>
                        <div className='blogSidebar__loading__recent__title'></div>
                        <div className='blogSidebar__loading__recent__posts'>
                            <div className='blogSidebar__loading__recent__posts__item'>
                                <div className='blogSidebar__loading__recent__posts__item__img'></div>
                                <div className='blogSidebar__loading__recent__posts__item__content'>
                                    <div className='blogSidebar__loading__recent__posts__item__content__h4'></div>
                                    <div className='blogSidebar__loading__recent__posts__item__content__date'></div>
                                </div>
                            </div>
                            <div className='blogSidebar__loading__recent__posts__item'>
                                <div className='blogSidebar__loading__recent__posts__item__img'></div>
                                <div className='blogSidebar__loading__recent__posts__item__content'>
                                    <div className='blogSidebar__loading__recent__posts__item__content__h4'></div>
                                    <div className='blogSidebar__loading__recent__posts__item__content__date'></div>
                                </div>
                            </div>
                            <div className='blogSidebar__loading__recent__posts__item'>
                                <div className='blogSidebar__loading__recent__posts__item__img'></div>
                                <div className='blogSidebar__loading__recent__posts__item__content'>
                                    <div className='blogSidebar__loading__recent__posts__item__content__h4'></div>
                                    <div className='blogSidebar__loading__recent__posts__item__content__date'></div>
                                </div>
                            </div>
                            <div className='blogSidebar__loading__recent__posts__item'>
                                <div className='blogSidebar__loading__recent__posts__item__img'></div>
                                <div className='blogSidebar__loading__recent__posts__item__content'>
                                    <div className='blogSidebar__loading__recent__posts__item__content__h4'></div>
                                    <div className='blogSidebar__loading__recent__posts__item__content__date'></div>
                                </div>
                            </div>
                            <div className='blogSidebar__loading__recent__posts__item'>
                                <div className='blogSidebar__loading__recent__posts__item__img'></div>
                                <div className='blogSidebar__loading__recent__posts__item__content'>
                                    <div className='blogSidebar__loading__recent__posts__item__content__h4'></div>
                                    <div className='blogSidebar__loading__recent__posts__item__content__date'></div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            ) : (
                <>
                    <div className='blogSidebar__categories'>
                        <h2>Blog Categories</h2>
                        <ul>
                            {postCategories.map((category) => {
                                return (
                                    <li key={category._id}>
                                        <Link to='/'>{category.name}</Link>
                                    </li>
                                );
                            })}
                        </ul>
                    </div>
                    <div className='blogSidebar__posts'>
                        <h2>Recent Posts</h2>
                        <div className='blogSidebar__posts__wrapper'>
                            {recentPosts.map((post) => {
                                return (
                                    <RecentPost key={post._id} post={post} />
                                );
                            })}
                        </div>
                    </div>
                </>
            )}
        </div>
    );
}

export default BlogSidebar;
