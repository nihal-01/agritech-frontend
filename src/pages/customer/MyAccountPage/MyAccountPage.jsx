import React from 'react';
import { Link, Outlet } from 'react-router-dom';
import {
    AiOutlineUser,
    AiOutlineHome,
    AiOutlineLogout,
    AiOutlineDashboard,
    AiOutlineShop,
} from 'react-icons/ai';

import './MyAccountPage.scss';
import { PageHero, BlankSpace } from '../../../components/customer';
import { logout } from '../../../redux/slices/userSlice';
import { useDispatch } from 'react-redux';

function MyAccountPage() {
    const dispatch = useDispatch();

    return (
        <div className='myAccountPage-wrapper'>
            <PageHero title='My account' />
            <BlankSpace />
            <div className='myAccountPage'>
                <div className='myAccountPage__nav'>
                    <ul>
                        <li>
                            <Link to=''>
                                Dashboard
                                <span>
                                    <AiOutlineDashboard />
                                </span>
                            </Link>
                        </li>
                        <li>
                            <Link to='orders'>
                                Orders{' '}
                                <span>
                                    <AiOutlineShop />
                                </span>
                            </Link>
                        </li>
                        <li>
                            <Link to='address'>
                                Address
                                <span>
                                    <AiOutlineHome />
                                </span>
                            </Link>
                        </li>
                        <li>
                            <Link to='edit-account'>
                                Account Details
                                <span>
                                    <AiOutlineUser />
                                </span>
                            </Link>
                        </li>
                        <li
                            onClick={() => {
                                dispatch(logout());
                            }}
                        >
                            <Link to='#'>
                                Logout
                                <span>
                                    <AiOutlineLogout />
                                </span>
                            </Link>
                        </li>
                    </ul>
                </div>
                <div className='myAccountPage__content'>
                    <Outlet />
                </div>
            </div>
        </div>
    );
}

export default MyAccountPage;
