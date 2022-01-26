import React, { useEffect, useState } from 'react';
import { FiMenu } from 'react-icons/fi';
import { BsBellFill } from 'react-icons/bs';
import { AiOutlineClose, AiOutlineCheck } from 'react-icons/ai';

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
