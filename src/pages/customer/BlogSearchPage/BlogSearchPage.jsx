import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useLocation, useParams } from 'react-router-dom';
import {
    BlankSpace,
    BlogGrid,
    BlogSidebar,
    PageHero,
    Pagination,
} from '../../../components/customer';
import {
    clearPostFilters,
    fetchPosts,
    updateBlogCategory,
    updateBlogSearch,
    updatePostLoading,
    updateSkip,
} from '../../../redux/slices/blogSlice';

function BlogSearchPage() {
    const { category, search } = useParams();

    const location = useLocation();
    const dispatch = useDispatch();

    const { skip, limit, totalPosts, loading, posts } = useSelector(
        (state) => state.blog
    );

    useEffect(() => {
        if (location.pathname.split('/')[2] === 'search') {
            dispatch(updateBlogSearch(search));
        } else {
            dispatch(updateBlogCategory(category));
        }
        dispatch(updatePostLoading(true));
        dispatch(fetchPosts());
    }, [category, search, location.pathname, dispatch]);

    useEffect(() => {
        return () => {
            dispatch(clearPostFilters());
        };
    }, [dispatch]);

    return (
        <div className='blogPage-wrapper'>
            <PageHero title='Blog' />
            <BlankSpace />
            <div className='blogPage'>
                {loading ? (
                    <div className='blogPage__main__loading'>
                        {Array.from({ length: 12 }).map((_, index) => {
                            return (
                                <div
                                    key={index}
                                    className='blogPage__main__loading__item'
                                >
                                    <div className='blogPage__main__loading__item__image'></div>
                                    <div className='blogPage__main__loading__item__meta'></div>
                                    <div className='blogPage__main__loading__item__title'></div>
                                    <div className='blogPage__main__loading__item__desc'></div>
                                    <div className='blogPage__main__loading__item__desc'></div>
                                    <div className='blogPage__main__loading__item__desc blogPage__main__loading__item__last-desc'></div>
                                </div>
                            );
                        })}
                    </div>
                ) : posts.length < 1 ? (
                    <div className='blogPage__noPosts'>
                        <h3>Sorry, No posts found..!</h3>
                        <Link to='/blog'>
                            <button>See all posts</button>
                        </Link>
                    </div>
                ) : (
                    <div className='blogPage__main'>
                        <BlogGrid />
                        <Pagination
                            limit={limit}
                            skip={skip}
                            totalItems={totalPosts}
                            updateSkip={updateSkip}
                        />
                    </div>
                )}

                <BlogSidebar />
            </div>
            <BlankSpace />
        </div>
    );
}

export default BlogSearchPage;
