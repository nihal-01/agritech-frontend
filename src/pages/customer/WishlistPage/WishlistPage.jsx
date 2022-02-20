import { BlankSpace, PageHero } from '../../../components/customer';
import './WishlistPage.scss';
import { useSelector } from 'react-redux';
import WishlistSingleItem from './WishlistSingleItem';

const WishlistPage = () => {
    const { wishlistItems } = useSelector((state) => state.wishlist);

    return (
        <div className='wishlistPage--wrapper'>
            <PageHero title='Wishlist' />
            <BlankSpace />
            <div className='wishlistPage'>
                {wishlistItems.length < 1 ? (
                    <p className='wishlistPage__noWishlist'>
                        There is no products on the wishlist!
                    </p>
                ) : (
                    <table className='wishlistPage__table'>
                        <tbody>
                            {wishlistItems.map((item) => {
                                return (
                                    <WishlistSingleItem
                                        key={item._id}
                                        product={item}
                                    />
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
