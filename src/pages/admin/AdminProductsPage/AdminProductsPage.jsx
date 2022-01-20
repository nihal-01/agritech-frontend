import React, { useState } from 'react';

import './AdminProductsPage.scss';
import { AdminAddProductSidebar } from '../../../components/admin';

function AdminProductsPage() {
    const [addProductSidebar, setAddProductsSidebar] = useState(false);

    return (
        <div className='admin--products'>
            <h1 className='admin--products__title'>Products</h1>
            <div className='admin--products--options'>
                <div className='admin--products--options__search'>
                    <input type='text' placeholder='Search by product name' />
                </div>
                <div className='admin--products--options__category'>
                    <select name='' id=''>
                        <option value=''>All categories</option>
                        <option value=''>All categories</option>
                        <option value=''>All categories</option>
                    </select>
                </div>
                <div className='admin--products--options__price'>
                    <select name='' id=''>
                        <option value=''>Default</option>
                        <option value=''>Default</option>
                        <option value=''>Default</option>
                    </select>
                </div>
                <div className='admin--products--options__add'>
                    <button>
                        <span>+</span> Add Product
                    </button>
                </div>
            </div>
            <AdminAddProductSidebar
                addProductSidebar={addProductSidebar}
                setAddProductsSidebar={setAddProductsSidebar}
            />
        </div>
    );
}

export default AdminProductsPage;
