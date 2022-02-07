import { useState } from 'react';
import { AiOutlineClose } from 'react-icons/ai';
import { useDispatch } from 'react-redux';

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

    const dispatch = useDispatch();

    const decrementQuantity = async (productId, price) => {
        try {
            setLoading(true);

            await axios.patch(`/cart/decrement/${productId}`);
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

            await axios.patch(`/cart/increment/${productId}`);
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
            await axios.patch(`/cart/${productId}`);
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
                {loading && <div className='CartPage__table__wrapper'></div>}
                {loading && (
                    <div className='CartPage__table__loader'>
                        <Loader />
                    </div>
                )}
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
            <td>{name}</td>
            <td>&#8377; {price}</td>
            <td>
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
            <td>₹ {(price * parseInt(quantity)).toFixed(0)}</td>
        </tr>
    );
};

export default SingleCartItem;
