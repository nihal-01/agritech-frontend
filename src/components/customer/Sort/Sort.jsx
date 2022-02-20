import React from 'react';
import { HiOutlineFilter, HiOutlineViewGrid } from 'react-icons/hi';
// HiViewGrid
import { BsListUl } from 'react-icons/bs';

import './Sort.scss';
import { useDispatch } from 'react-redux';
import { updateSort } from '../../../redux/slices/productsSlice';
import { useSelector } from 'react-redux';
import { updateFilterSidebar } from '../../../redux/slices/layoutSlice';

function Sort() {
    const dispatch = useDispatch();
    const { loading, totalProducts } = useSelector((state) => state.products);

    return (
        <div className='sort__wrapper'>
            <div className='sort'>
                <div className='sort__left'>
                    <button
                        className='sort__left__filter'
                        onClick={() => {
                            dispatch(updateFilterSidebar(true));
                        }}
                    >
                        <HiOutlineFilter /> Filter
                    </button>
                    {loading ? (
                        <div className='sort__left__loading'></div>
                    ) : (
                        <p>Showing all {totalProducts} results</p>
                    )}
                </div>
                <div className='sort__right'>
                    <button className='sort__right__icon'>
                        <HiOutlineViewGrid />
                    </button>
                    <button className='sort__right__icon'>
                        <BsListUl />
                    </button>
                    <select
                        name='sort'
                        id=''
                        onChange={(e) => {
                            dispatch(updateSort(e.target.value));
                        }}
                    >
                        <option value='default'>Sort by default</option>
                        <option value='name:asc'>Name: A - Z</option>
                        <option value='name:desc'>Name: Z - A</option>
                        <option value='price:asc'>price: low to high</option>
                        <option value='price:desc'>price: high to low</option>
                    </select>
                </div>
            </div>
            <hr />
        </div>
    );
}

export default Sort;
