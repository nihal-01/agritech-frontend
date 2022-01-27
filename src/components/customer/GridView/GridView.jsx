import React from 'react';

import './GridView.scss';
import GridViewItem from './GridViewItem';

function GridView({ products, count = 4 }) {
    return (
        <div
            className='gridView'
            style={{ gridTemplateColumns: `repeat(${count}, 1fr)` }}
        >
            {products.map((product, index) => {
                return <GridViewItem {...product} key={index} />;
            })}
        </div>
    );
}

export default GridView;
