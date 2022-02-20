import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { updateFilterSidebar } from '../../../redux/slices/layoutSlice';
import { updateCategory } from '../../../redux/slices/productsSlice';

import './Filters.scss';

const tags = [
    'vegitables',
    'healthy',
    'vitamin',
    'natural',
    'meat',
    'organic',
    'juices',
    'home maid',
];

function Filters() {
    const [totalProducts, setTotalProducts] = useState(0);

    const categories = useSelector((state) => state.categories.categories);
    const dispatch = useDispatch();
    const { filterSidebar } = useSelector((state) => state.layout);

    useEffect(() => {
        let total = 0;
        for (let i = 0; i < categories.length; i++) {
            total += Number(categories[i].count);
        }
        setTotalProducts(total);
    }, [categories]);

    return (
        <div className='filters-wrapper'>
            <div
                className={
                    filterSidebar
                        ? 'filters__overlay filters__overlay__active'
                        : 'filters__overlay'
                }
                onClick={() => {
                    dispatch(updateFilterSidebar(false));
                }}
            ></div>
            <div
                className={
                    filterSidebar ? 'filters filters__mobile' : 'filters'
                }
            >
                <span
                    className='filters__hide'
                    onClick={() => {
                        dispatch(updateFilterSidebar(false));
                    }}
                >
                    HIDE FILTER
                </span>
                <div className='filters__categories'>
                    <h3>Explore</h3>
                    <hr />
                    <ul className='filters__categories__list'>
                        <li>
                            <Link
                                to='#'
                                onClick={() => {
                                    dispatch(updateFilterSidebar(false));
                                    dispatch(updateCategory('all'));
                                }}
                            >
                                All
                            </Link>{' '}
                            ({totalProducts})
                        </li>
                        {categories.map((category, index) => {
                            return (
                                <li key={index}>
                                    <Link
                                        to='#'
                                        onClick={() => {
                                            dispatch(
                                                updateFilterSidebar(false)
                                            );
                                            dispatch(
                                                updateCategory(category._id)
                                            );
                                        }}
                                    >
                                        {category.name}
                                    </Link>{' '}
                                    ({category.count})
                                </li>
                            );
                        })}
                    </ul>
                </div>
                {/* <div className='filters__price'>
                <h3>Price</h3>
                <hr />
                <input
                    type='range'
                    className='filters__price__slider'
                    min={0}
                    max={100}
                    value={100}
                    // onChange={(e) => setPrice(e.target.value)}
                />
                <div className='filters__price__range'>
                    <p>price: $0 - ${100}</p>
                    <button>Filter</button>
                </div>
            </div> */}
                <div className='filters__tags'>
                    <h3>Product tags</h3>
                    <hr />
                    <div className='filters__tags__list'>
                        {tags.map((tag, index) => {
                            return (
                                <Link
                                    to='/'
                                    key={index}
                                    onClick={() => {
                                        dispatch(updateFilterSidebar(false));
                                    }}
                                >
                                    {tag}
                                </Link>
                            );
                        })}
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Filters;
