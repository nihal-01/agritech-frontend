import { useState } from 'react';
import { BsStar, BsStarFill } from 'react-icons/bs';
import { FcLock } from 'react-icons/fc';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import axios from '../../../axios';

const SingleProductReview = ({ description, reviews, id }) => {
    const [isReview, setIsReview] = useState(true);
    const [review, setReview] = useState('');
    const [starCount, setStarCount] = useState(4);
    const [loading, setLoading] = useState(false);

    const { isLoggedIn, user } = useSelector((state) => state.user);

    const handleSubmit = async (e) => {
        try {
            e.preventDefault();
            setLoading(true);

            const response = await axios.post('/reviews', {
                feedback: review,
                stars: starCount,
                productId: id,
            });
            console.log(response.data);
        } catch (err) {
            console.log(err.response.data);
        }
    };

    console.log(reviews);

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
                <div className='singleProductReview__reviews'>
                    <div className='singleProductReview__reviews__content'>
                        {/* {reviews.map((rv, index) => {
                            return {}
                        })} */}
                    </div>
                    <form
                        className='singleProductReview__reviews__form'
                        onSubmit={handleSubmit}
                    >
                        <p className='singleProductReview__reviews__form__title'>
                            Your email address will not be published. Required
                            fields are marked *
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
                                <input
                                    type='text'
                                    value={user.fname || ''}
                                    disabled
                                />
                            </div>
                            <div className='singleProductReview__reviews__form__user__email'>
                                <label htmlFor=''>
                                    Email <span>*</span>
                                </label>
                                <input
                                    type='email'
                                    value={user.email || ''}
                                    disabled
                                />
                            </div>
                        </div>
                        <button
                            type='submit'
                            className='singleProductReview__reviews__form__submit'
                        >
                            Submit
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
            )}
        </div>
    );
};

export default SingleProductReview;
