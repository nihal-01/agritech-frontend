import React, { useCallback, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { HiOutlineShoppingBag } from 'react-icons/hi';

import './ProductCard.scss';
import { updateProductCard } from '../../../redux/slices/layoutSlice';
import axios from '../../../axios';
import Stars from '../Stars/Stars';
import { useNavigate } from 'react-router-dom';
import { addItemToCart } from '../../../redux/slices/cartSlice';
import BtnLoading from '../BtnLoading/BtnLoading';
import { noProductImg } from '../../../assets/images';

function ProductCard() {
    const [product, setProduct] = useState({});
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(false);
    const [cartBtnLoading, setCartBtnLoading] = useState(false);
    const [itemCount, setItemCount] = useState(1);

    const { isLoggedIn, token } = useSelector((state) => state.user);
    const { productCardId } = useSelector((state) => state.layout);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const addToCart = async () => {
        try {
            if (!isLoggedIn) {
                navigate('/login');
            }
            setCartBtnLoading(true);

            await axios.post(
                '/cart',
                {
                    productId: product._id,
                    quantity: itemCount,
                },
                {
                    headers: { Authorization: `Bearer ${token}` },
                }
            );

            dispatch(addItemToCart({ product, quantity: itemCount }));
            setCartBtnLoading(false);
        } catch (err) {
            console.log(err.response.data);
        }
    };

    const handleChange = (e) => {
        if (e.target.value < 1) {
            setItemCount(1);
        } else {
            setItemCount(e.target.value);
        }
    };

    console.log(productCardId);

    const fetchProducts = useCallback(async () => {
        try {
            console.log('product fetching...');
            const response = await axios.get(`/products/${productCardId}`);
            setProduct(response.data);
            setLoading(false);
        } catch (err) {
            setError(true);
            setLoading(false);
        }
    }, [productCardId]);

    useEffect(() => {
        fetchProducts();
    }, [fetchProducts]);

    return (
        <div
            className='productCard'
            id='myModel'
            onClick={(e) => {
                if (e.target === document.getElementById('myModel')) {
                    dispatch(
                        updateProductCard({
                            productCard: false,
                            productCardId: '',
                        })
                    );
                }
            }}
        >
            {loading ? (
                <div className='productCard__loading'>
                    <div className='productCard__loading__img'></div>
                    <div className='productCard__loading__content'>
                        <div className='productCard__loading__content__name'></div>
                        <div className='productCard__loading__content__stars'></div>
                        <div className='productCard__loading__content__price'></div>
                        <div className='productCard__loading__content__desc1'></div>
                        <div className='productCard__loading__content__desc2'></div>
                    </div>
                </div>
            ) : error ? (
                <div className='productCard__notFound'>
                    <img src={noProductImg} alt='' />
                    <h3>No Products Found!</h3>
                </div>
            ) : (
                <div className='productCard__main'>
                    <span
                        className='productCard__main__close'
                        onClick={() => {
                            dispatch(
                                updateProductCard({
                                    productCard: false,
                                    productCardId: '',
                                })
                            );
                        }}
                    >
                        x
                    </span>
                    <img
                        src={product.thumbnail}
                        alt=''
                        className='productCard__main__img'
                    />
                    <div className='productCard__main__content'>
                        <h1 className='productCard__main__content__name'>
                            {product.name}
                        </h1>
                        <div className='productCard__main__content__stars'>
                            <Stars stars={product.avgStars} />
                            <p>({product.totalReviews} Customer Reviews)</p>
                        </div>
                        <h3 className='productCard__main__content__price'>
                            &#8377; {product.price}
                        </h3>
                        <p className='productCard__main__content__desc'>
                            {product.shortDescription}
                        </p>
                        <div className='productCard__main__content__cart'>
                            <input
                                type='number'
                                value={itemCount}
                                onChange={handleChange}
                            />
                            <button
                                onClick={addToCart}
                                disabled={cartBtnLoading}
                            >
                                {cartBtnLoading ? (
                                    <BtnLoading />
                                ) : (
                                    <>
                                        <HiOutlineShoppingBag />
                                        Add to cart
                                    </>
                                )}
                            </button>
                        </div>
                        <p className='productCard__main__content__category'>
                            CATEGORY:{' '}
                            <span>{product.category?.name || 'Undefined'}</span>
                        </p>
                        <p className='productCard__main__content__seller'>
                            SELLER:{' '}
                            <span>{product?.user?.fname || 'Admin'}</span>
                        </p>
                    </div>
                </div>
            )}
        </div>
    );
}

export default ProductCard;
