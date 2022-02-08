import React from 'react';
import { Link } from 'react-router-dom';

import './PageHero.scss';

function PageHero({ title, product, blog }) {
    return (
        <div className='page__hero'>
            <h3>{title?.slice(0, 25)}</h3>
            <p>
                <Link to='/'>Home</Link>
                {product ? (
                    <>
                        {' '}
                        &gt; <Link to='/products'> Products </Link>
                    </>
                ) : blog ? (
                    <>
                        {' '}
                        &gt; <Link to='/blog'> Blog </Link>
                    </>
                ) : null}{' '}
                &gt; {title}
            </p>
        </div>
    );
}

export default PageHero;
