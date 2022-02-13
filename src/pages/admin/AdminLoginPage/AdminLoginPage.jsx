import React from 'react';

import './AdminLoginPage.scss';

function AdminLoginPage() {
    return (
        <div className='adminLoginPage-wrapper'>
            <div className='adminLoginPage'>
                <h2>Login Form</h2>
                <form action=''>
                    <input
                        type='email'
                        placeholder='Email'
                        required
                        name='email'
                    />
                    <div className='adminLoginPage__password'>
                        <input
                            type='password'
                            placeholder='Password'
                            required
                            name='password'
                        />
                    </div>
                    <div className='adminLoginPage__btn'>
                        <button type='submit'>Login</button>
                    </div>
                </form>
            </div>
        </div>
    );
}

export default AdminLoginPage;
