import React, { useCallback, useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

import './AdminSingleProductPage.scss';
import axios from '../../../axios';
import { Loader, Stars } from '../../../components/customer';
import { adminNotFoundImg } from '../../../assets/images';

function AdminSingleProductPage() {
    const [loading, setLoading] = useState(true);
    const [product, setProduct] = useState([]);
    const [error, setError] = useState(false);

    const { id } = useParams();
    const navigate = useNavigate();

    const fetchSingleProduct = useCallback(async () => {
        try {
            const response = await axios.get(`/products/${id}`);
            setProduct(response.data);
            setLoading(false);
        } catch (err) {
            setError(true);
            setLoading(false);
        }
    }, [id]);

    useEffect(() => {
        fetchSingleProduct();
    }, [fetchSingleProduct]);

    return (
        <div className='adminSingleProduct'>
            <h1 className='adminSingleProduct__title'>Product Details</h1>
            {loading ? (
                <div className='adminSingleProduct__loading'>
                    <Loader color={'#fff'} />
                </div>
            ) : error ? (
                <div className='adminSingleProduct__error'>
                    <img src={adminNotFoundImg} alt='' />
                    <p>Sorry, product not found</p>
                </div>
            ) : (
                <div className='adminSingleProduct__main'>
                    <div className='adminSingleProduct__main__left'>
                        <img src={product.thumbnail} alt='' />
                    </div>
                    <div className='adminSingleProduct__main__right'>
                        <h2 className='adminSingleProduct__main__right__title'>
                            {product.name}
                        </h2>
                        <div className='adminSingleProduct__main__right__stars'>
                            <Stars stars={product.avgStars} />
                            <p>({product.totalReviews} Customer Reviews)</p>
                        </div>
                        <h3 className='adminSingleProduct__main__right__price'>
                            &#8377; {product.price}
                        </h3>
                        <div className='adminSingleProduct__main__right__stock'>
                            {product.stock > 0 ? (
                                <span style={{ backgroundColor: '#03543f' }}>
                                    In Stock
                                </span>
                            ) : (
                                <span style={{ backgroundColor: '#f05252' }}>
                                    Out of stock
                                </span>
                            )}
                            <p>Quantity: {product.stock}</p>
                        </div>
                        <p className='adminSingleProduct__main__right__desc'>
                            {product.shortDescription}
                        </p>
                        <p className='adminSingleProduct__main__right__category'>
                            Category: <span>{product.category.name}</span>
                        </p>
                        <button
                            className='adminSingleProduct__main__right__btn'
                            onClick={() => {
                                navigate('../products')
                            }}
                        >
                            Go Back
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
}

export default AdminSingleProductPage;
