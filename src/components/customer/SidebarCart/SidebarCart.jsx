import React, { useEffect } from 'react';

import './SidebarCart.scss';
import { SidebarCartContent, SidebarCartHeader, SidebarCartLoading } from '.';
import { useDispatch } from 'react-redux';
import { getCartItems } from '../../../redux/slices/cartSlice';
import { useSelector } from 'react-redux';

function SidebarCart({ isSidebarOpen, setIsSidebarOpen }) {
    const dispatch = useDispatch();
    const { cartItems, cartLoading } = useSelector((state) => state.cart);

    useEffect(() => {
        dispatch(getCartItems());
    }, [dispatch]);

    return (
        <div className='sidebarCart__wrapper'>
            <div
                className={
                    isSidebarOpen
                        ? 'sidebarCart__ovarlay sidebarCart__ovarlay__active'
                        : 'sidebarCart__ovarlay'
                }
                onClick={() => setIsSidebarOpen(false)}
            ></div>
            <div
                className={
                    isSidebarOpen
                        ? 'sidebarCart sidebarCart__active'
                        : 'sidebarCart'
                }
            >
                <SidebarCartHeader setIsSidebarOpen={setIsSidebarOpen} />
                {cartLoading ? (
                    <SidebarCartLoading />
                ) : cartItems.length > 0 ? (
                    <SidebarCartContent setIsSidebarOpen={setIsSidebarOpen} />
                ) : (
                    <p className='sidebarCart__noproducts'>
                        No products in the cart.
                    </p>
                )}
            </div>
        </div>
    );
}

export default React.memo(SidebarCart);
