import React, { useState } from 'react';
import { FiLogOut, FiMenu } from 'react-icons/fi';
import { BsBellFill, BsGear, BsGrid } from 'react-icons/bs';
// import { AiOutlineClose, AiOutlineCheck } from 'react-icons/ai';

import './AdminNavbar.scss';
import { avatar } from '../../../assets/images';
import { useDispatch, useSelector } from 'react-redux';
import { updateAdminSidebar } from '../../../redux/slices/layoutSlice';
import { logout } from '../../../redux/slices/userSlice';
import { Link } from 'react-router-dom';

function AdminNavbar() {
    const [isDropDownOpen, setIsDropDownOpen] = useState(false);
    const dispatch = useDispatch();
    const { user } = useSelector((state) => state.user);

    return (
        <div className='admin__navbar'>
            <i
                className='admin__navbar__menu'
                onClick={() => {
                    dispatch(updateAdminSidebar(true));
                }}
            >
                <FiMenu />
            </i>
            <div className='admin__navbar__right'>
                <button>
                    <BsBellFill />
                    <span></span>
                </button>
                <div className='admin__navbar__avatar'>
                    <img
                        src={user?.avatar ? user?.avatar : avatar}
                        alt=''
                        onClick={() => {
                            setIsDropDownOpen(!isDropDownOpen);
                        }}
                    />
                    {isDropDownOpen && (
                        <div className='admin__navbar__avatar__dropdown'>
                            <ul>
                                <li>
                                    <Link to='/admin'>
                                        <BsGrid />
                                        <span>Dashboard</span>
                                    </Link>
                                </li>
                                <li>
                                    <Link to='/admin/settings'>
                                        <BsGear />
                                        <span>Edit Profile</span>
                                    </Link>
                                </li>
                                <li>
                                    <Link
                                        to='#'
                                        onClick={() => {
                                            dispatch(logout());
                                        }}
                                    >
                                        <FiLogOut />
                                        <span>Logout</span>
                                    </Link>
                                </li>
                            </ul>
                        </div>
                    )}
                </div>
            </div>
            {/* <div className='admin__navbar__alert'>
                <div className='admin__navbar__alert__content'>
                    <div className='admin__navbar__alert__content__icon'>
                        <AiOutlineCheck />
                    </div>
                    <p>Product updated successfully</p>
                    <div
                        className='admin__navbar__alert__content__timer'
                        style={{ width: '100%', background: '#07bc0c' }}
                    ></div>
                </div>
            </div> */}
        </div>
    );
}

export default AdminNavbar;
