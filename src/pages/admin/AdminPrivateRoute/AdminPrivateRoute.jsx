import { useSelector } from 'react-redux';
import { Navigate } from 'react-router-dom';

const AdminPrivateRoute = ({ children }) => {
    const user = useSelector((state) => state.user.user);
    return user?.role === 'admin' ? children : <Navigate replace to='/admin/login' />;
};

export default AdminPrivateRoute;
