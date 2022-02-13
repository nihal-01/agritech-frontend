import React from 'react';
import {
    BsShop,
    BsGrid,
    BsListUl,
    BsPeople,
    BsCompass,
    BsGear,
} from 'react-icons/bs';
import { Link, useLocation } from 'react-router-dom';
import { FiLogOut } from 'react-icons/fi';

import './AdminSidebar.scss';
import { useDispatch, useSelector } from 'react-redux';
import { updateAdminSidebar } from '../../../redux/slices/layoutSlice';

const links = [
    {
        name: 'Dashboard',
        to: '',
        icon: <BsGrid />,
    },
    {
        name: 'Products',
        to: '/products',
        icon: <BsShop />,
    },
    {
        name: 'Categories',
        to: '/categories',
        icon: <BsListUl />,
    },
    {
        name: 'Customers',
        to: '/customers',
        icon: <BsPeople />,
    },
    {
        name: 'Orders',
        to: '/orders',
        icon: <BsCompass />,
    },
    {
        name: 'Settings',
        to: '/settings',
        icon: <BsGear />,
    },
];

function AdminSidebar() {
    const location = useLocation();

    const dispatch = useDispatch();
    const { adminSidebar } = useSelector((state) => state.layout);

    return (
        <div
            className={
                adminSidebar
                    ? 'admin__sidebar admin__sidebar__mobile'
                    : 'admin__sidebar'
            }
        >
            <Link
                to='/admin'
                className='admin__sidebar__title'
                onClick={() => {
                    dispatch(updateAdminSidebar(false));
                }}
            >
                <h2>Dashboard</h2>
            </Link>
            <ul className='admin__sidebar__menus'>
                {links.map((link, index) => {
                    return (
                        <li key={index}>
                            <Link
                                to={`/admin${link.to}`}
                                className={
                                    location.pathname === `/admin${link.to}` ||
                                    location.pathname === `/admin${link.to}/`
                                        ? 'admin__sidebar__menu-active'
                                        : null
                                }
                                onClick={() => {
                                    dispatch(updateAdminSidebar(false));
                                }}
                            >
                                <i>{link.icon}</i> {link.name}
                                <span></span>
                            </Link>
                        </li>
                    );
                })}
            </ul>
            <button className='admin__sidebar__logout-btn'>
                <FiLogOut /> Log Out
            </button>
        </div>
    );
}

export default AdminSidebar;
