import React from 'react';
import { Link } from 'react-router-dom';

import { monthNames } from '../../../utils/constants';

function RecentPost({ post }) {
    const myDate = new Date(post?.createdAt);

    return (
        <div className='blogSidebar__posts__wrapper__single'>
            <div className='blogSidebar__posts__wrapper__single__image'>
                <Link to={`/blog/${post._id}`}>
                    <img src={post?.thumbnail} alt='' />
                </Link>
            </div>
            <div className='blogSidebar__posts__wrapper__single__content'>
                <Link to={`/blog/${post._id}`}>
                    <h4>{post?.title}</h4>
                </Link>
                <span>
                    {monthNames[myDate.getMonth()] +
                        ' ' +
                        myDate.getDate() +
                        ', ' +
                        myDate.getFullYear()}
                </span>
            </div>
        </div>
    );
}

export default RecentPost;
