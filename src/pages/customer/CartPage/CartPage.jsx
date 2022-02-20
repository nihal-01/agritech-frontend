import { useDispatch, useSelector } from 'react-redux';

import './CartPage.scss';
import {
    PageHero,
    BlankSpace,
    Loader,
    BtnLoading,
} from '../../../components/customer/';
import axios from '../../../axios';
import { clearCartItems } from '../../../redux/slices/cartSlice';
import { emptyCartImg } from '../../../assets/images';
import { Link } from 'react-router-dom';
import SingleCartItem from './SingleCartItem';
import { useState } from 'react';

const CartPage = () => {
    const [clearCartLoading, setClearCartLoading] = useState(false);

    const { token } = useSelector((state) => state.user);
    const { cartItems, cartTotal, cartLoading } = useSelector(
        (state) => state.cart
    );

    console.log('my cart');
    const dispatch = useDispatch();

    const clearCart = async () => {
        try {
            setClearCartLoading(true);
            await axios.delete('/cart', {
                headers: { Authorization: `Bearer ${token}` },
            });
            setClearCartLoading(false);
            dispatch(clearCartItems());
        } catch (err) {
            console.log(err.response);
            setClearCartLoading(false);
        }
    };

    return (
        <div className='CartPage__wrapper'>
            <PageHero title='Cart' />
            <BlankSpace />
            <div className='CartPage'>
                {cartLoading ? (
                    <div className='CartPage__loading'>
                        <Loader />
                    </div>
                ) : cartItems.length <= 0 ? (
                    <div className='CartPage__noItem'>
                        <img src={emptyCartImg} alt='' />
                        <p>Your cart is currently empty.</p>
                        <Link to='/products'>
                            <button>Return to shop</button>
                        </Link>
                    </div>
                ) : (
                    <div className='CartPage__content'>
                        <table className='CartPage__table'>
                            <thead>
                                <tr>
                                    <th></th>
                                    <th></th>
                                    <th>Product</th>
                                    <th>Price</th>
                                    <th style={{ textAlign: 'center' }}>
                                        Quantity
                                    </th>
                                    <th>Subtotal</th>
                                </tr>
                            </thead>
                            <tbody>
                                {cartItems.map((item) => {
                                    return (
                                        <SingleCartItem
                                            key={item.productId}
                                            item={item}
                                            clearCartLoading={clearCartLoading}
                                        />
                                    );
                                })}
                                <tr>
                                    <td
                                        colSpan={6}
                                        className='CartPage__table__clearCart'
                                    >
                                        <div className='CartPage__table__clearCartBtn'>
                                            <button
                                                onClick={() => {
                                                    clearCart();
                                                }}
                                            >
                                                {clearCartLoading ? (
                                                    <BtnLoading />
                                                ) : (
                                                    'Clear Cart'
                                                )}
                                            </button>
                                        </div>
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                        <div className='CartPage__total'>
                            <div className='CartPage__total__box'>
                                <h2>Cart totals</h2>
                                <div className='CartPage__total__box__subtotal'>
                                    <p>Subtotal</p>
                                    <h5>&#8377;{cartTotal}</h5>
                                </div>
                                <hr />
                                <div className='CartPage__total__box__total'>
                                    <p>Total</p>
                                    <h5>&#8377;{cartTotal}</h5>
                                </div>
                                <Link to='/checkout'>
                                    <button>Proceed to checkout</button>
                                </Link>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default CartPage;
