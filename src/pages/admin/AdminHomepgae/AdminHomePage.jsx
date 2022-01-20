import React from 'react';
import { BsCart } from 'react-icons/bs';

import './AdminHomePage.scss';

function AdminHomePage() {
    return (
        <div className='admin__home'>
            <h1 className='admin__home__title'>Dashboard Overview</h1>
            <div className='admin__home__tiles'>
                <div className='admin__home__tile'>
                    <div className='admin__home__tile__icon order'>
                        <BsCart />
                    </div>
                    <div className='admin__home__tile__content'>
                        <p>Total Order</p>
                        <span>184</span>
                    </div>
                </div>
                <div className='admin__home__tile'>
                    <div className='admin__home__tile__icon pending'>
                        <BsCart />
                    </div>
                    <div className='admin__home__tile__content'>
                        <p>Total Users</p>
                        <span>184</span>
                    </div>
                </div>
                <div className='admin__home__tile'>
                    <div className='admin__home__tile__icon processing'>
                        <BsCart />
                    </div>
                    <div className='admin__home__tile__content'>
                        <p>Total Products</p>
                        <span>184</span>
                    </div>
                </div>
                <div className='admin__home__tile'>
                    <div className='admin__home__tile__icon delivered'>
                        <BsCart />
                    </div>
                    <div className='admin__home__tile__content'>
                        <p>Order Delivered</p>
                        <span>184</span>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default AdminHomePage;
