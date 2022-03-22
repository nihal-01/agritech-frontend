import { Link, useParams } from 'react-router-dom';

import './SingleBlogPage.scss';
import {
    PageHero,
    BlankSpace,
    BlogSidebar,
} from '../../../components/customer';
import { monthNames } from '../../../utils/constants';
import { useCallback, useEffect, useState } from 'react';
import axios from '../../../axios';
import SingleBlogComments from './SingleBlogComments';
import { setBlogComments } from '../../../redux/slices/blogSlice';
import { useDispatch } from 'react-redux';
import { AiFillYoutube } from 'react-icons/ai';

const SingleBlogPage = () => {
    const [myPost, setMyPost] = useState({});
    const [loading, setLoading] = useState(true);
    const [imgLoaded, setImgLoaded] = useState(false);
    const [isYoutubeOpen, setIsYoutubeOpen] = useState(false);

    const { id } = useParams();
    const dispatch = useDispatch();

    const myDate = new Date(myPost?.post?.createdAt);

    console.log('single blog..!');

    const fetchSinglePost = useCallback(async () => {
        try {
            setLoading(true);
            const response = await axios.get(`/posts/${id}`);
            console.log(response.data);
            setMyPost(response.data);
            dispatch(setBlogComments(response.data.comments));
            setLoading(false);
        } catch (err) {
            console.log(err.response);
        }
    }, [id, dispatch]);

    console.log(myPost?.post?.youtubeLink);

    useEffect(() => {
        fetchSinglePost();
    }, [fetchSinglePost]);

    return (
        <div>
            <PageHero title={myPost?.post?.title} blog={true} />
            <BlankSpace />
            <div className='singleBlogPage__wrapper'>
                {loading ? (
                    <div className='singleBlogPage__loading'>
                        <div className='singleBlogPage__loading__meta'></div>
                        <div className='singleBlogPage__loading__title'></div>
                        <div className='singleBlogPage__loading__image'></div>
                        <div className='singleBlogPage__loading__body'>
                            <div className='singleBlogPage__loading__body__item'></div>
                            <div className='singleBlogPage__loading__body__item'></div>
                            <div className='singleBlogPage__loading__body__item'></div>
                            <div className='singleBlogPage__loading__body__item'></div>
                        </div>
                    </div>
                ) : (
                    <div className='singleBlogPage'>
                        <div className='singleBlogPage__meta'>
                            <Link
                                to={`/blog/category/${myPost?.post?.category?.name}`}
                            >
                                {myPost?.post?.category?.name}
                            </Link>
                            <span>
                                {monthNames[myDate.getMonth()] +
                                    ' ' +
                                    myDate.getDate() +
                                    ', ' +
                                    myDate.getFullYear()}
                            </span>
                        </div>
                        <div className='singleBlogPage__header'>
                            <h1>{myPost?.post?.title}</h1>
                            {myPost?.post?.youtubeLink && (
                                <button
                                    onClick={() => {
                                        setIsYoutubeOpen(true);
                                    }}
                                >
                                    <AiFillYoutube />
                                </button>
                            )}
                            {isYoutubeOpen && (
                                <>
                                    <div
                                        className='singleBlogPage__header__youtube-wrapper'
                                        onClick={() => {
                                            setIsYoutubeOpen(false);
                                        }}
                                    ></div>
                                    <div className='singleBlogPage__header__youtube'>
                                        <iframe
                                            title='Youtube Video'
                                            width='100%'
                                            height='100%'
                                            src={`${myPost?.post?.youtubeLink}?autoplay=1&mute=1`}
                                        ></iframe>
                                    </div>
                                </>
                            )}
                        </div>
                        <div className='singleBlogPage__thumbnail'>
                            <img
                                src={myPost?.post?.thumbnail}
                                alt=''
                                onLoad={() => {
                                    setImgLoaded(true);
                                }}
                            />
                            {!imgLoaded && (
                                <div className='singleBlogPage__thumbnail__loading'></div>
                            )}
                        </div>

                        <p
                            dangerouslySetInnerHTML={{
                                __html: myPost?.post?.body,
                            }}
                            className='singleBlogPage__para'
                        ></p>
                        <div className='singleBlogPage__nav'>
                            <div className='singleBlogPage__nav__prev'>
                                {myPost?.prevPost !== null && (
                                    <>
                                        <span className='singleBlogPage__nav__reader-text'>
                                            Previous post
                                        </span>
                                        <Link
                                            to={`/blog/${myPost?.prevPost?._id}`}
                                        >
                                            <span className='singleBlogPage__nav__title'>
                                                {myPost?.prevPost?.title}
                                            </span>
                                        </Link>
                                    </>
                                )}
                            </div>
                            <div className='singleBlogPage__nav__next'>
                                {myPost?.nextPost !== null && (
                                    <>
                                        <span className='singleBlogPage__nav__reader-text'>
                                            Next post
                                        </span>
                                        <Link
                                            to={`/blog/${myPost?.nextPost?._id}`}
                                        >
                                            <span className='singleBlogPage__nav__title'>
                                                {myPost?.nextPost?.title}
                                            </span>
                                        </Link>
                                    </>
                                )}
                            </div>
                        </div>

                        {/* blog comments */}
                        <SingleBlogComments id={myPost.post._id} />
                    </div>
                )}
                <BlogSidebar />
            </div>
            <BlankSpace />
        </div>
    );
};

export default SingleBlogPage;
