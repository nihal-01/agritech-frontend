import { useCallback, useEffect, useState } from 'react';
import { Navigate, Route, Routes } from 'react-router-dom';
import { useDispatch } from 'react-redux';

import { Header, Footer } from './components/customer';
import {
    Admin404Page,
    AdminCategoriesPage,
    AdminHomePage,
    AdminPrivateRoute,
    AdminProductsPage,
} from './pages/admin';
import {
    AboutPage,
    ContactPage,
    HomePage,
    LoginPage,
    NotFoundPage,
    // PrivateRoute,
    ProductsPage,
    ResetPasswordPage,
    SignupPage,
    SingleProductPage,
} from './pages/customer';
import { AdminSidebar, AdminNavbar } from './components/admin';
import axios from './axios';
import { saveUser } from './redux/slices/userSlice';
import { useSelector } from 'react-redux';

function App() {
    const dispatch = useDispatch();
    const [isLoading, setIsLoading] = useState(true);

    const fetchUser = useCallback(async () => {
        const token = localStorage.getItem('token');
        if (token) {
            const response = await axios.get('/users');
            dispatch(saveUser(response.data));
            console.log(response.data);
        }
        setIsLoading(false);
    }, [dispatch]);

    useEffect(() => {
        fetchUser();
    }, [fetchUser]);

    return isLoading ? (
        <h1>Loading...</h1>
    ) : (
        <Routes>
            <Route path='/admin/login' element={<h1>Login Admin</h1>} />
            <Route
                path='/admin/*'
                element={
                    <AdminPrivateRoute>
                        <Admin />
                    </AdminPrivateRoute>
                }
            />
            <Route path='/*' element={<Customer />} />
        </Routes>
    );
}

const Customer = () => {
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
                    <Route path='/about' element={<AboutPage />} />
                    <Route path='/contact' element={<ContactPage />} />
                    <Route path='/*' element={<NotFoundPage />} />
                </Routes>
            </main>
            <Footer />
        </>
    );
};

const Admin = () => {
    return (
        <div className='admin'>
            <AdminSidebar />
            <div className='admin-main'>
                <AdminNavbar />
                <Routes>
                    <Route path='/' element={<AdminHomePage />} />
                    <Route
                        path='/products'
                        element={<AdminProductsPage />}
                    ></Route>
                    <Route
                        path='/categories'
                        element={<AdminCategoriesPage />}
                    ></Route>
                    <Route path='*' element={<Admin404Page />} />
                </Routes>
            </div>
        </div>
    );
};

export default App;
