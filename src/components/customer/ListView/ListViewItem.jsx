import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import axios from '../../../axios';
import { addItemToCart } from '../../../redux/slices/cartSlice';
import BtnLoading from '../BtnLoading/BtnLoading';
import Stars from '../Stars/Stars';
import {
    AiOutlineShoppingCart,
    AiOutlineHeart,
    AiOutlineEye,
    AiFillHeart,
} from 'react-icons/ai';
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

function ListViewItem({ _id, name, avgStars, thumbnail, price, stock }) {
    const [addToCartLoading, setAddToCartLoading] = useState(false);
    const [imgLoaded, setImgLoaded] = useState(false);
    const [loved, setLoved] = useState(isLoved(_id));

    const { isLoggedIn, token } = useSelector((state) => state.user);
    const navigate = useNavigate();
    const dispatch = useDispatch();

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
        <div className='listView__item'>
            <div className='listView__item__imgWrapper'>
                {!imgLoaded && (
                    <div className='listView__item__imgWrapper__loading'></div>
                )}
                <Link to={`/products/${_id}`}>
                    <img
                        src={thumbnail}
                        alt=''
                        onLoad={() => {
                            setImgLoaded(true);
                        }}
                        className={
                            !imgLoaded
                                ? 'listView__item__imgWrapper__img listView__item__imgWrapper__img__hidden'
                                : 'listView__item__imgWrapper__img'
                        }
                    />
                </Link>

                <div className='listView__item__imgWrapper__buttons'>
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
                            <BtnLoading height='20px' width='20px' />
                        ) : (
                            <AiOutlineShoppingCart />
                        )}
                    </button>
                    <button>
                        <AiOutlineEye />
                    </button>
                </div>
            </div>
            <div className='listView__item__content'>
                <h3 className='listView__item__content__name'>
                    <Link to={`/products/${_id}`}>{name}</Link>
                </h3>
                <div className='listView__item__content__stars'>
                    <Stars stars={avgStars} />
                </div>
                <p className='listView__item__content__price'>
                    &#8377; {price}
                </p>
                <p className='listView__item__content__desc'>
                    Lorem ipsum dolor sit amet consectetur adipisicing elit.
                    Harum modi natus doloribus molestias quaerat, expedita eum
                    beatae voluptates commodi aliquam qui, tempore quia pariatur
                    repellendus quasi, nam fugit a inventore?
                    {/* slice(0, 210) */}
                </p>
                <hr className='listView__item__content__hr' />
                {stock > 0 ? (
                    <button
                        className='listView__item__content__cartBtn'
                        onClick={() => {
                            addToCart({ _id, name, thumbnail, price });
                        }}
                        disabled={addToCartLoading}
                    >
                        {addToCartLoading ? (
                            <BtnLoading height='20px' width='20px' />
                        ) : (
                            'ADD TO CART'
                        )}
                    </button>
                ) : (
                    <Link to={`/products/${_id}`}>
                        <button className='listView__item__content__cartBtn'>
                            View product
                        </button>
                    </Link>
                )}
            </div>
        </div>
    );
}

export default ListViewItem;
