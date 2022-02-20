import React from 'react';
import { useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';

import './UserDropDown.scss';
import { logout } from '../../../redux/slices/userSlice';

const userLinks = [
    {
        name: 'My Account',
        link: '/my-account',
    },
    {
        name: 'Orders',
        link: '/my-account/orders',
    },
    {
        name: 'Edit Address',
        link: '/my-account/address',
    },
    {
        name: 'Account Details',
        link: '/my-account/edit-account',
    },
    {
        name: 'Logout',
        link: '#',
    },
];

function UserDropDown({ setUserDropDown }) {
    const dispatch = useDispatch();

    const handleLogout = () => {
        dispatch(logout());
    };

    return (
        <div className='userDropDown'>
            <ul>
                {userLinks.map((links, index) => {
                    return (
                        <li
                            key={index}
                            onClick={() => {
                                setUserDropDown(false);
                                if (
                                    links.name.toLocaleLowerCase() === 'logout'
                                ) {
                                    handleLogout();
                                }
                            }}
                        >
                            <Link to={links.link}>{links.name}</Link>
                        </li>
                    );
                })}
            </ul>
        </div>
    );
}

export default UserDropDown;
