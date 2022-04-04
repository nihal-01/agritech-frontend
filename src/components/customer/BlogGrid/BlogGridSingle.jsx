import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { AiOutlineCalendar, AiOutlineComment } from 'react-icons/ai';

import { monthNames } from '../../../utils/constants';

function BlogGridSingle({ _id, title, thumbnail, createdAt, category, body }) {
    const [isImgLoaded, setImgLoaded] = useState(false);

    const myDate = new Date(createdAt);

    return (
        <div key={_id} className='blogGrid__item'>
            <div className='blogGrid__item__img'>
                {!isImgLoaded && (
                    <div className='blogGrid__item__img__loader'>
                        <div className='blogGrid__item__img__loader__loading'></div>
                    </div>
                )}
                <Link to={`/blog/${_id}`}>
                    <img
                        src={thumbnail}
                        alt=''
                        onLoad={() => {
                            setImgLoaded(true);
                        }}
                    />
                </Link>
                {isImgLoaded && (
                    <Link
                        to={`/blog/categories/${category}`}
                        className='blogGrid__item__category'
                    >
                        {category?.name || 'Uncategorized'}
                    </Link>
                )}
            </div>
            <div className='blogGrid__item__meta'>
                <p>
                    <AiOutlineCalendar />{' '}
                    <span>
                        {monthNames[myDate.getMonth()] +
                            ' ' +
                            myDate.getDate() +
                            ', ' +
                            myDate.getFullYear()}
                    </span>
                </p>
                <span>/</span>
                <p>
                    <AiOutlineComment /> <span>6</span>
                </p>
            </div>
            <h3 className='blogGrid__item__title'>
                <Link to={`/blog/${_id}`}>{title}</Link>
            </h3>
            <p className='blogGrid__item__desc'>{body} ...</p>
        </div>
    );
}

export default BlogGridSingle;
