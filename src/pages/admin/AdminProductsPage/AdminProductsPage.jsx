import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';

import './AdminProductsPage.scss';
import { AdminProductSidebar } from '../../../components/admin';
import {
    fetchProducts,
    updateCategory,
    updateSkip,
    updateSort,
    updateIsEdit,
    clearFilters,
    updateSearch,
    updateProductLoading,
} from '../../../redux/slices/productsSlice';
import { Loader } from '../../../components/customer';
import { adminNotFoundImg } from '../../../assets/images';
import AdminProductsSingleRow from './AdminProductsSingleRow';

function AdminProductsPage() {
    const [isProductSidebarOpen, setIsProductSidebarOpen] = useState(false);
    const [pageNumbers, setPageNumbers] = useState([]);
    const [searchText, setSearchText] = useState('');

    console.log('products page');

    const dispatch = useDispatch();
    const categories = useSelector((state) => state.categories.categories);
    const {
        products,
        skip,
        limit,
        totalProducts,
        filters,
        sort,
        loading,
        search,
    } = useSelector((state) => state.products);

    const handleSearch = (e) => {
        e.preventDefault();
        dispatch(updateSearch(searchText));
    };

    useEffect(() => {
        dispatch(updateProductLoading(true));
        dispatch(fetchProducts());
    }, [dispatch, skip, filters, sort, search]);

    useEffect(() => {
        return () => {
            dispatch(clearFilters());
        };
    }, [dispatch]);

    useEffect(() => {
        const pageNo = [];
        for (var i = 1; i <= Math.ceil(totalProducts / limit); i++) {
            pageNo.push(i);
        }
        setPageNumbers(pageNo);
    }, [limit, totalProducts]);

    return (
        <div className='admin--products'>
            <h1 className='admin--products__title'>Products</h1>
            <div className='admin--products--options'>
                <form
                    className='admin--products--options__search'
                    onSubmit={handleSearch}
                >
                    <input
                        type='text'
                        placeholder='Search by product name'
                        onChange={(e) => {
                            setSearchText(e.target.value);
                        }}
                    />
                </form>
                <div className='admin--products--options__category'>
                    <select
                        name=''
                        id=''
                        onChange={(e) => {
                            dispatch(updateCategory(e.target.value));
                        }}
                    >
                        <option value='all'>All Products</option>
                        {categories.map((category) => {
                            return (
                                <option value={category._id} key={category._id}>
                                    {category.name}
                                </option>
                            );
                        })}
                    </select>
                </div>
                <div className='admin--products--options__price'>
                    <select
                        name=''
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
                <div className='admin--products--options__add'>
                    <button
                        onClick={() => {
                            dispatch(updateIsEdit({ isEdit: false }));
                            setIsProductSidebarOpen(true);
                        }}
                    >
                        <span>+</span> Add Product
                    </button>
                </div>
            </div>

            <AdminProductSidebar
                isProductSidebarOpen={isProductSidebarOpen}
                setIsProductSidebarOpen={setIsProductSidebarOpen}
            />
            {loading ? (
                <div className='admin--products__loading'>
                    <Loader color={'#fff'} />
                </div>
            ) : products.length < 1 ? (
                <div className='admin--products__notfound'>
                    <img src={adminNotFoundImg} alt='' />
                    <p>Sorry, products not found</p>
                </div>
            ) : (
                <div className='admin__table-wrapper'>
                    <div className='admin__table'>
                        <table>
                            <thead>
                                <tr>
                                    <th>Id</th>
                                    <th>Thumbnail</th>
                                    <th>Name</th>
                                    <th>Price</th>
                                    <th>Stock</th>
                                    <th>Details</th>
                                    <th>Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                {products.map((product) => {
                                    return (
                                        <AdminProductsSingleRow
                                            key={product._id}
                                            product={product}
                                            setIsProductSidebarOpen={
                                                setIsProductSidebarOpen
                                            }
                                        />
                                    );
                                })}
                            </tbody>
                        </table>
                    </div>

                    <div className='admin__table__bottom'>
                        <div className='admin__table__bottom__results'>
                            SHOWING {limit * skip + 1} -{' '}
                            {limit * (skip + 1) <= totalProducts
                                ? limit * (skip + 1)
                                : totalProducts}{' '}
                            OF {totalProducts}
                        </div>
                        <div className='admin__table__bottom__pagination'>
                            <button
                                className='admin__table__bottom__pagination__btn'
                                onClick={() => {
                                    dispatch(updateSkip(skip - 1));
                                }}
                                disabled={skip <= 0}
                            >
                                &lt;
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
                                                ? 'admin__table__bottom__pagination__btn admin__table__bottom__pagination__btn__active'
                                                : 'admin__table__bottom__pagination__btn'
                                        }
                                    >
                                        {number}
                                    </button>
                                );
                            })}
                            <button
                                className='admin__table__bottom__pagination__btn'
                                onClick={() => {
                                    dispatch(updateSkip(skip + 1));
                                }}
                                disabled={
                                    skip + 1 >= Math.ceil(totalProducts / limit)
                                }
                            >
                                &gt;
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}

export default AdminProductsPage;
