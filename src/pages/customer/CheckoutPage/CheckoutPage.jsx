import React, { useCallback, useEffect, useState } from 'react';

import './CheckoutPage.scss';
import {
    PageHero,
    BlankSpace,
    AddressForm,
    PlaceOrder,
    Loader,
} from '../../../components/customer';
import axios from '../../../axios';
import { useDispatch, useSelector } from 'react-redux';
import { emptyCartImg } from '../../../assets/images';
import { Link, useNavigate } from 'react-router-dom';
import { clearCartItems } from '../../../redux/slices/cartSlice';

function CheckoutPage() {
    const [addressLoading, setAddressLoading] = useState(true);
    const [addressId, setAddressId] = useState('');
    const [loading, setLoading] = useState(false);
    const [paymentType, setPaymentType] = useState('');
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
    const [error, setError] = useState('');
    console.log('checkout page');

    const { token } = useSelector((state) => state.user);
    const { cartTotal, cartItems } = useSelector((state) => state.cart);
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const handleSubmit = async (e) => {
        try {
            e.preventDefault();
            setLoading(true);
            setError('');

            const myAddress = await axios.post(
                '/address',
                { ...address },
                {
                    headers: { Authorization: `Bearer ${token}` },
                }
            );
            console.log(myAddress);
            setAddressId(myAddress.data);

            const response = await axios.post(
                '/orders',
                {
                    address: myAddress.data,
                    paymentType: paymentType,
                    totalAmount: cartTotal,
                },
                {
                    headers: { Authorization: `Bearer ${token}` },
                }
            );
            if (paymentType === 'card') {
                return loadRazorpay(response);
            }
            setLoading(false);
            navigate(`/checkout/order-received/${response.data._id}`);
            dispatch(clearCartItems());
        } catch (err) {
            setLoading(false);
            setError(
                err.response.data?.error || 'something went wrong, Try again'
            );
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
            setAddressId(response.data._id);
        } catch (err) {
            console.log(err.response);
        }
    }, [token]);

    const loadRazorpay = (result) => {
        const script = document.createElement('script');
        script.src = 'https://checkout.razorpay.com/v1/checkout.js';
        script.onerror = () => {
            alert('Razorpay SDK failed to load. Are you online?');
        };

        script.onload = async () => {
            try {
                const { amount, id: order_id, currency } = result.data;
                const razorpayKey = 'rzp_test_wRs1QW9pU0kcUb';

                const options = {
                    key: razorpayKey,
                    amount: amount.toString(),
                    currency: currency,
                    name: 'Agritech',
                    description: 'Eat Organic & Healthy Food',
                    order_id: order_id,
                    handler: async function (response) {
                        const rsp = await axios.post(
                            '/orders/pay-order',
                            {
                                address: addressId,
                                paymentType: 'card',
                                totalAmount: cartTotal,
                                razorpayPaymentId: response.razorpay_payment_id,
                                razorpayOrderId: response.razorpay_order_id,
                                razorpaySignature: response.razorpay_signature,
                            },
                            {
                                headers: { Authorization: `Bearer ${token}` },
                            }
                        );
                        navigate(`/checkout/order-received/${rsp.data._id}`);
                        dispatch(clearCartItems());
                    },
                    prefill: {
                        name: address?.fname || 'Example',
                        email: address?.email || 'example@gmail.com',
                        contact: address?.phone || '',
                    },
                    notes: {
                        address: address?.streetAddress || '',
                    },
                    theme: {
                        color: '#347758',
                    },
                };
                setLoading(false);
                const paymentObject = new window.Razorpay(options);
                paymentObject.open();
            } catch (err) {
                alert('Sorry yout payment failed Try again.!');
            }
        };
        document.body.appendChild(script);
    };

    useEffect(() => {
        fetchAddress();
    }, [fetchAddress]);

    return (
        <div>
            <PageHero title='Checkout' />
            <BlankSpace />
            {addressLoading ? (
                <div className='CartPage__loading'>
                    <Loader />
                </div>
            ) : cartItems.length < 1 ? (
                <div className='CartPage__noItem'>
                    <img src={emptyCartImg} alt='' />
                    <p>Your cart is currently empty.</p>
                    <Link to='/products'>
                        <button>Return to shop</button>
                    </Link>
                </div>
            ) : (
                <form className='checkoutPage' onSubmit={handleSubmit}>
                    <AddressForm setAddress={setAddress} address={address} />
                    <PlaceOrder
                        setPaymentType={setPaymentType}
                        loading={loading}
                        error={error}
                    />
                </form>
            )}
        </div>
    );
}

export default CheckoutPage;
