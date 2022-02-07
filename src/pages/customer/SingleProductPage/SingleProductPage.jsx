import React, { useCallback, useEffect, useRef, useState } from 'react';
import { HiOutlineShoppingBag } from 'react-icons/hi';
import { Link, useParams } from 'react-router-dom';

import './SingleProductPage.scss';
import {
    BlankSpace,
    BtnLoading,
    GridView,
    PageHero,
    Stars,
} from '../../../components/customer';
import { products } from '../../../utils/constants';
import axios from '../../../axios';
import {
    SingleProductLoading,
    SingleProductReview,
    SingleProductThumbnail,
} from '.';
import { NotFoundPage } from '..';
import { useDispatch } from 'react-redux';
import { addItemToCart } from '../../../redux/slices/cartSlice';

const items = products.slice(0, 5);

function SingleProductPage() {
    const [productLoading, setProductLoading] = useState(true);
    const [product, setProduct] = useState({});
    const [images, setImages] = useState([]);
    const [itemCount, setItemCount] = useState(1);
    const [error, setError] = useState(false);
    const [cartBtnLoading, setCartBtnLoading] = useState(false);

    const imgs = useRef(null);
    const { id } = useParams();
    const dispatch = useDispatch();

    const handleClick = (index) => {
        imgs.current.style.transform = `translateX(-${index * 100}%)`;
    };

    const increment = () => {
        setItemCount((prev) => prev + 1);
    };

    const decrement = () => {
        if (itemCount > 1) {
            setItemCount((prev) => prev - 1);
        }
    };

    const fetchSingleProduct = useCallback(async () => {
        try {
            setError(false);
            setProductLoading(true);
            console.log('single product request');

            const response = await axios.get(`/products/${id}`);
            setProduct(response.data);
            setImages([
                response.data.thumbnail,
                ...response.data.imagesPath,
                'https://previews.123rf.com/images/f8studio/f8studio1611/f8studio161100357/73163174-girl-full-height-on-white.jpg',
            ]);

            setProductLoading(false);
        } catch (err) {
            setError(true);
            setProductLoading(false);
        }
    }, [id]);

    const addToCart = async () => {
        try {
            setCartBtnLoading(true);

            await axios.post('/cart', {
                productId: product._id,
                quantity: itemCount,
            });

            dispatch(addItemToCart({ product, quantity: itemCount }));
            setCartBtnLoading(false);
        } catch (err) {
            console.log(err.response.data);
        }
    };

    useEffect(() => {
        fetchSingleProduct();
    }, [fetchSingleProduct]);

    return (
        <>
            {error ? (
                <>
                    <NotFoundPage />
                </>
            ) : (
                <>
                    <PageHero title={product.name} product={true} />
                    <BlankSpace />
                    <div className='singleProductPage__wrapper'>
                        {productLoading ? (
                            <SingleProductLoading />
                        ) : (
                            <div className='singleProductPage'>
                                <div className='singleProductPage__images'>
                                    <div className='singleProductPage__images__thumbnail'>
                                        <div
                                            className='singleProductPage__thumbnail__wrapper'
                                            ref={imgs}
                                        >
                                            {images.map((img, index) => {
                                                return (
                                                    <SingleProductThumbnail
                                                        key={index}
                                                        img={img}
                                                    />
                                                );
                                            })}
                                        </div>
                                    </div>
                                    <div className='singleProductPage__images__lists'>
                                        {images.map((img, index) => {
                                            return (
                                                <div
                                                    key={index}
                                                    className='singleProductPage__images__lists__item'
                                                    onClick={() =>
                                                        handleClick(index)
                                                    }
                                                >
                                                    <img src={img} alt='' />
                                                </div>
                                            );
                                        })}
                                    </div>
                                </div>
                                <div className='singleProductPage__content'>
                                    <span
                                        className='singleProductPage__content__stock'
                                        style={{
                                            backgroundColor:
                                                product.stock > 0
                                                    ? '#4bb543'
                                                    : '#b64343',
                                        }}
                                    >
                                        {product.stock > 0
                                            ? 'In Stock'
                                            : 'Out of Stock'}
                                    </span>
                                    <h1 className='singleProductPage__content__name'>
                                        {product.name}
                                    </h1>
                                    <div className='singleProductPage__content__stars'>
                                        <Stars stars={product.avgStars} />
                                        <p>
                                            ({product.totalReviews} Customer
                                            Reviews)
                                        </p>
                                    </div>
                                    <h3 className='singleProductPage__content__price'>
                                        ${product.price}
                                    </h3>
                                    <p className='singleProductPage__content__desc'>
                                        {product.shortDescription}
                                    </p>
                                    <p className='singleProductPage__content__unit'>
                                        <span>Unit:</span> {product.unit}
                                    </p>
                                    <hr />
                                    <div className='singleProductPage__content__addToCart'>
                                        {product.stock > 0 ? (
                                            <>
                                                <div className='addToCart__unit__wrapper'>
                                                    <button
                                                        className='addToCart__unit__incdec__btn'
                                                        onClick={decrement}
                                                    >
                                                        -
                                                    </button>
                                                    <input
                                                        type='number'
                                                        value={itemCount}
                                                        className='addToCart__unit__input'
                                                        onChange={(e) => {
                                                            if (
                                                                Number(
                                                                    e.target
                                                                        .value
                                                                ) < 1
                                                            ) {
                                                                setItemCount(
                                                                    Number(1)
                                                                );
                                                            } else {
                                                                setItemCount(
                                                                    Number(
                                                                        e.target
                                                                            .value
                                                                    )
                                                                );
                                                            }
                                                        }}
                                                    />
                                                    <button
                                                        className='addToCart__unit__incdec__btn'
                                                        onClick={increment}
                                                    >
                                                        +
                                                    </button>
                                                </div>

                                                <button
                                                    className='addToCart__btn'
                                                    onClick={() => {
                                                        addToCart();
                                                    }}
                                                    disabled={cartBtnLoading}
                                                >
                                                    <HiOutlineShoppingBag />
                                                    {cartBtnLoading ? (
                                                        <BtnLoading />
                                                    ) : (
                                                        'Add to cart'
                                                    )}
                                                </button>
                                            </>
                                        ) : (
                                            <button className='addToCart__outOfStockBtn'>
                                                &#128532; Out Of Stock
                                            </button>
                                        )}
                                    </div>
                                    <hr />
                                    <p className='singleProductPage__content__category'>
                                        Category:{' '}
                                        <Link to={`/`}>
                                            {product.category?.name ||
                                                'uncategorized'}
                                        </Link>
                                    </p>
                                </div>
                            </div>
                        )}
                        <BlankSpace />
                        <SingleProductReview
                            description={product.description}
                        />
                        <BlankSpace />
                        <GridView products={items} count={5} />
                        <BlankSpace />
                    </div>
                </>
            )}
        </>
    );
}

export default SingleProductPage;
