import { useSelector } from 'react-redux';
import { Navigate, Route, Routes } from 'react-router-dom';

import { Header, Footer, BottomNav } from '../components/customer';
import {
    AboutPage,
    BlogPage,
    CartPage,
    ContactPage,
    HomePage,
    LoginPage,
    NotFoundPage,
    PrivateRoute,
    ProductsPage,
    ResetPasswordPage,
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
                        path='/my-account/lost-password'
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
                    <Route path='/wishlist' element={<WishlistPage />} />
                    <Route path='/about' element={<AboutPage />} />
                    <Route path='/contact' element={<ContactPage />} />
                    <Route path='/blog' element={<BlogPage />} />
                    <Route path='/blog/:id' element={<SingleBlogPage />} />
                    <Route path='/*' element={<NotFoundPage />} />
                </Routes>
            </main>
            <BottomNav />
            <Footer />
        </>
    );
};

export default CustomerRoutes;
