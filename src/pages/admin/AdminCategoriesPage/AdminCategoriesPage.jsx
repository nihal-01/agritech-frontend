import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';
import { FiEdit } from 'react-icons/fi';
import { MdDeleteOutline } from 'react-icons/md';

import './AdminCategoriesPage.scss';
import { AdminCategorySidebar } from '../../../components/admin';
import {
    deleteCategory,
    updateIsEdit,
} from '../../../redux/slices/categoriesSlice';
import { adminNotFoundImg, noImage } from '../../../assets/images';
import axios from '../../../axios';

function AdminCategoriesPage() {
    const [isCategorySidebarOpen, setIsCategorySidebarOpen] = useState(false);

    const dispatch = useDispatch();
    const categories = useSelector((state) => state.categories.categories);

    const handleDelete = async (_id) => {
        try {
            const resp = window.confirm(`are you sure ${_id}`);
            if (resp) {
                await axios.delete(`/categories/${_id}`);
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
        <div className='admin--categories'>
            <h1 className='admin--categories__title'>Categories</h1>
            <div className='admin--categories__options'>
                <div className='admin--categories__options__search'>
                    <input
                        type='text'
                        placeholder='Search categories by name'
                        name='search'
                    />
                </div>
                <div className='admin--categories__options__button'>
                    <button
                        onClick={() => {
                            dispatch(updateIsEdit({ isEdit: false }));
                            setIsCategorySidebarOpen(true);
                        }}
                    >
                        <span>+ Add Category</span>
                    </button>
                </div>
            </div>
            <AdminCategorySidebar
                isCategorySidebarOpen={isCategorySidebarOpen}
                setIsCategorySidebarOpen={setIsCategorySidebarOpen}
            />
            {categories.length < 1 ? (
                <div className='admin--categories__notfound'>
                    <img src={adminNotFoundImg} alt='' />
                    <p>Sorry, categories not found</p>
                </div>
            ) : (
                <div className='admin__table-wrapper'>
                    <div className='admin__table'>
                        <table>
                            <thead>
                                <tr>
                                    <th>Id</th>
                                    <th>Icon</th>
                                    <th>Name</th>
                                    <th>Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                {categories.map((category) => {
                                    return (
                                        <tr key={category._id}>
                                            <td>
                                                #
                                                {category._id.substr(
                                                    category._id.length - 5
                                                )}
                                            </td>
                                            <td>
                                                <div className='table--image'>
                                                    <img
                                                        src={
                                                            category.icon
                                                                ? category.icon
                                                                : noImage
                                                        }
                                                        alt=''
                                                    />
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
                                                        handleDelete(
                                                            category._id
                                                        );
                                                    }}
                                                >
                                                    <MdDeleteOutline />
                                                </button>
                                            </td>
                                        </tr>
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

export default AdminCategoriesPage;
