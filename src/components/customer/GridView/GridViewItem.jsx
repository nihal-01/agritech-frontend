import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import {
    AiOutlineShoppingCart,
    AiOutlineHeart,
    AiOutlineEye,
    AiFillHeart,
} from 'react-icons/ai';
import { HiOutlineChevronDoubleRight } from 'react-icons/hi';
import { useDispatch, useSelector } from 'react-redux';

import { Stars } from '..';
import axios from '../../../axios';
import { addItemToCart } from '../../../redux/slices/cartSlice';
import BtnLoading from '../BtnLoading/BtnLoading';
import {
    addToWishlist,
    deleteWishlist,
} from '../../../redux/slices/wishlistSlice';

const isLoved = (id) => {
    if (localStorage.getItem('wishlist')) {
        const items = JSON.parse(localStorage.getItem('wishlist'));
        for (let i = 0; i < items.length; i++) {
            if (items[i]._id === id) {
                return true;
            }
        }
    }
    return false;
};

const GridViewItem = ({ _id, name, avgStars, thumbnail, price, stock }) => {
    const [addToCartLoading, setAddToCartLoading] = useState(false);
    const [imgLoaded, setImgLoaded] = useState(false);
    const [loved, setLoved] = useState(isLoved(_id));

    const { isLoggedIn, token } = useSelector((state) => state.user);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const addToCart = async (product) => {
        try {
            if (!isLoggedIn) {
                navigate('/login');
            }
            setAddToCartLoading(true);
            await axios.post(
                '/cart',
                { productId: product._id },
                {
                    headers: { Authorization: `Bearer ${token}` },
                }
            );
            dispatch(addItemToCart({ product, quantity: 1 }));
            setAddToCartLoading(false);
        } catch (err) {
            console.log(err.response.data);
            setAddToCartLoading(false);
        }
    };

    return (
        <div className='gridView__item'>
            <div className='gridView__item__image__wrapper'>
                <Link to={`/products/${_id}`}>
                    {!imgLoaded && (
                        <div className='gridView__item__image__wrapper__loading'></div>
                    )}
                    <img
                        src={thumbnail}
                        alt=''
                        onLoad={() => {
                            setImgLoaded(true);
                        }}
                        className={
                            !imgLoaded
                                ? 'gridView__item__image__wrapper__img gridView__item__image__wrapper__img__hidden'
                                : 'gridView__item__image__wrapper__img'
                        }
                    />
                </Link>
                <div className='gridView__item__buttons'>
                    <button
                        onClick={() => {
                            if (loved) {
                                dispatch(deleteWishlist(_id));
                                setLoved(false);
                            } else {
                                dispatch(
                                    addToWishlist({
                                        _id,
                                        thumbnail,
                                        name,
                                        price,
                                        stock,
                                        createdAt: new Date().toISOString(),
                                    })
                                );
                                setLoved(true);
                            }
                        }}
                    >
                        {loved ? <AiFillHeart /> : <AiOutlineHeart />}
                    </button>
                    <button
                        onClick={() => {
                            addToCart({ _id, name, thumbnail, price });
                        }}
                        disabled={addToCartLoading || stock < 1}
                    >
                        {addToCartLoading ? (
                            <BtnLoading />
                        ) : (
                            <AiOutlineShoppingCart />
                        )}
                    </button>
                    <button>
                        <AiOutlineEye />
                    </button>
                </div>
                {stock < 1 && (
                    <div className='gridView__item__outOfStock'>
                        Out of stock
                    </div>
                )}
            </div>
            <div className='gridView__item__stars'>
                <Stars stars={avgStars} />
            </div>
            <h3 className='gridView__item__name'>
                <Link to={`/products/${_id}`}>{name}</Link>
            </h3>
            <p className='gridView__item__price'>&#8377;{price}</p>
            <hr className='gridView__item__line' />
            {stock > 0 ? (
                <button
                    className='gridView__item__addToCart'
                    onClick={() => {
                        addToCart({ _id, name, thumbnail, price });
                    }}
                    disabled={addToCartLoading}
                >
                    {addToCartLoading ? <BtnLoading /> : 'ADD TO CART'}
                    {!addToCartLoading && (
                        <span>
                            <HiOutlineChevronDoubleRight />
                        </span>
                    )}
                </button>
            ) : (
                <Link
                    to={`/products/${_id}`}
                    className='gridView__item__viewCart'
                >
                    View Product
                </Link>
            )}
        </div>
    );
};

export default GridViewItem;
