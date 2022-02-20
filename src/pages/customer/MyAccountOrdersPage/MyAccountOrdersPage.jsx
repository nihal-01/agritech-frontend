import React, { useCallback, useEffect, useState } from 'react';

import './MyAccountOrdersPage.scss';
import axios from '../../../axios';
import { Loader } from '../../../components/customer';
import { Link, useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { monthNames } from '../../../utils/constants';
import { AiOutlineEye } from 'react-icons/ai';

function MyAccountOrdersPage() {
    const [orders, setOrders] = useState([]);
    const [loading, setLoading] = useState(true);

    const { token } = useSelector((state) => state.user);
    const navigate = useNavigate();

    const fetchOrders = useCallback(async () => {
        try {
            setLoading(true);
            const response = await axios.get('/orders/my-orders/all', {
                headers: { Authorization: `Bearer ${token}` },
            });
            setOrders(response.data);
            setLoading(false);
            console.log(response.data);
        } catch (err) {
            console.log(err.response);
        }
    }, [token]);

    useEffect(() => {
        console.log('myorder fetch');
        fetchOrders();
    }, [fetchOrders]);

    return (
        <div className='myAccountOrdersPage'>
            {loading ? (
                <div className='myAccountOrdersPage__loading'>
                    <Loader />
                </div>
            ) : orders.length < 1 ? (
                <div className='myAccountOrdersPage__notFound'>
                    <p>No order has been made yet.</p>
                    <Link to='/products'>
                        <button>Browse Products</button>
                    </Link>
                </div>
            ) : (
                <table className='myAccountOrdersPage__table'>
                    <thead>
                        <tr>
                            <th>Id</th>
                            <th>Date</th>
                            <th>Pay method</th>
                            <th>Status</th>
                            <th>Amount</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {orders.map((order) => {
                            const myDate = new Date(order.createdAt);

                            return (
                                <tr key={order._id}>
                                    <td>
                                        <span className='myAccountOrdersPage__table__mob-title'>
                                            Id:{' '}
                                        </span>
                                        #{order._id.slice(0, 5)}
                                    </td>
                                    <td>
                                        <span className='myAccountOrdersPage__table__mob-title'>
                                            Date:{' '}
                                        </span>
                                        {monthNames[myDate.getMonth()] +
                                            ' ' +
                                            myDate.getDate() +
                                            ', ' +
                                            myDate.getFullYear()}
                                    </td>
                                    <td>
                                        <span className='myAccountOrdersPage__table__mob-title'>
                                            Pay method:{' '}
                                        </span>
                                        {order.paymentType}
                                    </td>
                                    <td>
                                        <span className='myAccountOrdersPage__table__mob-title'>
                                            Status:{' '}
                                        </span>
                                        <span
                                            className='myAccountOrdersPage__table__status'
                                            style={{
                                                backgroundColor:
                                                    order.orderStatus ===
                                                    'delivered'
                                                        ? '#03543f'
                                                        : order.orderStatus ===
                                                          'shipped'
                                                        ? '#1e429f'
                                                        : order.orderStatus ===
                                                          'packed'
                                                        ? '#540354'
                                                        : '#0694a2',
                                            }}
                                        >
                                            {order.orderStatus}
                                        </span>
                                    </td>
                                    <td className='myAccountOrdersPage__table__price'>
                                        <span className='myAccountOrdersPage__table__mob-title'>
                                            Amount:{' '}
                                        </span>
                                        &#8377;{order.totalAmount}
                                    </td>
                                    <td
                                        onClick={() => {
                                            navigate(
                                                `/my-account/orders/${order._id}`
                                            );
                                        }}
                                    >
                                        <span className='myAccountOrdersPage__table__mob-title'>
                                            Action:{' '}
                                        </span>
                                        <AiOutlineEye />
                                    </td>
                                </tr>
                            );
                        })}
                    </tbody>
                </table>
            )}
        </div>
    );
}

export default MyAccountOrdersPage;
