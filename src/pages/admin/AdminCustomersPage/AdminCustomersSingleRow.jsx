import React, { useState } from 'react';
import { FiEye } from 'react-icons/fi';
import { MdDeleteOutline } from 'react-icons/md';
import { useDispatch, useSelector } from 'react-redux';
import { noImage } from '../../../assets/images';
import { deleteUser } from '../../../redux/slices/userSlice';

import axios from '../../../axios';
import { Loader } from '../../../components/customer';

function AdminCustomersSingleRow({ user }) {
    const [loading, setLoading] = useState(false);

    const { token } = useSelector((state) => state.user);
    const dispatch = useDispatch();

    const handleDelete = async (id) => {
        try {
            const resp = window.confirm(`are you sure ${user._id}`);
            if (resp) {
                setLoading(true);
                await axios.delete(`/users/${id}`, {
                    headers: { Authorization: `Bearer ${token}` },
                });
                setLoading(false);
                dispatch(deleteUser(id));
            }
        } catch (err) {
            console.log(err.response);
        }
    };

    return (
        <tr>
            <td>#{user._id.substr(user._id.length - 5)}</td>
            <td>
                <div className='table--image'>
                    <img src={user?.avatar ? user.avatar : noImage} alt='' />
                </div>
            </td>
            <td>{user.fname}</td>
            <td>{user.email}</td>
            <td>
                <button className='table--editbtn'>
                    <FiEye />
                </button>
                <button
                    className='table--deletebtn'
                    onClick={() => {
                        handleDelete(user._id);
                    }}
                >
                    <MdDeleteOutline />
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

export default AdminCustomersSingleRow;
