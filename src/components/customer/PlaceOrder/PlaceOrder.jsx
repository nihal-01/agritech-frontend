import React from 'react';
import { useSelector } from 'react-redux';
import BtnLoading from '../BtnLoading/BtnLoading';

import './PlaceOrder.scss';

function PlaceOrder({ setPaymentType, loading, error }) {
    const { cartItems, cartTotal } = useSelector((state) => state.cart);

    return (
        <div className='placeOrder'>
            <h3 className='placeOrder__title'>Your order</h3>
            <table className='placeOrder__table'>
                <thead>
                    <tr>
                        <th>Product</th>
                        <th>Subtotal</th>
                    </tr>
                </thead>
                <tbody>
                    {cartItems.map((item, index) => {
                        return (
                            <tr
                                className='placeOrder__table__product'
                                key={index}
                            >
                                <td>
                                    {item.product.name} x{' '}
                                    <span>{item.quantity}</span>
                                </td>
                                <td>
                                    &#8377;
                                    {Number(item.quantity) *
                                        Number(item.product.price)}
                                </td>
                            </tr>
                        );
                    })}
                    <tr className='placeOrder__table__total'>
                        <td>TOTAL</td>
                        <td>&#8377;{cartTotal}</td>
                    </tr>
                </tbody>
            </table>
            <div className='placeOrder__paytype'>
                <div className='placeOrder__paytype__single'>
                    <input
                        type='radio'
                        value='cod'
                        name='paymentType'
                        id='cod'
                        required
                        onChange={(e) => {
                            setPaymentType(e.target.value);
                        }}
                    />
                    <label htmlFor='cod'>Cash on Delivery</label>
                </div>
                <div className='placeOrder__paytype__single'>
                    <input
                        type='radio'
                        value='card'
                        name='paymentType'
                        id='card'
                        required
                        onChange={(e) => {
                            setPaymentType(e.target.value);
                        }}
                    />
                    <label htmlFor='card'>Card</label>
                </div>
            </div>
            <div className='placeOrder__button'>
                <p className='placeOrder__button__policy'>
                    Your personal data will be used to process your order,
                    support your experience throughout this website.
                </p>
                {error && <p className='placeOrder__button__error'>{error}</p>}
                <button disabled={loading}>
                    {loading ? <BtnLoading /> : 'Place order'}
                </button>
            </div>
        </div>
    );
}

export default PlaceOrder;
