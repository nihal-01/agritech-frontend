import { useCallback, useEffect, useState } from 'react';
import { Route, Routes } from 'react-router-dom';
import { useDispatch } from 'react-redux';

import { AdminLoginPage, AdminPrivateRoute } from './pages/admin';
import axios from './axios';
import { saveUser } from './redux/slices/userSlice';
import { fetchCategories } from './redux/slices/categoriesSlice';
import { AdminRoutes, CustomerRoutes } from './routes';

function App() {
    const dispatch = useDispatch();
    const [isLoading, setIsLoading] = useState(true);

    const fetchUser = useCallback(async () => {
        try {
            const token = localStorage.getItem('token');
            if (token) {
                const response = await axios.get('/users');
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
        <h1>Loading...</h1>
    ) : (
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
    );
}

export default App;
