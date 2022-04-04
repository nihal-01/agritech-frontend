import React from 'react';
import { HiOutlineFilter, HiOutlineViewGrid } from 'react-icons/hi';
// HiViewGrid
import { BsListUl } from 'react-icons/bs';
import { useSelector, useDispatch } from 'react-redux';

import './Sort.scss';
import {
    updateGridView,
    updateSort,
} from '../../../redux/slices/productsSlice';
import { updateFilterSidebar } from '../../../redux/slices/layoutSlice';

function Sort() {
    const dispatch = useDispatch();
    const { loading, totalProducts, gridView } = useSelector(
        (state) => state.products
    );

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
                    <button
                        className={
                            gridView
                                ? 'sort__right__icon sort__right__icon__active'
                                : 'sort__right__icon'
                        }
                        onClick={() => {
                            dispatch(updateGridView(true));
                        }}
                    >
                        <HiOutlineViewGrid />
                    </button>
                    <button
                        className={
                            !gridView
                                ? 'sort__right__icon sort__right__icon__active'
                                : 'sort__right__icon'
                        }
                        onClick={() => {
                            dispatch(updateGridView(false));
                        }}
                    >
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
