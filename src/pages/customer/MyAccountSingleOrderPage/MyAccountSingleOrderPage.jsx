import React, { useCallback, useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';

import './MyAccountSingleOrderPage.scss';
import axios from '../../../axios';
import { Loader } from '../../../components/customer';
import { monthNames } from '../../../utils/constants';


function MyAccountSingleOrderPage() {
    const [loading, setLoading] = useState(true);
    const [order, setOrder] = useState({});
    const [error, setError] = useState(false);

    const { token } = useSelector((state) => state.user);
    const { id } = useParams();

    const myDate = new Date(order.createdAt);

    const fetchOrder = useCallback(async () => {
        try {
            const response = await axios.get(`/orders/${id}`, {
                headers: { Authorization: `Bearer ${token}` },
            });
            setOrder(response.data);
            setLoading(false);
        } catch (err) {
            setError(true);
            setLoading(false);
        }
    }, [token, id]);

    useEffect(() => {
        fetchOrder();
    }, [fetchOrder]);

    return (
        <div className='myAccountSingleOrder'>
            {loading ? (
                <div className='myAccountSingleOrder__loading'>
                    <Loader />
                </div>
            ) : error ? (
                <div className='myAccountSingleOrder__error'>
                    <span>&#128533;</span>
                    <p>Something went wrong, Try again..!</p>
                </div>
            ) : (
                <>
                    <p className='myAccountSingleOrder__info'>
                        Order <span>#{order?._id.slice(0, 5)}</span> was placed
                        on{' '}
                        <span>
                            {monthNames[myDate.getMonth()] +
                                ' ' +
                                myDate.getDate() +
                                ', ' +
                                myDate.getFullYear()}
                        </span>{' '}
                        and is currently <span>{order.orderStatus}</span>.
                    </p>
                    <h2 className='myAccountSingleOrder__title'>
                        Order Details
                    </h2>
                    <table className='myAccountSingleOrder__table'>
                        <tbody>
                            <tr className='myAccountSingleOrder__table__head'>
                                <td>Product</td>
                                <td>Total</td>
                            </tr>
                            {order.products.map((product) => {
                                const { name, price } = product.productId;
                                return (
                                    <tr
                                        className='myAccountSingleOrder__table__product'
                                        key={product._id}
                                    >
                                        <td>
                                            {name}{' '}
                                            <span>x {product.quantity}</span>
                                        </td>
                                        <td>
                                            &#8377;{' '}
                                            {Number(price) *
                                                Number(product.quantity)}
                                        </td>
                                    </tr>
                                );
                            })}

                            <tr className='myAccountSingleOrder__table__paymethod'>
                                <td>Payment method:</td>
                                <td>{order.paymentType}</td>
                            </tr>
                            <tr className='myAccountSingleOrder__table__total'>
                                <td>Total:</td>
                                <td>&#8377; {order.totalAmount}</td>
                            </tr>
                        </tbody>
                    </table>
                    <h2 className='myAccountSingleOrder__title'>
                        Billing Address
                    </h2>
                    <p className='myAccountSingleOrder__address'>
                        {order.address.fname} {order.address?.lname} <br />
                        {order.address.streetAddress} <br />
                        {order.address.city} {order.address.pincode} <br />
                        {order.address.state}, India {order.address.phone}
                    </p>
                </>
            )}
        </div>
    );
}

export default MyAccountSingleOrderPage;
