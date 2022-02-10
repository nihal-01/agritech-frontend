import React from 'react';
import { Link, useNavigate } from 'react-router-dom';

import './NotFoundPage.scss';
import { notFoundImg } from '../../../assets/images';

function NotFoundPage() {
    const navigate = useNavigate();

    return (
        <div className='notFoundPage__wrapper'>
            <div className='notFoundPage'>
                <img src={notFoundImg} alt='' className='notFoundPage__img' />
                <h4 className='notFoundPage__title'>
                    oops, that link is broken.
                </h4>
                <p className='notFoundPage__desc'>
                    Page doesn't exist or some other error occured. Go to our{' '}
                    <Link to='/'>
                        <button className='notFoundPage__desc__btn'>
                            Home page
                        </button>
                    </Link>{' '}
                    or go back to{' '}
                    <button
                        className='notFoundPage__desc__btn'
                        onClick={() => navigate(-1)}
                    >
                        Previous page
                    </button>
                </p>
            </div>
        </div>
    );
}

export default NotFoundPage;
