import React, { useCallback, useEffect, useState } from 'react';

import './OrderRecievedPage.scss';
import { PageHero, BlankSpace, Loader } from '../../../components/customer';
import { useParams } from 'react-router-dom';
import axios from '../../../axios';
import { monthNames } from '../../../utils/constants';
import NotFoundPage from '../NotFoundPage/NotFoundPage';
import { useSelector } from 'react-redux';

function OrderRecievedPage() {
    const [order, setOrder] = useState({});
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(false);

    const { token } = useSelector((state) => state.user);
    const { id } = useParams();

    const fetchSingleOrder = useCallback(async () => {
        try {
            const response = await axios.get(`/orders/${id}`, {
                headers: { Authorization: `Bearer ${token}` },
            });
            setOrder(response.data);
            setLoading(false);
        } catch (err) {
            setError(true);
            setLoading(false);
            console.log(err.response);
        }
    }, [id, token]);

    const myDate = new Date(order?.createdAt);

    useEffect(() => {
        fetchSingleOrder();
    }, [fetchSingleOrder]);
    return (
        <div>
            <PageHero title='Order Recieved' checkout={true} />
            {!error && <BlankSpace />}
            <div className='orderReceivedPage'>
                {loading ? (
                    <div className='orderReceivedPage__loading'>
                        <Loader />
                    </div>
                ) : error ? (
                    <NotFoundPage />
                ) : (
                    <>
                        <div className='orderReceivedPage__thankyou'>
                            Thank you. Your order has been received.
                        </div>
                        <div className='orderReceivedPage__list'>
                            <ul>
                                <li>
                                    Order Id: <br />
                                    <strong>#{id.slice(0, 5)}</strong>
                                </li>
                                <li>
                                    Date: <br />
                                    <strong>
                                        {monthNames[myDate.getMonth()] +
                                            ' ' +
                                            myDate.getDate() +
                                            ', ' +
                                            myDate.getFullYear()}
                                    </strong>
                                </li>
                                <li>
                                    Email: <br />
                                    <strong>{order?.address?.email}</strong>
                                </li>
                                <li className='orderReceivedPage__list__price'>
                                    Total:
                                    <br />
                                    <strong>&#8377;{order?.totalAmount}</strong>
                                </li>
                                <li>
                                    Payment method: <br />
                                    <strong>{order?.paymentType}</strong>
                                </li>
                            </ul>
                        </div>
                        <div className='orderReceivedPage__details'>
                            <h2>ORDER DETAILS</h2>
                            <table className='orderReceivedPage__details__table'>
                                <thead>
                                    <tr>
                                        <th>Product</th>
                                        <th>Total</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {order?.products.map((product, index) => {
                                        return (
                                            <tr
                                                className='orderReceivedPage__details__table__product'
                                                key={index}
                                            >
                                                <td>
                                                    {product.productId?.name} x{' '}
                                                    {product?.quantity}
                                                </td>
                                                <td>
                                                    &#8377;
                                                    {product.productId?.price *
                                                        product?.quantity}
                                                </td>
                                            </tr>
                                        );
                                    })}

                                    <tr>
                                        <td>Payment method:</td>
                                        <td>{order?.paymentType}</td>
                                    </tr>
                                    <tr className='orderReceivedPage__details__table__total'>
                                        <td>Total:</td>
                                        <td>&#8377;{order?.totalAmount}</td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                    </>
                )}
            </div>
        </div>
    );
}

export default OrderRecievedPage;
