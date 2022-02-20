import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { BiPhoneCall, BiSearch, BiUser, BiHeart, BiCart } from 'react-icons/bi';
import { CgMenuLeft } from 'react-icons/cg';
import { useDispatch, useSelector } from 'react-redux';

import './Header.scss';
import { leavesImg } from '../../../assets/images';
import {
    LoginCard,
    Navbar,
    SidebarCart,
    UserDropDown,
    MobileSidebar,
} from '..';

function Header() {
    const [isLoginOpen, setIsLoginOpen] = useState(false);
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);
    const [searchKeyword, setSearchKeyword] = useState('');
    const [userDropDown, setUserDropDown] = useState(false);
    const [isMobileSidebarOpen, setIsMobileSidebarOpen] = useState(false);

    const isLoggedIn = useSelector((state) => state.user.isLoggedIn);
    const user = useSelector((state) => state.user.user);
    const { cartCount } = useSelector((state) => state.cart);
    const { wishlistItems } = useSelector((state) => state.wishlist);

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const handleSearch = (e) => {
        e.preventDefault();
        navigate(`/products/search/${searchKeyword}`);
    };

    useEffect(() => {
        localStorage.setItem('wishlist', JSON.stringify(wishlistItems));
    }, [wishlistItems, dispatch]);

    return (
        <header className='header__wrapper'>
            <div className='header'>
                <MobileSidebar
                    isMobileSidebarOpen={isMobileSidebarOpen}
                    setIsMobileSidebarOpen={setIsMobileSidebarOpen}
                />
                <div
                    className='header__menu'
                    onClick={() => {
                        setIsMobileSidebarOpen(true);
                    }}
                >
                    <CgMenuLeft />
                </div>
                <div className='header__logo__wrapper'>
                    <h1 className='header__logo'>
                        <Link to='/'>
                            Agritech <img src={leavesImg} alt='' />
                        </Link>
                    </h1>
                    <div className='header__contact'>
                        <span>
                            <BiPhoneCall />
                        </span>
                        <a href='tel:+918899776655'>+91 8899776655</a>
                    </div>
                </div>
                <div className='header__search__wrapper'>
                    <form className='header__search' onSubmit={handleSearch}>
                        <input
                            type='text'
                            placeholder='Search products...'
                            onChange={(e) => setSearchKeyword(e.target.value)}
                        />
                        <button>
                            <BiSearch />
                        </button>
                    </form>
                </div>
                <div className='header__left'>
                    {!isLoggedIn ? (
                        <div className='header__signin__wrapper'>
                            <Link
                                to='#'
                                className='header__signin'
                                onClick={() => setIsLoginOpen(!isLoginOpen)}
                            >
                                <div className='header__signin__icon'>
                                    <BiUser />
                                </div>
                                <div className='header__signin__content'>
                                    <span>Hello</span>
                                    <br />
                                    <span>
                                        <strong>Sign In</strong> or{' '}
                                        <strong>Register</strong>
                                    </span>
                                </div>
                            </Link>
                            {isLoginOpen && (
                                <LoginCard setIsLoginOpen={setIsLoginOpen} />
                            )}
                        </div>
                    ) : (
                        <div className='header__user__wrapper'>
                            <Link
                                to='#'
                                className='header__user'
                                onClick={() => setUserDropDown(!userDropDown)}
                            >
                                <div className='header__user__icon'>
                                    <BiUser />
                                </div>
                                <div className='header__user__content'>
                                    <span>Hello</span>
                                    <br />
                                    <span>
                                        <strong>{user.fname}</strong>
                                    </span>
                                </div>
                            </Link>
                            {userDropDown && (
                                <UserDropDown
                                    setUserDropDown={setUserDropDown}
                                />
                            )}
                        </div>
                    )}
                    <Link to='/wishlist' className='header__wishlist__icon'>
                        <BiHeart />
                        <span>{wishlistItems.length}</span>
                    </Link>
                    <div className='header__cart__wrapper'>
                        <div
                            className='header__cart__icon'
                            onClick={() => {
                                setIsLoginOpen(false);
                                setIsSidebarOpen(true);
                            }}
                        >
                            <BiCart />
                            <span>{cartCount}</span>
                        </div>
                        <SidebarCart
                            isSidebarOpen={isSidebarOpen}
                            setIsSidebarOpen={setIsSidebarOpen}
                        />
                    </div>
                </div>
            </div>
            <hr />
            <Navbar />
            <hr />
        </header>
    );
}

export default Header;
