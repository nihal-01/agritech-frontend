import { useSelector } from 'react-redux';
import { Navigate } from 'react-router-dom';

const SuperAdminPrivateRoute = ({ children }) => {
    const user = useSelector((state) => state.user.user);
    return user?.role === 'super-admin' ? (
        children
    ) : (
        <Navigate replace to='/admin/login' />
    );
};

export default SuperAdminPrivateRoute;
