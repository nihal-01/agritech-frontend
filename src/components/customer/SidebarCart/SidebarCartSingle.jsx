import { useState } from 'react';
import { AiOutlineClose } from 'react-icons/ai';
import { useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';

import axios from '../../../axios';
import { deleteCartItem } from '../../../redux/slices/cartSlice';
import { BtnLoading } from '..';

const SidebarCartSingle = ({ item, setIsSidebarOpen }) => {
    const [loading, setLoading] = useState(false);

    const { productId, quantity } = item;
    const { thumbnail, name, price } = item.product;

    const dispatch = useDispatch();

    const handleRemove = async (cartItem) => {
        try {
            setLoading(true);

            await axios.patch(`/cart/${cartItem.productId}`);
            setLoading(false);
            dispatch(deleteCartItem(cartItem));
        } catch (err) {
            console.log(err.response.data);
            setLoading(false);
        }
    };

    return (
        <li className='sidebarCart__products__item'>
            {loading && (
                <div className='sidebarCart__products__item__loading'>
                    <BtnLoading />
                </div>
            )}
            <Link
                to={`/products/${productId}`}
                className='sidebarCart__products__item__img'
                onClick={() => setIsSidebarOpen(false)}
            >
                <img src={thumbnail} alt='' />
            </Link>
            <div className='sidebarCart__products__item__content'>
                <Link
                    to={`/products/${productId}`}
                    onClick={() => setIsSidebarOpen(false)}
                >
                    {name}
                </Link>
                <p>
                    {quantity} x <span>${price}</span>
                </p>
            </div>
            <button
                className='sidebarCart__products__item__remove'
                onClick={() => {
                    handleRemove(item);
                }}
            >
                <AiOutlineClose />
            </button>
        </li>
    );
};

export default SidebarCartSingle;
