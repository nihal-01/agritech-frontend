import React, { useState } from 'react';
import {
    AiFillShop,
    AiOutlineUser,
    AiOutlineSearch,
    AiOutlineHeart,
} from 'react-icons/ai';
import { BiSearch } from 'react-icons/bi';
import { Link, useNavigate } from 'react-router-dom';

import './BottomNav.scss';

function BottomNav() {
    const [isSearchActive, setIsSearchActive] = useState(false);
    const [searchKeyword, setSearchKeyword] = useState('');

    const navigate = useNavigate();

    const handleSearch = (e) => {
        e.preventDefault();
        setIsSearchActive(false);
        navigate(`/products/search/${searchKeyword}`);
    };

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
                <li
                    onClick={() => {
                        setIsSearchActive(true);
                    }}
                >
                    <Link to='#'>
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
            <div className='bottomNav__search-wrapper'>
                <div
                    className={
                        isSearchActive
                            ? 'bottomNav__search__overlay bottomNav__search__overlay__active'
                            : 'bottomNav__search__overlay'
                    }
                    onClick={() => {
                        setIsSearchActive(false);
                    }}
                ></div>
                <div
                    className={
                        isSearchActive
                            ? 'bottomNav__search bottomNav__search__active'
                            : 'bottomNav__search'
                    }
                >
                    <form onSubmit={handleSearch}>
                        <input
                            type='text'
                            placeholder='Search products...'
                            onChange={(e) => {
                                setSearchKeyword(e.target.value);
                            }}
                        />
                        <button>
                            <BiSearch />
                        </button>
                    </form>
                </div>
            </div>
        </div>
    );
}

export default BottomNav;
