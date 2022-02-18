import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { adminNotFoundImg } from '../../../assets/images';
import { Loader } from '../../../components/customer';
import {
    clearUserFilters,
    fetchUsers,
    updateSearch,
    updateSkip,
    updateUserLoading,
} from '../../../redux/slices/userSlice';

import './AdminCustomersPage.scss';
import AdminCustomersSingleRow from './AdminCustomersSingleRow';

const limit = 12;

function AdminCustomersPage() {
    const [pageNumbers, setPageNumbers] = useState([]);
    const [searchText, setSearchText] = useState('');

    const { search, skip, allUsers, totalUsers, loading } = useSelector(
        (state) => state.user
    );
    const dispatch = useDispatch();

    useEffect(() => {
        console.log('fetchall users request');
        dispatch(updateUserLoading(true));
        dispatch(fetchUsers());
    }, [dispatch, search, skip]);

    useEffect(() => {
        return () => {
            dispatch(clearUserFilters());
        };
    }, [dispatch]);

    useEffect(() => {
        const pageNo = [];
        for (var i = 1; i <= Math.ceil(totalUsers / limit); i++) {
            pageNo.push(i);
        }
        setPageNumbers(pageNo);
    }, [totalUsers]);

    return (
        <div className='adminCustomers'>
            <h1 className='adminCustomers__title'>Customers</h1>
            <form
                className='adminCustomers__options'
                onSubmit={(e) => {
                    e.preventDefault();
                    dispatch(updateSearch(searchText));
                }}
            >
                <div className='adminCustomers__options__search'>
                    <input
                        type='text'
                        placeholder='Search customers by name'
                        name='search'
                        onChange={(e) => {
                            setSearchText(e.target.value);
                        }}
                    />
                </div>
                <div className='adminCustomers__options__button'>
                    <button type='submit'>
                        <span>Search</span>
                    </button>
                </div>
            </form>
            {loading ? (
                <div className='adminCustomers__loading'>
                    <Loader color={'#fff'} />
                </div>
            ) : allUsers.length < 1 ? (
                <div className='adminCustomers__notfound'>
                    <img src={adminNotFoundImg} alt='' />
                    <p>Sorry, users not found</p>
                </div>
            ) : (
                <div className='admin__table-wrapper'>
                    <div className='admin__table'>
                        <table>
                            <thead>
                                <tr>
                                    <th>Id</th>
                                    <th>Avatar</th>
                                    <th>Name</th>
                                    <th>Email</th>
                                    <th>Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                {allUsers.map((user) => {
                                    return (
                                        <AdminCustomersSingleRow
                                            key={user._id}
                                            user={user}
                                        />
                                    );
                                })}
                            </tbody>
                        </table>
                    </div>
                    <div className='admin__table__bottom'>
                        <div className='admin__table__bottom__results'>
                            SHOWING {limit * skip + 1} -{' '}
                            {limit * (skip + 1) <= totalUsers
                                ? limit * (skip + 1)
                                : totalUsers}{' '}
                            OF {totalUsers}
                        </div>
                        <div className='admin__table__bottom__pagination'>
                            <button
                                className='admin__table__bottom__pagination__btn'
                                onClick={() => {
                                    dispatch(updateSkip(skip - 1));
                                }}
                                disabled={skip <= 0}
                            >
                                &lt;
                            </button>
                            {pageNumbers.map((number) => {
                                return (
                                    <button
                                        key={number}
                                        onClick={() => {
                                            dispatch(updateSkip(number - 1));
                                        }}
                                        className={
                                            skip + 1 === number
                                                ? 'admin__table__bottom__pagination__btn admin__table__bottom__pagination__btn__active'
                                                : 'admin__table__bottom__pagination__btn'
                                        }
                                    >
                                        {number}
                                    </button>
                                );
                            })}
                            <button
                                className='admin__table__bottom__pagination__btn'
                                onClick={() => {
                                    dispatch(updateSkip(skip + 1));
                                }}
                                disabled={
                                    skip + 1 >= Math.ceil(totalUsers / limit)
                                }
                            >
                                &gt;
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}

export default AdminCustomersPage;
