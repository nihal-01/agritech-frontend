import { useCallback, useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { Link, useParams } from 'react-router-dom';
import { BsStar, BsStarFill } from 'react-icons/bs';
import { FcLock } from 'react-icons/fc';

import { BtnLoading, Stars } from '../../../components/customer';
import { avatar } from '../../../assets/images';
import axios from '../../../axios';
import { monthNames } from '../../../utils/constants';

const SingleProductReview = ({ description }) => {
    const [isReview, setIsReview] = useState(false);

    return (
        <div className='singleProductReview'>
            <ul className='singleProductReview__heading'>
                <li
                    onClick={() => {
                        setIsReview(false);
                    }}
                    className={
                        !isReview
                            ? 'singleProductReview__heading__item singleProductReview__heading__item__active'
                            : 'singleProductReview__heading__item'
                    }
                >
                    Description
                </li>
                <li
                    onClick={() => {
                        setIsReview(true);
                    }}
                    className={
                        isReview
                            ? 'singleProductReview__heading__item singleProductReview__heading__item__active'
                            : 'singleProductReview__heading__item'
                    }
                >
                    Reviews
                </li>
            </ul>
            {!isReview ? (
                <div className='singleProductReview__description'>
                    <p>{description}</p>
                </div>
            ) : (
                <Review />
            )}
        </div>
    );
};

const Review = () => {
    const [review, setReview] = useState('');
    const [starCount, setStarCount] = useState(4);
    const [loadingReview, setLoadingReview] = useState(true);
    const [reviews, setReviews] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');

    const { isLoggedIn, user, token } = useSelector((state) => state.user);
    const { id } = useParams();

    const handleSubmit = async (e) => {
        try {
            e.preventDefault();
            setLoading(true);

            const response = await axios.post(
                '/reviews',
                {
                    feedback: review,
                    stars: starCount,
                    productId: id,
                },
                {
                    headers: { Authorization: `Bearer ${token}` },
                }
            );
            response.data.userId = user;
            setReviews((prev) => {
                return [...prev, response.data];
            });
            setReview('');
            setStarCount(4);
            setLoading(false);
        } catch (err) {
            console.log(err.response.data);
            setError(
                err.response?.data?.error || 'Something went wrong, Try again.'
            );
            setLoading(false);
        }
    };

    const fetchReviews = useCallback(async () => {
        try {
            setLoadingReview(true);

            const response = await axios.get(`/reviews/${id}`);
            setReviews(response.data);

            setLoadingReview(false);
        } catch (err) {
            console.log(err.response);
            setLoadingReview(false);
        }
    }, [id]);

    useEffect(() => {
        fetchReviews();
    }, [fetchReviews]);

    return (
        <div className='singleProductReview__reviews'>
            {loadingReview ? (
                <div className='singleProductReview__reviews__loading__wrapper'>
                    <div className='singleProductReview__reviews__loading'>
                        <div className='singleProductReview__reviews__loading__img'></div>
                        <div className='singleProductReview__reviews__loading__content'>
                            <div></div>
                            <div></div>
                            <div></div>
                            <div></div>
                        </div>
                    </div>
                    <div className='singleProductReview__reviews__loading'>
                        <div className='singleProductReview__reviews__loading__img'></div>
                        <div className='singleProductReview__reviews__loading__content'>
                            <div></div>
                            <div></div>
                            <div></div>
                            <div></div>
                        </div>
                    </div>
                    <div className='singleProductReview__reviews__loading'>
                        <div className='singleProductReview__reviews__loading__img'></div>
                        <div className='singleProductReview__reviews__loading__content'>
                            <div></div>
                            <div></div>
                            <div></div>
                            <div></div>
                        </div>
                    </div>
                </div>
            ) : reviews.length <= 0 ? (
                <div className='singleProductReview__reviews__notFound'>
                    <h3>&#128533;</h3>
                    <p>No reviews yet</p>
                </div>
            ) : (
                <div className='singleProductReview__reviews__content'>
                    {reviews.map((review, index) => {
                        const reviewDate = new Date(review.createdAt);
                        return (
                            <div
                                className='singleProductReview__reviewList'
                                key={index}
                            >
                                <div className='singleProductReview__reviewList__img'>
                                    <img
                                        src={
                                            review.userId?.avatar
                                                ? review.userId?.avatar
                                                : avatar
                                        }
                                        alt=''
                                    />
                                </div>
                                <div className='singleProductReview__reviewList__content'>
                                    <Stars stars={review.stars} />
                                    <h5>{review.userId.fname}</h5>
                                    <p className='singleProductReview__reviewList__content__date'>
                                        {monthNames[reviewDate.getMonth()] +
                                            ' ' +
                                            reviewDate.getDate() +
                                            ', ' +
                                            reviewDate.getFullYear()}
                                    </p>
                                    <p className='singleProductReview__reviewList__content__feedback'>
                                        {review.feedback}
                                    </p>
                                </div>
                            </div>
                        );
                    })}
                </div>
            )}
            <form
                className='singleProductReview__reviews__form'
                onSubmit={handleSubmit}
            >
                <p className='singleProductReview__reviews__form__title'>
                    Your email address will not be published. Required fields
                    are marked *
                </p>
                <label htmlFor=''>
                    Your Rating <span>*</span>
                </label>
                <div className='singleProductReview__reviews__form__stars'>
                    {Array.from({ length: 5 }).map((_, index) => {
                        return (
                            <button type='button' key={index}>
                                {index < starCount ? (
                                    <BsStarFill
                                        onClick={() => {
                                            setStarCount(index + 1);
                                        }}
                                    />
                                ) : (
                                    <BsStar
                                        onClick={() => {
                                            setStarCount(index + 1);
                                        }}
                                    />
                                )}
                            </button>
                        );
                    })}
                </div>
                <label htmlFor=''>
                    Your review <span>*</span>
                </label>
                <textarea
                    name=''
                    id=''
                    cols='30'
                    rows='10'
                    onChange={(e) => {
                        setReview(e.target.value);
                    }}
                    required
                ></textarea>
                <div className='singleProductReview__reviews__form__user'>
                    <div className='singleProductReview__reviews__form__user__name'>
                        <label htmlFor=''>
                            Name <span>*</span>
                        </label>
                        <input type='text' value={user.fname || ''} disabled />
                    </div>
                    <div className='singleProductReview__reviews__form__user__email'>
                        <label htmlFor=''>
                            Email <span>*</span>
                        </label>
                        <input type='email' value={user.email || ''} disabled />
                    </div>
                </div>
                {error && (
                    <p className='singleProductReview__reviews__form__error'>
                        {error}
                    </p>
                )}
                <button
                    type='submit'
                    className='singleProductReview__reviews__form__submit'
                    disabled={loading}
                >
                    {loading ? <BtnLoading /> : 'Submit'}
                </button>
                {!isLoggedIn && (
                    <div className='singleProductReview__reviews__form__overlay'></div>
                )}
                {!isLoggedIn && (
                    <div className='singleProductReview__reviews__form__login'>
                        <FcLock />
                        <h3>You should login first</h3>
                        <Link to='/login'>Login</Link>
                    </div>
                )}
            </form>
        </div>
    );
};

export default SingleProductReview;
