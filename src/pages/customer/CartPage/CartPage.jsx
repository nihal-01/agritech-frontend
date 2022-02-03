import { useSelector } from 'react-redux';
import { AiOutlineClose } from 'react-icons/ai';

import './CartPage.scss';
import { PageHero, BlankSpace } from '../../../components/customer/';

const CartPage = () => {
    const { cartItems, cartTotal } = useSelector((state) => state.cart);

    console.log('my cart');

    return (
        <div className='CartPage__wrapper'>
            <PageHero title='Cart' />
            <BlankSpace />
            <div className='CartPage'>
                <table className='CartPage__table'>
                    <thead>
                        <tr>
                            <th></th>
                            <th></th>
                            <th>Product</th>
                            <th>Price</th>
                            <th>Quantity</th>
                            <th>Subtotal</th>
                        </tr>
                    </thead>
                    <tbody>
                        {cartItems.map((item) => {
                            const { productId, quantity } = item;
                            const { name, price, thumbnail } = item.product;
                            return (
                                <tr key={productId}>
                                    <td>
                                        <button className='CartPage__table__closeBtn'>
                                            <AiOutlineClose />
                                        </button>
                                    </td>
                                    <td>
                                        <img src={thumbnail} alt='' />
                                    </td>
                                    <td>{name}</td>
                                    <td>&#8377; {price}</td>
                                    <td>{quantity}</td>
                                    <td>{(price * quantity).toFixed(0)}</td>
                                </tr>
                            );
                        })}
                        <tr>
                            <td
                                colSpan={6}
                                className='CartPage__table__clearCart'
                            >
                                <div className='CartPage__table__clearCartBtn'>
                                    <button>Clear Cart</button>
                                </div>
                            </td>
                        </tr>
                    </tbody>
                </table>
                <div className='CartPage__total'>
                    <div className='CartPage__total__box'>
                        <h2>Cart totals</h2>
                        <div className='CartPage__total__box__subtotal'>
                            <p>Subtotal</p>
                            <h5>&#8377; {cartTotal}</h5>
                        </div>
                        <hr />
                        <div className='CartPage__total__box__total'>
                            <p>Total</p>
                            <h5>&#8377; {cartTotal}</h5>
                        </div>
                        <button>Proceed to checkout</button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default CartPage;
