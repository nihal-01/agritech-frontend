import React from 'react';
import {
    BlankSpace,
    Filters,
    PageHero,
    ProductList,
    Sort,
} from '../../../components/customer';

import './ProductsPage.scss';

function ProductsPage() {
    return (
        <div className='products__page'>
            <PageHero title='Products' />
            <BlankSpace />
            <div className='products__page__wrapper'>
                <Filters />
                <div>
                    <Sort />
                    <ProductList />
                </div>
            </div>
        </div>
    );
}

export default ProductsPage;
