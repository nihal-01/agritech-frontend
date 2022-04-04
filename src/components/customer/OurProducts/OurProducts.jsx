import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import './OurProducts.scss';
import { noProductImg } from '../../../assets/images';
import {
    clearFilters,
    fetchProducts,
    updateCategory,
    updateLimit,
    updateProductLoading,
} from '../../../redux/slices/productsSlice';
import GridView from '../GridView/GridView';

function OurProducts() {
    const { categories } = useSelector((state) => state.categories);

    const { filters, loading, products } = useSelector(
        (state) => state.products
    );

    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(updateLimit(5));
        dispatch(updateProductLoading(true));
        dispatch(fetchProducts());
    }, [dispatch, filters]);

    useEffect(() => {
        return () => {
            dispatch(clearFilters());
        };
    }, [dispatch]);

    return (
        <div className='ourProducts'>
            <div className='ourProducts__header'>
                <h2 className='ourProducts__header__title'>Our Products</h2>
                <ul className='ourProducts__header__categories'>
                    <li
                        className={
                            filters?.category === 'all'
                                ? 'ourProducts__header__categories__item ourProducts__header__categories__item__active'
                                : 'ourProducts__header__categories__item'
                        }
                        onClick={() => {
                            dispatch(updateCategory('all'));
                        }}
                    >
                        All Products
                    </li>
                    {categories.slice(0, 3).map((category) => {
                        return (
                            <li
                                key={category._id}
                                className={
                                    filters?.category === category.name
                                        ? 'ourProducts__header__categories__item ourProducts__header__categories__item__active'
                                        : 'ourProducts__header__categories__item'
                                }
                                onClick={() => {
                                    dispatch(updateCategory(category.name));
                                }}
                            >
                                {category.name}
                            </li>
                        );
                    })}
                </ul>
            </div>
            {loading ? (
                <div className='ourProducts__loading'>
                    {Array.from({ length: 5 }).map((_, index) => {
                        return (
                            <div
                                className='ourProducts__loading__item'
                                key={index}
                            >
                                <div className='ourProducts__loading__item__img'></div>
                                <div className='ourProducts__loading__item__name'></div>
                                <div className='ourProducts__loading__item__price'></div>
                            </div>
                        );
                    })}
                </div>
            ) : products.length < 1 ? (
                <div className='productNotFound'>
                    <div className='productNotFound__img__wrapper'>
                        <img src={noProductImg} alt='' />
                    </div>
                    <h3>No Products Found!</h3>
                </div>
            ) : (
                <GridView products={products} count={5} />
            )}
        </div>
    );
}

export default OurProducts;
