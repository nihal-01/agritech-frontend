import React from 'react';

import './ListView.scss';
import ListViewItem from './ListViewItem';
import ProductCard from '../ProductCard/ProductCard';
import { useSelector } from 'react-redux';

function ListView({ products }) {
    const { productCard } = useSelector((state) => state.layout);

    return (
        <div className='listView'>
            {productCard && <ProductCard />}
            {products.map((product) => {
                return <ListViewItem {...product} key={product._id} />;
            })}
        </div>
    );
}

export default ListView;
