import React from 'react';

import './GridView.scss';
import GridViewItem from './GridViewItem';
import ProductCard from '../ProductCard/ProductCard';
import { useSelector } from 'react-redux';

function GridView({ products, count = 4 }) {
    const { productCard } = useSelector((state) => state.layout);

    return (
        <div
            className='gridView'
            style={{ gridTemplateColumns: `repeat(${count}, 1fr)` }}
        >
            {productCard && <ProductCard />}
            {products.map((product, index) => {
                return <GridViewItem {...product} key={index} />;
            })}
        </div>
    );
}

export default GridView;
