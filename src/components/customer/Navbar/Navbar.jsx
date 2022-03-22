import React from 'react';
import { FaShippingFast } from 'react-icons/fa';
import { FiChevronDown } from 'react-icons/fi';
import { HiOutlineViewGrid } from 'react-icons/hi';
import { Link, NavLink } from 'react-router-dom';

import './Navbar.scss';
import DropDown from '../DropDown/DropDown';
import { navLinks } from '../../../utils/constants';
import { useSelector } from 'react-redux';

function Navbar() {
    const { categories } = useSelector((state) => state.categories);

    return (
        <nav className='navbar'>
            <div className='navbar__wrapper'>
                <div className='navbar__categories'>
                    <i>
                        <HiOutlineViewGrid />
                    </i>{' '}
                    All Categories{' '}
                    <span>
                        <FiChevronDown />
                    </span>
                    <ul className='navbar__categories__list'>
                        {categories.slice(0, 6).map((category) => {
                            return (
                                <li
                                    key={category._id}
                                    className='navbar__categories__list__item'
                                >
                                    <Link
                                        to={`/products/category/${category.name}`}
                                    >
                                        {category.name}
                                    </Link>
                                </li>
                            );
                        })}
                    </ul>
                </div>
                <ul className='menu'>
                    {navLinks.map((link, index) => {
                        return (
                            <li key={index} className='menu__item'>
                                <NavLink
                                    to={`${link.to}`}
                                    style={({ isActive }) => ({
                                        color:
                                            isActive &&
                                            link.to !== '#' &&
                                            '#347758',
                                        fontWeight:
                                            isActive &&
                                            link.to !== '#' &&
                                            '500',
                                    })}
                                >
                                    {link.name}{' '}
                                    {link.dropdown && (
                                        <i>
                                            <FiChevronDown />
                                        </i>
                                    )}
                                </NavLink>
                                {link.dropdown && (
                                    <DropDown links={link.dropdown} />
                                )}
                            </li>
                        );
                    })}
                </ul>
            </div>
            <div className='navbar__left'>
                <i>
                    <FaShippingFast />
                </i>
                <span>We ship to over 193 countries & region</span>
            </div>
        </nav>
    );
}

export default Navbar;
