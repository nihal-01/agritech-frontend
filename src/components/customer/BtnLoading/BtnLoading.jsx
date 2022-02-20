import React from 'react';

import './BtnLoading.scss';

function BtnLoading({ width, height }) {
    return (
        <div className='btnLoading'>
            <span
                className='btnLoading__loader'
                style={{ width: width, height: height }}
            ></span>
        </div>
    );
}

export default BtnLoading;
