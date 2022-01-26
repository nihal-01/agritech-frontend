import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux';

import './Pagination.scss';
import { updateSkip } from '../../../redux/slices/productsSlice';

function Pagination() {
    const [pageNumbers, setPageNumbers] = useState([]);

    const dispatch = useDispatch();
    const { limit, skip, totalProducts } = useSelector(
        (state) => state.products
    );

    useEffect(() => {
        const pageNo = [];
        for (var i = 1; i <= Math.ceil(totalProducts / limit); i++) {
            pageNo.push(i);
        }
        setPageNumbers(pageNo);
    }, [limit, totalProducts]);

    return (
        <div className='pagination'>
            <button
                className='pagination__prevBtn'
                onClick={() => {
                    dispatch(updateSkip(skip - 1));
                }}
                disabled={skip <= 0}
            >
                &lt; Prev
            </button>
            {pageNumbers.map((number) => {
                return (
                    <button
                        key={number}
                        onClick={() => {
                            dispatch(updateSkip(number - 1));
                        }}
                        className={
                            skip + 1 === number
                                ? 'pagination__btn pagination__btn__active'
                                : 'pagination__btn'
                        }
                    >
                        {number}
                    </button>
                );
            })}
            <button
                className='pagination__nextBtn'
                onClick={() => {
                    dispatch(updateSkip(skip + 1));
                }}
                disabled={skip + 1 >= Math.ceil(totalProducts / limit)}
            >
                Next &gt;
            </button>
        </div>
    );
}

export default Pagination;
