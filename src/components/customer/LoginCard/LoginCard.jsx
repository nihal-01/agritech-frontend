import React, { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { AiFillEye, AiFillEyeInvisible } from 'react-icons/ai';
import { useDispatch } from 'react-redux';

import './LoginCard.scss';
import { useForm } from '../../../hooks';
import axios from '../../../axios';
import { saveUser } from '../../../redux/slices/userSlice';
import { BtnLoading } from '..';

function LoginCard({ setIsLoginOpen }) {
    const [isShowPassword, setIsShowPassword] = useState(false);
    const [user, handleChange] = useForm({ email: '', password: '' });
    const [isLoading, setIsLoading] = useState(false);
    const [formError, setFormError] = useState({ error: false, msg: '' });

    const passRef = useRef(null);
    const dispatch = useDispatch();

    const handleSubmit = async (e) => {
        try {
            e.preventDefault();

            setIsLoading(true);
            setFormError({ error: false, msg: '' });

            const response = await axios.post('/users/login', user);
            dispatch(saveUser(response.data));

            setIsLoginOpen(false);
        } catch (err) {
            setFormError({
                error: true,
                msg:
                    err.response?.data?.error ||
                    'something went wrong, Try again',
            });
            setIsLoading(false);
        }
    };

    // password show hide functionality
    useEffect(() => {
        if (isShowPassword) {
            passRef.current.type = 'text';
        } else {
            passRef.current.type = 'password';
        }
    }, [isShowPassword]);

    return (
        <div className='loginCard'>
            <div className='loginCard__header'>
                <span>Sign in</span>
                <Link to='/signup' onClick={() => setIsLoginOpen(false)}>
                    Create an Account
                </Link>
            </div>
            <form className='loginCard__form' onSubmit={handleSubmit}>
                <label htmlFor='email'>
                    Email Address <span>*</span>
                </label>
                <input
                    type='email'
                    id='email'
                    name='email'
                    placeholder='E-mail'
                    onChange={handleChange}
                    required
                    disabled={isLoading}
                />
                <label htmlFor='password'>
                    Password <span>*</span>
                </label>
                <div className='loginCard__form__password'>
                    <input
                        type='password'
                        id='password'
                        name='password'
                        placeholder='Password'
                        ref={passRef}
                        onChange={handleChange}
                        required
                        disabled={isLoading}
                    />
                    <button
                        type='button'
                        onClick={() => setIsShowPassword(!isShowPassword)}
                    >
                        {isShowPassword ? (
                            <AiFillEyeInvisible />
                        ) : (
                            <AiFillEye />
                        )}
                    </button>
                </div>
                {formError.error && (
                    <p className='loginCard__form__error'>{formError.msg}</p>
                )}
                <button
                    type='submit'
                    className='loginCard__form__btn'
                    disabled={isLoading}
                >
                    {isLoading ? <BtnLoading /> : 'LOGIN'}
                </button>
            </form>
            <Link
                to='/my-account/lost-password'
                className='loginCard__lostpassword'
                onClick={() => setIsLoginOpen(false)}
            >
                Lost your password?
            </Link>
        </div>
    );
}

export default React.memo(LoginCard);
