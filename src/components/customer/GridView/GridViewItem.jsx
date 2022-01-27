import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import {
    AiOutlineShoppingCart,
    AiOutlineHeart,
    AiOutlineEye,
} from 'react-icons/ai';
// AiFillHeart
import { HiOutlineChevronDoubleRight } from 'react-icons/hi';
import { useDispatch } from 'react-redux';

import { Stars } from '..';
import axios from '../../../axios';
import { addItemToCart } from '../../../redux/slices/cartSlice';
import BtnLoading from '../BtnLoading/BtnLoading';

const GridViewItem = ({ _id, name, stars, thumbnail, price, stock }) => {
    const [addToCartLoading, setAddToCartLoading] = useState(false);
    const [imgLoaded, setImgLoaded] = useState(false);

    const dispatch = useDispatch();

    const addToCart = async (product) => {
        try {
            setAddToCartLoading(true);
            await axios.post('/cart', { productId: product._id });
            dispatch(addItemToCart(product));
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
                    <button>
                        <AiOutlineHeart />
                    </button>
                    <button
                        onClick={() => {
                            addToCart({ _id, name, thumbnail, price });
                        }}
                        disabled={addToCartLoading}
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
                <Stars stars={stars} />
            </div>
            <h3 className='gridView__item__name'>
                <Link to={`/products/${_id}`}>{name}</Link>
            </h3>
            <p className='gridView__item__price'>${price}</p>
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
