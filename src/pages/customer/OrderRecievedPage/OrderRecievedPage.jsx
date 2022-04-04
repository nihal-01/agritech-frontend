import React, { useCallback, useEffect, useRef, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';
import ReactCanvasConfetti from 'react-canvas-confetti';

import './OrderRecievedPage.scss';
import { PageHero, BlankSpace, Loader } from '../../../components/customer';
import axios from '../../../axios';
import { monthNames } from '../../../utils/constants';
import NotFoundPage from '../NotFoundPage/NotFoundPage';

const canvasStyles = {
    position: 'fixed',
    pointerEvents: 'none',
    width: '100%',
    height: '100%',
    top: 0,
    left: 0,
};

function OrderRecievedPage() {
    const [order, setOrder] = useState({});
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(false);

    const { token } = useSelector((state) => state.user);
    const { id } = useParams();

    const refAnimationInstance = useRef(null);

    const getInstance = useCallback((instance) => {
        refAnimationInstance.current = instance;
    }, []);

    const makeShot = useCallback((particleRatio, opts) => {
        refAnimationInstance.current &&
            refAnimationInstance.current({
                ...opts,
                origin: { y: 0.7 },
                particleCount: Math.floor(200 * particleRatio),
            });
    }, []);

    const fire = useCallback(() => {
        makeShot(0.25, {
            spread: 26,
            startVelocity: 55,
        });

        makeShot(0.2, {
            spread: 60,
        });

        makeShot(0.35, {
            spread: 100,
            decay: 0.91,
            scalar: 0.8,
        });

        makeShot(0.1, {
            spread: 120,
            startVelocity: 25,
            decay: 0.92,
            scalar: 1.2,
        });

        makeShot(0.1, {
            spread: 120,
            startVelocity: 45,
        });
    }, [makeShot]);

    const fetchSingleOrder = useCallback(async () => {
        try {
            const response = await axios.get(`/orders/${id}`, {
                headers: { Authorization: `Bearer ${token}` },
            });
            setOrder(response.data);
            setLoading(false);
        } catch (err) {
            setError(true);
            setLoading(false);
            console.log(err.response);
        }
    }, [id, token]);

    const myDate = new Date(order?.createdAt);

    useEffect(() => {
        fetchSingleOrder();
    }, [fetchSingleOrder]);

    useEffect(() => {
        if (loading === false) {
            fire();
        }
    }, [fire, loading]);

    return (
        <div>
            <PageHero title='Order Recieved' checkout={true} />
            <ReactCanvasConfetti
                refConfetti={getInstance}
                style={canvasStyles}
            />
            {!error && <BlankSpace />}
            <div className='orderReceivedPage'>
                {loading ? (
                    <div className='orderReceivedPage__loading'>
                        <Loader />
                    </div>
                ) : error ? (
                    <NotFoundPage />
                ) : (
                    <>
                        <div className='orderReceivedPage__thankyou'>
                            Thank you. Your order has been received.
                        </div>
                        <div className='orderReceivedPage__list'>
                            <ul>
                                <li>
                                    Order Id: <br />
                                    <strong>#{id.slice(0, 5)}</strong>
                                </li>
                                <li>
                                    Date: <br />
                                    <strong>
                                        {monthNames[myDate.getMonth()] +
                                            ' ' +
                                            myDate.getDate() +
                                            ', ' +
                                            myDate.getFullYear()}
                                    </strong>
                                </li>
                                <li>
                                    Email: <br />
                                    <strong>{order?.address?.email}</strong>
                                </li>
                                <li className='orderReceivedPage__list__price'>
                                    Total:
                                    <br />
                                    <strong>&#8377;{order?.totalAmount}</strong>
                                </li>
                                <li>
                                    Payment method: <br />
                                    <strong>{order?.paymentType}</strong>
                                </li>
                            </ul>
                        </div>
                        <div className='orderReceivedPage__details'>
                            <h2>ORDER DETAILS</h2>
                            <table className='orderReceivedPage__details__table'>
                                <thead>
                                    <tr>
                                        <th>Product</th>
                                        <th>Total</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {order?.products.map((product, index) => {
                                        return (
                                            <tr
                                                className='orderReceivedPage__details__table__product'
                                                key={index}
                                            >
                                                <td>
                                                    {product.productId?.name} x{' '}
                                                    {product?.quantity}
                                                </td>
                                                <td>
                                                    &#8377;
                                                    {product.productId?.price *
                                                        product?.quantity}
                                                </td>
                                            </tr>
                                        );
                                    })}

                                    <tr>
                                        <td>Payment method:</td>
                                        <td>{order?.paymentType}</td>
                                    </tr>
                                    <tr className='orderReceivedPage__details__table__total'>
                                        <td>Total:</td>
                                        <td>&#8377;{order?.totalAmount}</td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                    </>
                )}
            </div>
        </div>
    );
}

export default OrderRecievedPage;
