import React, { useCallback, useEffect, useState } from 'react';

import './AdminInvoicePage.scss';
import axios from '../../../axios';
import { useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { Loader } from '../../../components/customer';
import { adminNotFoundImg } from '../../../assets/images';
import { monthNames } from '../../../utils/constants';

function AdminInvoicePage() {
    const [order, setOrder] = useState({});
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(false);

    const { id } = useParams();
    const { token } = useSelector((state) => state.user);

    const fetchOrder = useCallback(async () => {
        try {
            console.log('order fetching...');
            const response = await axios.get(`orders/${id}`, {
                headers: { Authorization: `Bearer ${token}` },
            });
            setOrder(response.data);
            setLoading(false);
        } catch (err) {
            setError(true);
            setLoading(false);
        }
    }, [id, token]);

    const myDate = new Date(order.createdAt);

    useEffect(() => {
        fetchOrder();
    }, [fetchOrder]);

    return (
        <div className='adminInvoice'>
            <h1 className='adminInvoice__title'>Invoice</h1>
            {loading ? (
                <div className='adminInvoice__loading'>
                    <Loader color={'#fff'} />
                </div>
            ) : error ? (
                <div className='adminInvoice__notFound'>
                    <img src={adminNotFoundImg} alt='' />
                    <p>Sorry, Order not found</p>
                </div>
            ) : (
                <div className='adminInvoice__invoice'>
                    <div className='adminInvoice__invoice__header'>
                        <h1>Invoice</h1>
                        <p>
                            STATUS:{' '}
                            <span
                                style={{
                                    backgroundColor:
                                        order.orderStatus === 'delivered'
                                            ? '#03543f'
                                            : order.orderStatus === 'shipped'
                                            ? '#1e429f'
                                            : order.orderStatus === 'packed'
                                            ? '#540354'
                                            : '#0694a2',
                                }}
                            >
                                {order.orderStatus}
                            </span>
                        </p>
                    </div>
                    <hr className='adminInvoice__invoice__hr' />
                    <div className='adminInvoice__invoice__meta'>
                        <div>
                            <h4>Date</h4>
                            <p>
                                {monthNames[myDate.getMonth()] +
                                    ' ' +
                                    myDate.getDate() +
                                    ', ' +
                                    myDate.getFullYear()}
                            </p>
                        </div>
                        <div className='adminInvoice__invoice__meta__no'>
                            <h4>Invoice No</h4>
                            <p>#{order._id.slice(0, 5)}</p>
                        </div>
                        <div className='adminInvoice__invoice__meta__address'>
                            <h4>Invoice To</h4>
                            <p>
                                {order.address.streetAddress}
                                <br />
                                {order.address.pincode}
                                <br />
                                {order.address.city} {order.address.state}
                            </p>
                        </div>
                    </div>
                    <div className='adminInvoice__invoice__products'>
                        <table>
                            <thead>
                                <tr>
                                    <th>Id</th>
                                    <th>Product Name</th>
                                    <th>Quantity</th>
                                    <th>Item Price</th>
                                    <th>Amount</th>
                                </tr>
                            </thead>
                            <tbody>
                                {order.products.map((product) => {
                                    const { _id, name, price } =
                                        product.productId;

                                    return (
                                        <tr key={_id}>
                                            <td>#{_id.slice(0, 5)}</td>
                                            <td>{name}</td>
                                            <td>{product.quantity}</td>
                                            <td>&#8377; {price}</td>
                                            <td>
                                                &#8377;{' '}
                                                {Number(price) *
                                                    product.quantity}
                                            </td>
                                        </tr>
                                    );
                                })}
                            </tbody>
                        </table>
                    </div>
                    <div className='adminInvoice__invoice__summary'>
                        <div className='adminInvoice__invoice__summary__method'>
                            <h4>Payment Method</h4>
                            <p>{order.paymentType}</p>
                        </div>
                        <div>
                            <h4>Shipping cost</h4>
                            <p>&#8377; 0.00</p>
                        </div>
                        <div>
                            <h4>Discount</h4>
                            <p>&#8377; 0.00</p>
                        </div>
                        <div className='adminInvoice__invoice__summary__total'>
                            <h4>Total Amount</h4>
                            <p>&#8377; {order.totalAmount}</p>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}

export default AdminInvoicePage;
