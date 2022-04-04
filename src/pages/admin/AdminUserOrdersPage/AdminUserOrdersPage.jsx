import React, { useCallback, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

import './AdminUserOrdersPage.scss';
import { adminNotFoundImg } from '../../../assets/images';
import { Loader } from '../../../components/customer';
import AdminOrdersSingleRow from '../AdminOrdersPage/AdminOrdersSingleRow';
import axios from '../../../axios';
import { setAllOrders } from '../../../redux/slices/ordersSlice';

function AdminUserOrdersPage() {
    const [loading, setLoading] = useState(true);

    const { id } = useParams();
    const { token } = useSelector((state) => state.user);
    const { orders } = useSelector((state) => state.orders);
    const dispatch = useDispatch();

    const fetchOrders = useCallback(async () => {
        try {
            const orders = await axios.get(`/orders/user/${id}`, {
                headers: { Authorization: `Bearer ${token}` },
            });
            setLoading(false);
            dispatch(setAllOrders({ orders: orders.data }));
        } catch (err) {
            console.log(err.response);
        }
    }, [dispatch, id, token]);

    useEffect(() => {
        fetchOrders();
    }, [fetchOrders]);

    return (
        <div className='adminCustomerOrders'>
            <h1 className='adminCustomerOrders__title'>Customer Orders List</h1>

            {loading ? (
                <div className='adminOrders__loading'>
                    <Loader color={'#fff'} />
                </div>
            ) : orders.length < 1 ? (
                <div className='adminOrders__notfound'>
                    <img src={adminNotFoundImg} alt='' />
                    <p>Sorry, orders not found</p>
                </div>
            ) : (
                <div className='admin__table-wrapper'>
                    <div className='admin__table'>
                        <table>
                            <thead>
                                <tr>
                                    <th>Id</th>
                                    <th>Time</th>
                                    <th>City</th>
                                    <th>phone</th>
                                    <th>Method</th>
                                    <th>Amount</th>
                                    <th className='admin__table__center'>
                                        Status
                                    </th>
                                    <th className='admin__table__center'>
                                        Action
                                    </th>
                                    <th className='admin__table__center'>
                                        Invoice
                                    </th>
                                </tr>
                            </thead>
                            <tbody>
                                {orders.map((product) => {
                                    return (
                                        <AdminOrdersSingleRow
                                            key={product._id}
                                            product={product}
                                        />
                                    );
                                })}
                            </tbody>
                        </table>
                    </div>
                </div>
            )}
        </div>
    );
}

export default AdminUserOrdersPage;
