import React, { useCallback, useEffect, useState } from 'react';

import './MyAccountAddressPage.scss';
import { AddressForm, BtnLoading, Loader } from '../../../components/customer';
import axios from '../../../axios';
import { useSelector } from 'react-redux';

function MyAccountAddressPage() {
    const [addressLoading, setAddressLoading] = useState(true);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const [address, setAddress] = useState({
        fname: '',
        lname: '',
        country: '',
        streetAddress: '',
        city: '',
        state: '',
        pincode: '',
        phone: '',
        email: '',
    });

    const { token } = useSelector((state) => state.user);

    const handleSubmit = async (e) => {
        try {
            e.preventDefault();
            setLoading(true);
            setError('');

            await axios.post(
                '/address',
                { ...address },
                {
                    headers: { Authorization: `Bearer ${token}` },
                }
            );
            setLoading(false);
        } catch (err) {
            setError(
                err.response.data?.error || 'Something went wrong, Try again'
            );
            setLoading(false);
        }
    };

    const fetchAddress = useCallback(async () => {
        try {
            console.log('fetch adddress request');
            const response = await axios.get('/address', {
                headers: { Authorization: `Bearer ${token}` },
            });
            setAddressLoading(false);
            if (response.data) {
                setAddress((prev) => {
                    return {
                        ...prev,
                        fname: response.data?.fname,
                        lname: response.data?.lname,
                        country: response.data?.country,
                        streetAddress: response.data?.streetAddress,
                        city: response.data?.city,
                        state: response.data?.state,
                        pincode: response.data?.pincode,
                        phone: response.data?.phone,
                        email: response.data?.email,
                    };
                });
            }
        } catch (err) {
            console.log(err.response);
        }
    }, [token]);

    useEffect(() => {
        fetchAddress();
    }, [fetchAddress]);

    return (
        <div className='myAccountAddressPage'>
            {addressLoading ? (
                <div className='myAccountAddressPage__loading'>
                    <Loader />
                </div>
            ) : (
                <form
                    onSubmit={handleSubmit}
                    className='myAccountAddressPage__form'
                >
                    <AddressForm setAddress={setAddress} address={address} />
                    {error && (
                        <p className='myAccountAddressPage__form__error'>
                            {error}
                        </p>
                    )}
                    <div className='myAccountAddressPage__form__btn'>
                        <button>
                            {loading ? <BtnLoading /> : 'Save Address'}
                        </button>
                    </div>
                </form>
            )}
        </div>
    );
}

export default MyAccountAddressPage;
