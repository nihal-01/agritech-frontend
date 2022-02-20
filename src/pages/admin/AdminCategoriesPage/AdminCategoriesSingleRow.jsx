import React, { useState } from 'react';
import { FiEdit } from 'react-icons/fi';
import { MdDeleteOutline } from 'react-icons/md';
import { useDispatch, useSelector } from 'react-redux';

import {
    deleteCategory,
    updateIsEdit,
} from '../../../redux/slices/categoriesSlice';
import axios from '../../../axios';
import { noImage } from '../../../assets/images';
import { Loader } from '../../../components/customer';

function AdminCategoriesSingleRow({ category, setIsCategorySidebarOpen }) {
    const [loading, setLoading] = useState(false);

    const { token } = useSelector((state) => state.user);
    const dispatch = useDispatch();

    const handleDelete = async (_id) => {
        try {
            const resp = window.confirm(`are you sure ${_id}`);
            if (resp) {
                setLoading(true);
                await axios.delete(`/categories/${_id}`, {
                    headers: { Authorization: `Bearer ${token}` },
                });
                setLoading(false);
                dispatch(deleteCategory(_id));
            }
        } catch (err) {
            console.log(err.response.data);
        }
    };

    const handleEdit = (category) => {
        dispatch(updateIsEdit({ isEdit: true, category }));
        setIsCategorySidebarOpen(true);
    };

    return (
        <tr>
            <td>#{category._id.substr(category._id.length - 5)}</td>
            <td>
                <div className='table--image'>
                    <img src={category.icon ? category.icon : noImage} alt='' />
                </div>
            </td>
            <td>{category.name}</td>
            <td>
                <button
                    className='table--editbtn'
                    onClick={() => {
                        handleEdit(category);
                    }}
                >
                    <FiEdit />
                </button>
                <button
                    className='table--deletebtn'
                    onClick={() => {
                        handleDelete(category._id);
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

export default AdminCategoriesSingleRow;
