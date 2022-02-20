import React, { useState} from 'react';
import { FiEye } from 'react-icons/fi';
import { useDispatch, useSelector } from 'react-redux';
import axios from '../../../axios';
import { Loader } from '../../../components/customer';
import { updateStatus } from '../../../redux/slices/ordersSlice';

import { monthNames } from '../../../utils/constants';

function AdminOrdersSingleRow({ product }) {
    const [loading, setLoading] = useState(false);
    const [status, setStatus] = useState(product?.orderStatus);

    const { token } = useSelector((state) => state.user);

    const { _id, createdAt, address, paymentType, totalAmount, orderStatus } =
        product;
    const myDate = new Date(createdAt);

    const dispatch = useDispatch();

    const handleChange = async (e) => {
        try {
            setStatus(e.target.value);
            setLoading(true);
            await axios.patch(
                `/orders/${_id}`,
                {
                    orderStatus: e.target.value,
                },
                {
                    headers: { Authorization: `Bearer ${token}` },
                }
            );
            setLoading(false);
            dispatch(updateStatus({ _id, status: e.target.value }));
        } catch (err) {
            console.log(err.response);
        }
    };

    return (
        <tr>
            <td>#{_id.substr(_id.length - 5)}</td>
            <td>
                {monthNames[myDate.getMonth()].slice(0, 3) +
                    ' ' +
                    myDate.getDate() +
                    ', ' +
                    myDate.getFullYear()}
            </td>
            <td>{address?.city}</td>
            <td>{address?.phone}</td>
            <td>{paymentType}</td>
            <td>&#8377; {totalAmount}</td>
            <td className='admin__table__center'>
                <span
                    style={{
                        backgroundColor:
                            orderStatus === 'delivered'
                                ? '#03543f'
                                : orderStatus === 'shipped'
                                ? '#1e429f'
                                : orderStatus === 'packed'
                                ? '#540354'
                                : '#0694a2',
                    }}
                    className='admin__table__status'
                >
                    {orderStatus}
                </span>
            </td>
            <td className='admin__table__center'>
                <select name='' id='' value={status} onChange={handleChange}>
                    <option value='ordered'>Ordered</option>
                    <option value='packed'>Packed</option>
                    <option value='shipped'>Shipped</option>
                    <option value='delivered'>Delivered</option>
                </select>
            </td>
            <td className='admin__table__center'>
                <button className='table--viewbtn'>
                    <FiEye />
                </button>
            </td>
            {loading && (
                <>
                    <td className='admin__table__loading-wrapper'></td>
                    <td className='admin__table__loading'>
                        <Loader color={'#fff'} />
                    </td>
                </>
            )}
        </tr>
    );
}

export default AdminOrdersSingleRow;
