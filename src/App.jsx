import { useCallback, useEffect, useLayoutEffect, useState } from 'react';
import { Route, Routes, useLocation } from 'react-router-dom';
import { useDispatch } from 'react-redux';

import { AdminLoginPage, AdminPrivateRoute } from './pages/admin';
import axios from './axios';
import { saveUser } from './redux/slices/userSlice';
import { fetchCategories } from './redux/slices/categoriesSlice';
import { AdminRoutes, CustomerRoutes } from './routes';
import { Loader } from './components/customer';

const Wrapper = ({ children }) => {
    const location = useLocation();
    useLayoutEffect(() => {
        document.documentElement.scrollTo(0, 0);
    }, [location.pathname]);
    return children;
};

function App() {
    const dispatch = useDispatch();
    const [isLoading, setIsLoading] = useState(true);

    const fetchUser = useCallback(async () => {
        try {
            const token = localStorage.getItem('token');
            if (token) {
                const response = await axios.get('/users', {
                    headers: { Authorization: `Bearer ${token}` },
                });
                dispatch(saveUser(response.data));
            }
            setIsLoading(false);
        } catch (err) {
            setIsLoading(false);
        }
    }, [dispatch]);

    useEffect(() => {
        fetchUser();
        dispatch(fetchCategories());
    }, [fetchUser, dispatch]);

    return isLoading ? (
        <div className='loading'>
            <Loader />
        </div>
    ) : (
        <Wrapper>
            <Routes>
                <Route path='/admin/login' element={<AdminLoginPage />} />
                <Route
                    path='/admin/*'
                    element={
                        <AdminPrivateRoute>
                            <AdminRoutes />
                        </AdminPrivateRoute>
                    }
                />
                <Route path='/*' element={<CustomerRoutes />} />
            </Routes>
        </Wrapper>
    );
}

export default App;
