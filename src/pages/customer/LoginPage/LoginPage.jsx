import React, { useEffect, useRef, useState } from 'react';
import { AiFillEye, AiFillEyeInvisible } from 'react-icons/ai';
import { Link } from 'react-router-dom';

import './LoginPage.scss';
import { BlankSpace, BtnLoading, PageHero } from '../../../components/customer';
import { useForm } from '../../../hooks';
import axios from '../../../axios';
import { useDispatch } from 'react-redux';
import { saveUser } from '../../../redux/slices/userSlice';

function LoginPage() {
    const [isShowPassword, setIsShowPassword] = useState(false);
    const [user, handleChange] = useForm({ email: '', password: '' });
    const [isLoading, setIsLoading] = useState(false);
    const [formError, setFormError] = useState({ error: false, msg: '' });

    const passRef = useRef(null);
    const dispacth = useDispatch();

    const handleSubmit = async (e) => {
        try {
            e.preventDefault();

            setIsLoading(true);
            setFormError({ error: false, msg: '' });

            const response = await axios.post('/users/login', user);
            dispacth(saveUser(response.data));
        } catch (err) {
            console.log(err.response);
            setFormError({
                error: true,
                msg:
                    err.response.data.error ||
                    'Something went wrong, Try again',
            });
            setIsLoading(false);
        }
    };

    useEffect(() => {
        if (isShowPassword) {
            passRef.current.type = 'text';
        } else {
            passRef.current.type = 'password';
        }
    }, [isShowPassword]);

    return (
        <>
            <PageHero title='Sign In' />
            <BlankSpace />
            <div className='loginPage__wrapper'>
                <div className='loginPage'>
                    {/* <h3 className="loginPage__title">Sign In</h3> */}
                    <form className='loginPage__form' onSubmit={handleSubmit}>
                        <label htmlFor='email'>Email Address</label>
                        <input
                            type='email'
                            name='email'
                            id='email'
                            placeholder='E-mail'
                            required
                            onChange={handleChange}
                            disabled={isLoading}
                        />
                        <label htmlFor='password'>Password</label>
                        <div className='loginPage__form__password'>
                            <input
                                type='password'
                                name='password'
                                id='password'
                                placeholder='Password'
                                ref={passRef}
                                required
                                onChange={handleChange}
                                disabled={isLoading}
                            />
                            <button
                                type='button'
                                onClick={() =>
                                    setIsShowPassword(!isShowPassword)
                                }
                            >
                                {isShowPassword ? (
                                    <AiFillEyeInvisible />
                                ) : (
                                    <AiFillEye />
                                )}
                            </button>
                        </div>
                        <div className='loginPage__form__saveBox__wrapper'>
                            <div className='loginPage__form__saveBox'>
                                <input
                                    type='checkbox'
                                    name=''
                                    id='checkbox'
                                    defaultChecked
                                />
                                <label htmlFor='checkbox'>Remember me</label>
                            </div>
                            <Link to='/my-account/lost-password'>
                                Lost your password?
                            </Link>
                        </div>
                        <button
                            type='submit'
                            className='loginPage__form__btn'
                            disabled={isLoading}
                        >
                            {isLoading ? <BtnLoading /> : 'LOGIN'}
                        </button>
                    </form>
                    {formError.error && (
                        <p className='loginPage__error'>{formError.msg}</p>
                    )}
                    <Link to='/signup' className='loginPage__signup__btn'>
                        Create an Account
                    </Link>
                </div>
            </div>
        </>
    );
}

export default LoginPage;
