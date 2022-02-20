import React, { useState } from 'react';
import { AiOutlineClose } from 'react-icons/ai';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { navLinks } from '../../../utils/constants';

import './MobileSidebar.scss';
import SingleMenu from './SingleMenu';

function MobileSidebar({ isMobileSidebarOpen, setIsMobileSidebarOpen }) {
    const [isMainMenu, setIsMainMenu] = useState(true);

    const { categories } = useSelector((state) => state.categories);
    return (
        <>
            <div
                className={
                    isMobileSidebarOpen
                        ? 'mobileSidebar__ovarlay mobileSidebar__ovarlay__active'
                        : 'mobileSidebar__ovarlay'
                }
                onClick={() => {
                    setIsMobileSidebarOpen(false);
                }}
            ></div>
            <div
                className={
                    isMobileSidebarOpen
                        ? 'mobileSidebar mobileSidebar__active'
                        : 'mobileSidebar'
                }
            >
                <div className='mobileSidebar__header'>
                    <div className='mobileSidebar__header__nav'>
                        <button
                            onClick={() => setIsMainMenu(true)}
                            className={isMainMenu ? 'active' : null}
                        >
                            Main menu
                            <span></span>
                        </button>
                    </div>
                    <div className='mobileSidebar__header__nav'>
                        <button
                            onClick={() => setIsMainMenu(false)}
                            className={!isMainMenu ? 'active' : null}
                        >
                            All Categories
                            <span></span>
                        </button>
                    </div>
                    <button
                        onClick={() => {
                            setIsMobileSidebarOpen(false);
                        }}
                        className='mobileSidebar__header__closeBtn'
                    >
                        <AiOutlineClose />
                    </button>
                </div>
                {isMainMenu ? (
                    <div className='mobileSidebar__menu'>
                        <ul className='mobileSidebar__menu__list'>
                            {navLinks.map((link, index) => {
                                return (
                                    <SingleMenu
                                        key={index}
                                        link={link}
                                        setIsMobileSidebarOpen={
                                            setIsMobileSidebarOpen
                                        }
                                    />
                                );
                            })}
                        </ul>
                    </div>
                ) : (
                    <div className='mobileSidebar__categories'>
                        <ul className='mobileSidebar__categories__list'>
                            {categories.map((category) => {
                                return (
                                    <li key={category._id}>
                                        <Link
                                            to={`/products/category/${category.name}`}
                                            onClick={() => {
                                                setIsMobileSidebarOpen(false);
                                            }}
                                        >
                                            {category.name}
                                        </Link>
                                    </li>
                                );
                            })}
                        </ul>
                    </div>
                )}
            </div>
        </>
    );
}

export default MobileSidebar;
