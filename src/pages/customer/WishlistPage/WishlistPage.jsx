import { AiOutlineClose } from 'react-icons/ai';
import { Link } from 'react-router-dom';
import { BlankSpace, PageHero } from '../../../components/customer';
import './WishlistPage.scss';
import { monthNames } from '../../../utils/constants';

const wishlist = [];

const WishlistPage = () => {
    console.log('WishlistPage');

    return (
        <div className='wishlistPage--wrapper'>
            <PageHero title='Wishlist' />
            <BlankSpace />
            <div className='wishlistPage'>
                {wishlist.length < 1 ? (
                    <p className='wishlistPage__noWishlist'>There are no products on the wishlist!</p>
                ) : (
                    <table className='wishlistPage__table'>
                        <tbody>
                            {wishlist.map((item) => {
                                const {
                                    _id,
                                    name,
                                    thumbnail,
                                    price,
                                    stock,
                                    createdAt,
                                } = item;
                                const myDate = new Date(createdAt);

                                return (
                                    <tr key={_id}>
                                        <td className='wishlistPage__table__close'>
                                            <button>
                                                <AiOutlineClose />
                                            </button>
                                        </td>
                                        <td className='wishlistPage__table__thumbnail'>
                                            <img src={thumbnail} alt='' />
                                        </td>
                                        <td className='wishlistPage__table__main'>
                                            <div className='wishlistPage__table__main__name'>
                                                <span>{name}</span>
                                            </div>
                                            <div className='wishlistPage__table__main__price'>
                                                <span>&#8377; {price}</span>
                                            </div>
                                            <div className='wishlistPage__table__main__date'>
                                                <span>
                                                    {monthNames[
                                                        myDate.getMonth()
                                                    ] +
                                                        ' ' +
                                                        myDate.getDay() +
                                                        ', ' +
                                                        myDate.getFullYear()}
                                                </span>
                                            </div>
                                        </td>
                                        <td className='wishlistPage__table__stock'>
                                            <p>
                                                {stock > 0
                                                    ? 'In stock'
                                                    : 'Out of stock'}
                                            </p>
                                            {stock > 0 ? (
                                                <button>Add to cart</button>
                                            ) : (
                                                <Link to={`/products/${_id}`}>
                                                    <button>Read more</button>
                                                </Link>
                                            )}
                                        </td>
                                    </tr>
                                );
                            })}
                        </tbody>
                    </table>
                )}
            </div>
        </div>
    );
};

export default WishlistPage;
