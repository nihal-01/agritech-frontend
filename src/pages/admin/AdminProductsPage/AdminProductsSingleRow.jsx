import React, { useState } from 'react';
import { FiEdit, FiEye } from 'react-icons/fi';
import { MdDeleteOutline } from 'react-icons/md';
import { useDispatch, useSelector } from 'react-redux';
import axios from '../../../axios';
import { Loader } from '../../../components/customer';
import {
    deleteProduct,
    updateIsEdit,
} from '../../../redux/slices/productsSlice';

function AdminProductsSingleRow({ product, setIsProductSidebarOpen }) {
    const [loading, setLoading] = useState(false);

    const { _id, name, thumbnail, stock, price } = product;

    const { token } = useSelector((state) => state.user);
    const dispatch = useDispatch();

    const handleDelete = async (_id) => {
        try {
            const resp = window.confirm(`are you sure ${_id}`);
            if (resp) {
                setLoading(true);
                await axios.delete(`/products/${_id}`, {
                    headers: { Authorization: `Bearer ${token}` },
                });
                setLoading(false);
                dispatch(deleteProduct(_id));
            }
        } catch (err) {
            console.log(err.response);
        }
    };

    return (
        <tr>
            <td>#{_id.substr(_id.length - 5)}</td>
            <td>
                <div className='table--image'>
                    <img src={thumbnail} alt='' />
                </div>
            </td>
            <td>{name}</td>
            <td>₹{price}</td>
            <td>{stock}</td>
            <td>
                <button className='table--viewbtn'>
                    <FiEye />
                </button>
            </td>
            <td>
                <button
                    className='table--editbtn'
                    onClick={() => {
                        dispatch(
                            updateIsEdit({
                                isEdit: true,
                                editProductId: _id,
                            })
                        );
                        setIsProductSidebarOpen(true);
                    }}
                >
                    <FiEdit />
                </button>
                <button
                    className='table--deletebtn'
                    onClick={() => {
                        handleDelete(_id);
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

export default AdminProductsSingleRow;
