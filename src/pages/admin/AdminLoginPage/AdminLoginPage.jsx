import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import axios from '../../../axios';
import { BtnLoading } from '../../../components/customer';
import { saveUser } from '../../../redux/slices/userSlice';

import './AdminLoginPage.scss';

function AdminLoginPage() {
    const [user, setUser] = useState({
        email: '',
        password: '',
    });
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState('');

    const dispacth = useDispatch();
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        try {
            e.preventDefault();

            setIsLoading(true);
            setError('');

            const response = await axios.post('/users/login', { ...user });
            if (response.data?.user?.role !== 'admin') {
                setError('Admin access denied!');
                setIsLoading(false);
            } else {
                setIsLoading(false);
                dispacth(saveUser(response.data));
                navigate('/admin');
            }
        } catch (err) {
            console.log(err.response);
            setError(
                err.response.data.error || 'Something went wrong, Try again'
            );
            setIsLoading(false);
        }
    };

    const handleChange = (e) => {
        setUser({ ...user, [e.target.name]: e.target.value });
    };

    return (
        <div className='adminLoginPage-wrapper'>
            <div className='adminLoginPage'>
                <h2>Login Form</h2>
                <form action='' onSubmit={handleSubmit}>
                    <input
                        type='email'
                        placeholder='Email'
                        required
                        name='email'
                        onChange={handleChange}
                    />
                    <div className='adminLoginPage__password'>
                        <input
                            type='password'
                            placeholder='Password'
                            required
                            name='password'
                            onChange={handleChange}
                        />
                    </div>
                    {error && <p className='adminLoginPage__error'>{error}</p>}
                    <div className='adminLoginPage__btn'>
                        <button type='submit'>
                            {isLoading ? <BtnLoading /> : 'Login'}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}

export default AdminLoginPage;
