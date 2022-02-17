import { Route, Routes } from 'react-router-dom';

import {
    Admin404Page,
    AdminCategoriesPage,
    AdminCustomersPage,
    AdminHomePage,
    AdminOrdersPage,
    AdminProductsPage,
    AdminSettingsPage,
} from '../pages/admin';
import { AdminSidebar, AdminNavbar } from '../components/admin';

const AdminRoutes = () => {
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
                    <Route
                        path='/customers'
                        element={<AdminCustomersPage />}
                    ></Route>
                    <Route path='/orders' element={<AdminOrdersPage />}></Route>
                    <Route
                        path='/settings'
                        element={<AdminSettingsPage />}
                    ></Route>
                    <Route path='*' element={<Admin404Page />} />
                </Routes>
            </div>
        </div>
    );
};

export default AdminRoutes;
