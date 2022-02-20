import React, { useCallback, useEffect, useState } from 'react';
import { AiOutlineCloudDownload } from 'react-icons/ai';

import './AdminOrdersPage.scss';
import axios from '../../../axios';
import { adminNotFoundImg } from '../../../assets/images';
import { Loader } from '../../../components/customer';
import AdminOrdersSingleRow from './AdminOrdersSingleRow';
import { useDispatch, useSelector } from 'react-redux';
import { setAllOrders, updateSkip } from '../../../redux/slices/ordersSlice';

const limit = 12;

function AdminOrdersPage() {
    const [loading, setLoading] = useState(true);
    const [status, setStatus] = useState('all');
    const [payType, setPayType] = useState('all');
    const [time, setTime] = useState('all');
    const [pageNumbers, setPageNumbers] = useState([]);

    const dispatch = useDispatch();
    const { orders, skip, totalOrders } = useSelector((state) => state.orders);
    const { token } = useSelector((state) => state.user);

    console.log('admin orders page');
    const fetchOrders = useCallback(async () => {
        try {
            console.log('fetching orders');
            setLoading(true);
            const response = await axios.get(
                `/orders?status=${status}&createdAt=${time}&paymentType=${payType}&skip=${skip}`,
                {
                    headers: { Authorization: `Bearer ${token}` },
                }
            );

            dispatch(setAllOrders(response.data));
            setLoading(false);
        } catch (err) {
            console.log(err.response);
        }
    }, [dispatch, status, payType, time, skip, token]);

    useEffect(() => {
        fetchOrders();
    }, [fetchOrders]);

    useEffect(() => {
        const pageNo = [];
        for (var i = 1; i <= Math.ceil(totalOrders / limit); i++) {
            pageNo.push(i);
        }
        setPageNumbers(pageNo);
    }, [totalOrders]);

    return (
        <div className='adminOrders'>
            <h1 className='adminOrders__title'>Orders</h1>
            <div className='adminOrders__options'>
                <div className='adminOrders__options__select'>
                    <select
                        name='paymentType'
                        id=''
                        onChange={(e) => {
                            setPayType(e.target.value);
                        }}
                    >
                        <option value='all'>All payments</option>
                        <option value='cod'>COD</option>
                        <option value='card'>Card</option>
                    </select>
                </div>
                <div className='adminOrders__options__select'>
                    <select
                        name='status'
                        id=''
                        onChange={(e) => {
                            setStatus(e.target.value);
                        }}
                    >
                        <option value='all'>All Status</option>
                        <option value='ordered'>Ordered</option>
                        <option value='packed'>Packed</option>
                        <option value='shipped'>Shipped</option>
                        <option value='delivered'>Delivered</option>
                    </select>
                </div>
                <div className='adminOrders__options__select'>
                    <select
                        name='createdAt'
                        id=''
                        onChange={(e) => {
                            setTime(e.target.value);
                        }}
                    >
                        <option value='all'>All Time</option>
                        <option value='1'>Today order</option>
                        <option value='7'>Last 7 days</option>
                        <option value='15'>Last 15 days</option>
                        <option value='30'>Last 30 days</option>
                    </select>
                </div>
                <div className='adminOrders__options__btn'>
                    <button>
                        Download All Orders{' '}
                        <span>
                            <AiOutlineCloudDownload />
                        </span>
                    </button>
                </div>
            </div>

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
                    <div className='admin__table__bottom'>
                        <div className='admin__table__bottom__results'>
                            SHOWING {limit * skip + 1} -{' '}
                            {limit * (skip + 1) <= totalOrders
                                ? limit * (skip + 1)
                                : totalOrders}{' '}
                            OF {totalOrders}
                        </div>
                        <div className='admin__table__bottom__pagination'>
                            <button
                                className='admin__table__bottom__pagination__btn'
                                onClick={() => {
                                    dispatch(updateSkip(skip - 1));
                                }}
                                disabled={skip <= 0}
                            >
                                &lt;
                            </button>
                            {pageNumbers.map((number) => {
                                return (
                                    <button
                                        key={number}
                                        onClick={() => {
                                            dispatch(updateSkip(number - 1));
                                        }}
                                        className={
                                            skip + 1 === number
                                                ? 'admin__table__bottom__pagination__btn admin__table__bottom__pagination__btn__active'
                                                : 'admin__table__bottom__pagination__btn'
                                        }
                                    >
                                        {number}
                                    </button>
                                );
                            })}
                            <button
                                className='admin__table__bottom__pagination__btn'
                                onClick={() => {
                                    dispatch(updateSkip(skip + 1));
                                }}
                                disabled={
                                    skip + 1 >= Math.ceil(totalOrders / limit)
                                }
                            >
                                &gt;
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}

export default AdminOrdersPage;
