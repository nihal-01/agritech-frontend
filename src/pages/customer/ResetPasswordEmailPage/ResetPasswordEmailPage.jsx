import React, { useState } from 'react';

import './ResetPasswordEmailPage.scss';
import { BlankSpace, BtnLoading, PageHero } from '../../../components/customer';
import axios from '../../../axios';

function ResetPasswordEmailPage() {
    const [email, setEmail] = useState('');
    const [error, setError] = useState('');
    const [isSendMail, setIsSendMail] = useState(false);
    const [laoding, setLoading] = useState(false);

    const handleSubmit = async (e) => {
        try {
            e.preventDefault();
            setLoading(true);
            setError('');

            await axios.post('/users/send-email', { email });
            setLoading(false);
            setIsSendMail(true);
        } catch (err) {
            setError(
                err.response.data?.error || 'Something went wrong, Try again'
            );
            setLoading(false);
        }
    };

    return (
        <div>
            <PageHero title='Reset password' myAccount={true} />
            <BlankSpace />
            <div className='resetPasswordEmail'>
                {!isSendMail ? (
                    <>
                        <p className='resetPasswordEmail__info'>
                            Lost your password? Please enter your email address.
                            You will receive a link to create a new password via
                            email.
                        </p>
                        <form
                            className='resetPasswordEmail__form'
                            onSubmit={handleSubmit}
                        >
                            <label htmlFor='email'>Email Address</label>
                            <br />
                            <input
                                type='email'
                                id='email'
                                value={email}
                                onChange={(e) => {
                                    setEmail(e.target.value);
                                }}
                                required
                            />
                            <br />
                            {error && (
                                <p className='resetPasswordEmail__form__error'>
                                    {error}
                                </p>
                            )}
                            <button type='submit'>
                                {laoding ? <BtnLoading /> : 'Get E-mail'}
                            </button>
                        </form>
                    </>
                ) : (
                    <div className='resetPasswordEmail__sendMail'>
                        <p>
                            <span>
                                A password reset email has been sent to your
                                email address
                            </span>
                            , but may take several minutes to show up in your
                            inbox. Please wait at least 10 minutes before
                            attempting another reset.
                        </p>
                    </div>
                )}
            </div>
        </div>
    );
}

export default ResetPasswordEmailPage;
