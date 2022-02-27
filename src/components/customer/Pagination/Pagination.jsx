import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';

import './Pagination.scss';

function Pagination({ limit, skip, totalItems, updateSkip }) {
    const [pageNumbers, setPageNumbers] = useState([]);

    const dispatch = useDispatch();

    useEffect(() => {
        const pageNo = [];
        for (var i = 1; i <= Math.ceil(totalItems / limit); i++) {
            pageNo.push(i);
        }
        setPageNumbers(pageNo);
    }, [limit, totalItems]);

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
                disabled={skip + 1 >= Math.ceil(totalItems / limit)}
            >
                Next &gt;
            </button>
        </div>
    );
}

export default Pagination;
