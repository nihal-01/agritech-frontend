import React from 'react';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { SidebarCartSingle } from '.';

function SidebarCartContent({ setIsSidebarOpen }) {
    const { cartItems, cartTotal } = useSelector((state) => state.cart);

    return (
        <>
            <div className='sidebarCart__products'>
                <ul className='sidebarCart__products__list'>
                    {cartItems.map((item, index) => {
                        return (
                            <SidebarCartSingle
                                item={item}
                                key={index}
                                setIsSidebarOpen={setIsSidebarOpen}
                            />
                        );
                    })}
                </ul>
            </div>
            <div className='sidebarCart__bottom'>
                <div className='sidebarCart__bottom__total'>
                    <span className='sidebarCart__bottom__total__label'>
                        Subtotal:
                    </span>
                    <span className='sidebarCart__bottom__total__price'>
                        &#8377;{cartTotal}
                    </span>
                </div>
                <Link to='/cart' onClick={() => setIsSidebarOpen(false)}>
                    <button className='sidebarCart__bottom__btn cart-btn'>
                        VIEW CART
                    </button>
                </Link>
                <Link to='/checkout' onClick={() => setIsSidebarOpen(false)}>
                    <button className='sidebarCart__bottom__btn checkout-btn'>
                        CHECKOUT
                    </button>
                </Link>
            </div>
        </>
    );
}

export default SidebarCartContent;
