import React from 'react';
import { useSelector } from 'react-redux';

import './ListView.scss';
import ListViewItem from './ListViewItem';
import ProductCard from '../ProductCard/ProductCard';

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
