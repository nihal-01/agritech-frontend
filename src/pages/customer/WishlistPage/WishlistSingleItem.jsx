import React, { useState } from 'react';
import { AiOutlineClose } from 'react-icons/ai';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import axios from '../../../axios';
import { BtnLoading } from '../../../components/customer';
import { addItemToCart } from '../../../redux/slices/cartSlice';
import { deleteWishlist } from '../../../redux/slices/wishlistSlice';
import { monthNames } from '../../../utils/constants';

function WishlistSingleItem({ product }) {
    const [loading, setLoading] = useState(false);

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const { isLoggedIn, token } = useSelector((state) => state.user);
    const myDate = new Date(product.createdAt);

    const addToCart = async () => {
        try {
            if (!isLoggedIn) {
                navigate('/login');
                return;
            }
            setLoading(true);

            await axios.post(
                '/cart',
                {
                    productId: product._id,
                    quantity: 1,
                },
                {
                    headers: { Authorization: `Bearer ${token}` },
                }
            );

            dispatch(addItemToCart({ product, quantity: 1 }));
            setLoading(false);
            dispatch(deleteWishlist(product._id));
        } catch (err) {
            console.log(err.response.data);
        }
    };

    return (
        <tr key={product._id}>
            <td className='wishlistPage__table__close'>
                <button
                    onClick={() => {
                        dispatch(deleteWishlist(product._id));
                    }}
                    disabled={loading}
                >
                    <AiOutlineClose />
                </button>
            </td>
            <td className='wishlistPage__table__thumbnail'>
                <img src={product.thumbnail} alt='' />
            </td>
            <td className='wishlistPage__table__main'>
                <div className='wishlistPage__table__main__name'>
                    <span>{product.name}</span>
                </div>
                <div className='wishlistPage__table__main__price'>
                    <span>&#8377; {product.price}</span>
                </div>
                <div className='wishlistPage__table__main__date'>
                    <span>
                        {monthNames[myDate.getMonth()] +
                            ' ' +
                            myDate.getDay() +
                            ', ' +
                            myDate.getFullYear()}
                    </span>
                </div>
            </td>
            <td className='wishlistPage__table__stock'>
                <p>{product.stock > 0 ? 'In stock' : 'Out of stock'}</p>
                {product.stock > 0 ? (
                    <button onClick={addToCart} disabled={loading}>
                        {loading ? (
                            <BtnLoading width={20} height={20} />
                        ) : (
                            'Add to cart'
                        )}
                    </button>
                ) : (
                    <Link to={`/products/${product._id}`}>
                        <button>Read more</button>
                    </Link>
                )}
            </td>
        </tr>
    );
}

export default WishlistSingleItem;
