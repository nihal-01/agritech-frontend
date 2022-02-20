import { useState } from 'react';
import { AiOutlineClose } from 'react-icons/ai';
import { useDispatch, useSelector } from 'react-redux';

import axios from '../../../axios';
import { Loader } from '../../../components/customer';
import {
    decrementCartItem,
    deleteCartItem,
    incrementCartItem,
} from '../../../redux/slices/cartSlice';

const SingleCartItem = ({ item, clearCartLoading }) => {
    const [loading, setLoading] = useState(false);

    const { productId, quantity } = item;
    const { name, price, thumbnail } = item.product;

    const { token } = useSelector((state) => state.user);
    const dispatch = useDispatch();

    const decrementQuantity = async (productId, price) => {
        try {
            setLoading(true);

            await axios.patch(
                `/cart/decrement/${productId}`,
                {},
                {
                    headers: { Authorization: `Bearer ${token}` },
                }
            );
            dispatch(decrementCartItem({ productId, price }));

            setLoading(false);
        } catch (err) {
            setLoading(false);
            console.log(err.response);
        }
    };

    const incrementQuantity = async (productId, price) => {
        try {
            setLoading(true);

            await axios.patch(
                `/cart/increment/${productId}`,
                {},
                {
                    headers: { Authorization: `Bearer ${token}` },
                }
            );
            dispatch(incrementCartItem({ productId, price }));

            setLoading(false);
        } catch (err) {
            setLoading(false);
            console.log(err.response);
        }
    };

    const handleRemove = async () => {
        try {
            setLoading(true);
            await axios.patch(
                `/cart/${productId}`,
                {},
                {
                    headers: { Authorization: `Bearer ${token}` },
                }
            );
            setLoading(false);
            dispatch(deleteCartItem(item));
        } catch (err) {
            console.log(err.response.data);
            setLoading(false);
        }
    };

    return (
        <tr>
            <td>
                <button
                    className='CartPage__table__closeBtn'
                    onClick={() => {
                        handleRemove();
                    }}
                    disabled={clearCartLoading}
                >
                    <AiOutlineClose />
                </button>
            </td>
            <td>
                <img src={thumbnail} alt='' />
            </td>
            <td>
                {loading && <div className='CartPage__table__wrapper'></div>}
                {loading && (
                    <div className='CartPage__table__loader'>
                        <Loader />
                    </div>
                )}
                {name}
                <button
                    className='CartPage__table__closeBtn'
                    onClick={() => {
                        handleRemove();
                    }}
                    disabled={clearCartLoading}
                >
                    <AiOutlineClose />
                </button>
            </td>
            <td>
                <span className='CartPage__table__mob-head'>PRICE:</span>&#8377;{' '}
                {price}
            </td>
            <td style={{ textAlign: 'center' }}>
                <span className='CartPage__table__mob-head'>QUANTITY:</span>
                <div className='CartPage__table__quantity'>
                    <button
                        onClick={() => {
                            decrementQuantity(productId, price);
                        }}
                        disabled={quantity <= 1 || clearCartLoading}
                    >
                        -
                    </button>
                    <span>{quantity}</span>
                    <button
                        onClick={() => {
                            incrementQuantity(productId, price);
                        }}
                        disabled={clearCartLoading}
                    >
                        +
                    </button>
                </div>
            </td>
            <td>
                <span className='CartPage__table__mob-head'>SUBTOTAL</span>₹{' '}
                {(price * parseInt(quantity)).toFixed(0)}
            </td>
        </tr>
    );
};

export default SingleCartItem;
