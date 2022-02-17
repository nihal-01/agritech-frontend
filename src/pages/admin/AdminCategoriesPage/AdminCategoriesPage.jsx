import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';

import './AdminCategoriesPage.scss';
import { AdminCategorySidebar } from '../../../components/admin';

import { adminNotFoundImg } from '../../../assets/images';
import { updateIsEdit } from '../../../redux/slices/categoriesSlice';
import AdminCategoriesSingleRow from './AdminCategoriesSingleRow';

function AdminCategoriesPage() {
    const [isCategorySidebarOpen, setIsCategorySidebarOpen] = useState(false);

    const dispatch = useDispatch();
    const categories = useSelector((state) => state.categories.categories);

    return (
        <div className='admin--categories'>
            <h1 className='admin--categories__title'>Categories</h1>
            <div className='admin--categories__options'>
                <div className='admin--categories__options__search'>
                    <input
                        type='text'
                        placeholder='Search categories by name'
                        name='search'
                        disabled
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
                                        <AdminCategoriesSingleRow
                                            key={category._id}
                                            category={category}
                                            setIsCategorySidebarOpen={
                                                setIsCategorySidebarOpen
                                            }
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

export default AdminCategoriesPage;
