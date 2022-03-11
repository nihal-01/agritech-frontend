import { useSelector } from 'react-redux';
import { Navigate, Route, Routes } from 'react-router-dom';

import { Header, Footer, BottomNav } from '../components/customer';
import {
    AboutPage,
    BlogPage,
    BlogSearchPage,
    CartPage,
    CheckoutPage,
    ContactPage,
    HomePage,
    LoginPage,
    MyAccountAddressPage,
    MyAccountDashboardPage,
    MyAccountDetailsPage,
    MyAccountOrdersPage,
    MyAccountPage,
    MyAccountSingleOrderPage,
    NotFoundPage,
    OrderRecievedPage,
    PrivateRoute,
    ProductsPage,
    ResetPasswordEmailPage,
    ResetPasswordPage,
    SearchPage,
    SignupPage,
    SingleBlogPage,
    SingleProductPage,
    WishlistPage,
} from '../pages/customer';

const CustomerRoutes = () => {
    const isLoggedIn = useSelector((state) => state.user.isLoggedIn);

    return (
        <>
            <Header />
            <BottomNav />
            <main>
                <Routes>
                    <Route path='/' element={<HomePage />} />
                    <Route
                        path='/signup'
                        element={
                            isLoggedIn ? (
                                <Navigate replace to='/' />
                            ) : (
                                <SignupPage />
                            )
                        }
                    />
                    <Route
                        path='/login'
                        element={
                            isLoggedIn ? (
                                <Navigate replace to='/' />
                            ) : (
                                <LoginPage />
                            )
                        }
                    />
                    <Route path='/products' element={<ProductsPage />} />
                    <Route
                        path='/products/:id'
                        element={<SingleProductPage />}
                    />
                    <Route
                        path='/my-account/reset-password'
                        element={<ResetPasswordEmailPage />}
                    />
                    <Route
                        path='/my-account/reset-password/:userId/:token'
                        element={<ResetPasswordPage />}
                    />
                    <Route
                        path='/cart'
                        element={
                            <PrivateRoute redirectTo={'/login'}>
                                <CartPage />
                            </PrivateRoute>
                        }
                    />
                    <Route
                        path='/checkout'
                        element={
                            <PrivateRoute redirectTo={'/login'}>
                                <CheckoutPage />
                            </PrivateRoute>
                        }
                    />
                    <Route
                        path='/checkout/order-received/:id'
                        element={
                            <PrivateRoute redirectTo={'/login'}>
                                <OrderRecievedPage />
                            </PrivateRoute>
                        }
                    />
                    <Route path='/wishlist' element={<WishlistPage />} />
                    <Route
                        path='/products/category/:category'
                        element={<SearchPage />}
                    />
                    <Route
                        path='/products/search/:search'
                        element={<SearchPage />}
                    />
                    <Route path='/about' element={<AboutPage />} />
                    <Route path='/contact' element={<ContactPage />} />
                    <Route path='/blog' element={<BlogPage />} />
                    <Route
                        path='/blog/category/:category'
                        element={<BlogSearchPage />}
                    />
                    <Route
                        path='/blog/search/:search'
                        element={<BlogSearchPage />}
                    />
                    <Route path='/blog/:id' element={<SingleBlogPage />} />
                    <Route
                        path='/my-account'
                        element={
                            <PrivateRoute redirectTo={'/login'}>
                                <MyAccountPage />
                            </PrivateRoute>
                        }
                    >
                        <Route path='' element={<MyAccountDashboardPage />} />
                        <Route
                            path='orders'
                            element={<MyAccountOrdersPage />}
                        />
                        <Route
                            path='orders/:id'
                            element={<MyAccountSingleOrderPage />}
                        />
                        <Route
                            path='address'
                            element={<MyAccountAddressPage />}
                        />
                        <Route
                            path='edit-account'
                            element={<MyAccountDetailsPage />}
                        />
                    </Route>
                    <Route path='/*' element={<NotFoundPage />} />
                </Routes>
            </main>
            <Footer />
        </>
    );
};

export default CustomerRoutes;
