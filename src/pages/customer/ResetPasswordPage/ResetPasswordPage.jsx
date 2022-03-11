import React, { useEffect, useRef, useState } from 'react';

import './ResetPasswordPage.scss';
import { PageHero, BlankSpace, BtnLoading } from '../../../components/customer';
import { AiFillEye, AiFillEyeInvisible } from 'react-icons/ai';
import axios from '../../../axios';
import { useNavigate, useParams } from 'react-router-dom';

function ResetPasswordPage() {
    const [isShowPassword, setIsShowPassword] = useState(false);
    const [isShowCPassword, setIsShowCPassword] = useState(false);
    const [password, setPassword] = useState('');
    const [cPassword, setCPassword] = useState('');
    const [passError, setPassError] = useState('');
    const [cPassError, setCPassError] = useState('');
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);

    console.log('reset pass');

    const passRef = useRef(null);
    const cPassRef = useRef(null);

    const { userId, token } = useParams();
    const navigate = useNavigate();
    console.log(userId, token);

    const handleSubmit = async (e) => {
        try {
            e.preventDefault();

            if (passError || cPassError) return;

            if (!password) {
                setPassError('Password must be required *');
            }
            if (!cPassword) {
                setCPassError('Confirm password must be required *');
            }
            if (!password || !cPassword) return;

            setLoading(true);
            setError('');

            await axios.post('/users/change-password', {
                userId,
                token,
                password,
            });
            navigate('/login');
        } catch (err) {
            setError(
                err.response.data?.error || 'Something went wrong, Try again'
            );
            setLoading(false);
        }
    };

    // password validation
    useEffect(() => {
        const passwordRegx = /(?=.*\d)(?=.*[a-z]).{5,}/;
        if (!passwordRegx.test(password) && password) {
            setPassError(
                'Must contain at least one number and one lowercase letter, and at least 5 or more characters'
            );
        } else {
            setPassError('');
        }
    }, [password]);

    // confirm password validation
    useEffect(() => {
        if (password !== cPassword && cPassword) {
            setCPassError('Password is not same.');
        } else {
            setCPassError('');
        }
    }, [cPassword, password]);

    // password show hide functionality
    useEffect(() => {
        if (isShowPassword) {
            passRef.current.type = 'text';
        } else {
            passRef.current.type = 'password';
        }
    }, [isShowPassword]);

    // confirm password show hide functionality
    useEffect(() => {
        if (isShowCPassword) {
            cPassRef.current.type = 'text';
        } else {
            cPassRef.current.type = 'password';
        }
    }, [isShowCPassword]);

    return (
        <div>
            <PageHero title='Reset password' myAccount={true} />
            <BlankSpace />
            <div className='resetPassword'>
                <form
                    action=''
                    className='resetPassword__form'
                    onSubmit={handleSubmit}
                >
                    <label htmlFor='password'>New Password</label>
                    <div className='resetPassword__form__password'>
                        <input
                            type='password'
                            name=''
                            id='password'
                            placeholder='password'
                            ref={passRef}
                            onChange={(e) => {
                                setPassword(e.target.value);
                            }}
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
                    {passError && (
                        <p className='resetPassword__form__error'>
                            {passError}
                        </p>
                    )}
                    <label htmlFor='cpassword'>Confirm New Password</label>
                    <div className='resetPassword__form__password'>
                        <input
                            type='password'
                            name=''
                            id='cpassword'
                            placeholder='confirm password'
                            ref={cPassRef}
                            onChange={(e) => {
                                setCPassword(e.target.value);
                            }}
                        />
                        <button
                            type='button'
                            onClick={() => setIsShowCPassword(!isShowCPassword)}
                        >
                            {isShowCPassword ? (
                                <AiFillEyeInvisible />
                            ) : (
                                <AiFillEye />
                            )}
                        </button>
                    </div>
                    {cPassError && (
                        <p className='resetPassword__form__error'>
                            {cPassError}
                        </p>
                    )}
                    {error && (
                        <p className='resetPassword__form__error'>{error}</p>
                    )}
                    <button
                        type='submit'
                        className='resetPassword__form__submit'
                    >
                        {loading ? <BtnLoading /> : 'Reset Password'}
                    </button>
                </form>
            </div>
        </div>
    );
}

export default ResetPasswordPage;
