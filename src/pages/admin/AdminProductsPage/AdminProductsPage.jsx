import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';
import { FiEdit, FiEye } from 'react-icons/fi';
import { MdDeleteOutline } from 'react-icons/md';

import './AdminProductsPage.scss';
import { AdminProductSidebar } from '../../../components/admin';
import {
    deleteProduct,
    fetchProducts,
    updateCategory,
    updateSkip,
    updateSort,
} from '../../../redux/slices/productsSlice';
import axios from '../../../axios';

function AdminProductsPage() {
    const [isProductSidebarOpen, setIsProductSidebarOpen] = useState(false);
    const [pageNumbers, setPageNumbers] = useState([]);

    const dispatch = useDispatch();
    const categories = useSelector((state) => state.categories.categories);
    const { products, skip, limit, totalProducts, loading, filters, sort } =
        useSelector((state) => state.products);

    const handleDelete = async (_id) => {
        try {
            const resp = window.confirm(`are you sure ${_id}`);
            if (resp) {
                await axios.delete(`/products/${_id}`);
                dispatch(deleteProduct(_id));
            }
        } catch (err) {
            console.log(err.response);
        }
    };

    useEffect(() => {
        dispatch(fetchProducts());
    }, [dispatch, skip, filters, sort]);

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
                <div className='admin--products--options__search'>
                    <input type='text' placeholder='Search by product name' />
                </div>
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
                            const { _id, name, thumbnail, stock, price } =
                                product;
                            return (
                                <tr key={_id}>
                                    <td>#{_id.substr(_id.length - 5)}</td>
                                    <td>
                                        <div className='table--image'>
                                            <img src={thumbnail} alt='' />
                                        </div>
                                    </td>
                                    <td>{name}</td>
                                    <td>₹{price}</td>
                                    <td>{stock}</td>
                                    <td>
                                        <button className='table--viewbtn'>
                                            <FiEye />
                                        </button>
                                    </td>
                                    <td>
                                        <button className='table--editbtn'>
                                            <FiEdit />
                                        </button>
                                        <button
                                            className='table--deletebtn'
                                            onClick={() => {
                                                handleDelete(_id);
                                            }}
                                        >
                                            <MdDeleteOutline />
                                        </button>
                                    </td>
                                </tr>
                            );
                        })}
                    </tbody>
                </table>
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
        </div>
    );
}

export default AdminProductsPage;
