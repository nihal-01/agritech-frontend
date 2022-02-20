import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useLocation, useParams } from 'react-router-dom';
import { noProductImg } from '../../../assets/images';
import {
    BlankSpace,
    GridView,
    PageHero,
    Pagination,
} from '../../../components/customer';
import {
    clearFilters,
    fetchProducts,
    updateCategory,
    updateProductLoading,
    updateSearch,
} from '../../../redux/slices/productsSlice';

import './SearchPage.scss';

function SearchPage() {
    const [imgLoaded, setImgLoaded] = useState(false);

    const { category, search } = useParams();
    const location = useLocation();
    const dispatch = useDispatch();

    const { products, loading } = useSelector((state) => state.products);

    useEffect(() => {
        if (location.pathname.split('/')[2] === 'search') {
            dispatch(updateSearch(search));
        } else {
            dispatch(updateCategory(category));
        }
        dispatch(updateProductLoading(true));
        dispatch(fetchProducts());
    }, [category, search, location.pathname, dispatch]);

    useEffect(() => {
        return () => {
            dispatch(clearFilters());
        };
    }, [dispatch]);

    return (
        <div className='searchPage-wrapper'>
            <PageHero title={category || search} product={true} />
            <BlankSpace />
            <div className='searchPage'>
                {loading ? (
                    <div
                        className='gridViewLoading'
                        style={{ gridTemplateColumns: 'repeat(5, 1fr)' }}
                    >
                        {Array.from({ length: 12 }).map((_, index) => {
                            return (
                                <div
                                    key={index}
                                    className='gridViewLoading__item'
                                >
                                    <div className='gridViewLoading__item__img'></div>
                                    <div className='gridViewLoading__item__name'></div>
                                    <div className='gridViewLoading__item__price'></div>
                                </div>
                            );
                        })}
                    </div>
                ) : products.length < 1 ? (
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
                ) : (
                    <>
                        <GridView products={products} count={5} />
                        <Pagination />
                    </>
                )}
            </div>
        </div>
    );
}

export default SearchPage;
