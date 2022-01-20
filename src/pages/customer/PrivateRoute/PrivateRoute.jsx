const { useSelector } = require('react-redux');
const { Navigate } = require('react-router-dom');

const PrivateRoute = ({ children, redirectTo }) => {
    const isLoggedIn = useSelector((state) => state.user.isLoggedIn);
    return isLoggedIn ? children : <Navigate replace to={redirectTo} />;
};

export default PrivateRoute;
