import React from 'react';
import {
    AiFillShop,
    AiOutlineUser,
    AiOutlineSearch,
    AiOutlineHeart,
} from 'react-icons/ai';
import { Link } from 'react-router-dom';

import './BottomNav.scss';

function BottomNav() {
    return (
        <div className='bottomNav'>
            <ul>
                <li>
                    <Link to='/products'>
                        <AiFillShop />
                        <span>Shop</span>
                    </Link>
                </li>
                <li>
                    <Link to='/my-account'>
                        <AiOutlineUser />
                        <span>Account</span>
                    </Link>
                </li>
                <li>
                    <Link to='/products'>
                        <AiOutlineSearch />
                        <span>Search</span>
                    </Link>
                </li>
                <li>
                    <Link to='/wishlist'>
                        <AiOutlineHeart />
                        <span>Wishlist</span>
                    </Link>
                </li>
            </ul>
        </div>
    );
}

export default BottomNav;
