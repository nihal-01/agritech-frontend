import React, { useState } from 'react';
import { AdminCategorySidebar } from '../../../components/admin';

import './AdminCategoriesPage.scss';

function AdminCategoriesPage() {
    const [isCategorySidebarOpen, setIsCategorySidebarOpen] = useState(false);

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
                    <button>
                        <span>+ Add Category</span>
                    </button>
                </div>
            </div>
            <AdminCategorySidebar />
        </div>
    );
}

export default AdminCategoriesPage;
