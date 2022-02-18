import React from 'react';

import './Admin404Page.scss';
import { admin404 } from '../../../assets/images';
import { Link } from 'react-router-dom';

function Admin404Page() {
    return (
        <div className='admin404'>
            <img src={admin404} alt='' />
            <p>Page Not Found</p>
            <Link to='/admin'>
                <button>Back to Home</button>
            </Link>
        </div>
    );
}

export default Admin404Page;
