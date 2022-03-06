import React from 'react';

import './ListView.scss';
import ListViewItem from './ListViewItem';

function ListView({ products }) {
    return (
        <div className='listView'>
            {products.map((product) => {
                return <ListViewItem {...product} key={product._id} />;
            })}
        </div>
    );
}

export default ListView;
