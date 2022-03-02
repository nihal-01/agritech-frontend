import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import './BlogPage.scss';
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
    updatePostLoading,
    updateSkip,
} from '../../../redux/slices/blogSlice';

const BlogPage = () => {
    console.log('blog page..!');

    const dispatch = useDispatch();
    const { skip, limit, totalPosts, loading } = useSelector(
        (state) => state.blog
    );

    useEffect(() => {
        dispatch(updatePostLoading(true));
        dispatch(fetchPosts());
    }, [dispatch, skip]);

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
};

export default BlogPage;
