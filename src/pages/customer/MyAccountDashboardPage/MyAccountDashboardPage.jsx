import React from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';

import './MyAccountDashboardPage.scss';

function MyAccountDashboardPage() {
    const { user } = useSelector((state) => state.user);

    return (
        <div className='myAccountDashboardPage'>
            <p>
                Hello <strong>{user?.fname}</strong>
            </p>
            <p>
                From your account dashboard you can view your{' '}
                <Link to='orders'>recent orders</Link>, manage your{' '}
                <Link to='address'>shipping and billing addresses</Link>, and{' '}
                <Link to='edit-account'>
                    edit your password and account details
                </Link>
                .
            </p>
        </div>
    );
}

export default MyAccountDashboardPage;
