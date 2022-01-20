import React from 'react';
import { FiMenu } from 'react-icons/fi';
import { BsBellFill } from 'react-icons/bs';

import './AdminNavbar.scss';
import { avatar } from '../../../assets/images';

function AdminNavbar() {
    return (
        <div className='admin__navbar'>
            <i className='admin__navbar__menu'>
                <FiMenu />
            </i>
            <div className='admin__navbar__right'>
                <button>
                    <BsBellFill />
                    <span></span>
                </button>
                <div className='admin__navbar__avatar'>
                    <img src={avatar} alt='' />
                </div>
            </div>
        </div>
    );
}

export default AdminNavbar;
