import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';

import './ProductList.scss';
import { noProductImg } from '../../../assets/images';
import { ListView, GridView, Pagination } from '..';
import {
    clearFilters,
    fetchProducts,
    updateProductLoading,
} from '../../../redux/slices/productsSlice';
import { GridViewLoading, ListViewLoading } from '.';

function ProductList() {
    const [imgLoaded, setImgLoaded] = useState(false);

    const products = useSelector((state) => state.products.products);
    const dispatch = useDispatch();
    const { skip, sort, filters, loading, gridView } = useSelector(
        (state) => state.products
    );

    useEffect(() => {
        console.log('product fetching...');
        dispatch(updateProductLoading(true));
        dispatch(fetchProducts());
    }, [dispatch, skip, sort, filters]);

    useEffect(() => {
        return () => {
            dispatch(clearFilters());
        };
    }, [dispatch]);

    if (loading) {
        if (gridView) {
            return <GridViewLoading />;
        }
        return <ListViewLoading />;
    }

    if (products.length <= 0) {
        return (
            <div className='productNotFound'>
                <div className='productNotFound__img__wrapper'>
                    <img
                        src={noProductImg}
                        alt=''
                        onLoad={() => setImgLoaded(true)}
                    />
                    <div className='productNotFound__img__loader__wrapper'>
                        {!imgLoaded && <div className='loader'></div>}
                    </div>
                </div>
                <h3>No Products Found!</h3>
            </div>
        );
    }

    if (gridView) {
        return (
            <>
                <GridView products={products} />
                <Pagination />
            </>
        );
    }

    return <ListView />;
}

export default ProductList;
