import React, { useEffect, useCallback, useState } from 'react';
import { FiEye } from 'react-icons/fi';
import { MdDeleteOutline } from 'react-icons/md';
import { useDispatch, useSelector } from 'react-redux';
import { adminNotFoundImg, noImage } from '../../../assets/images';
import axios from '../../../axios';
import { Loader } from '../../../components/customer';
import {
    deleteUser,
    setAllUsers,
    updateSearch,
    updateSkip,
} from '../../../redux/slices/userSlice';

import './AdminCustomersPage.scss';

const limit = 1;

function AdminCustomersPage() {
    const [pageNumbers, setPageNumbers] = useState([]);
    const [loading, setLoading] = useState(true);
    const [searchText, setSearchText] = useState('');

    const { search, skip, allUsers, totalUsers } = useSelector(
        (state) => state.user
    );
    const dispatch = useDispatch();

    const fetchAllUsers = useCallback(async () => {
        try {
            setLoading(true);
            console.log('fetchall users request');
            const response = await axios.get(
                `/users/all?skip=${skip}&search=${search}`
            );
            setLoading(false);
            dispatch(setAllUsers(response.data));
        } catch (err) {
            console.log(err.response);
        }
    }, [dispatch, search, skip]);

    const handleDelete = async (id) => {
        try {
            await axios.delete(`/users/${id}`);
            dispatch(deleteUser(id));
        } catch (err) {
            console.log(err.response);
        }
    };

    useEffect(() => {
        fetchAllUsers();
    }, [fetchAllUsers]);

    useEffect(() => {
        const pageNo = [];
        for (var i = 1; i <= Math.ceil(totalUsers / limit); i++) {
            pageNo.push(i);
        }
        setPageNumbers(pageNo);
    }, [totalUsers]);

    return (
        <div className='adminCustomers'>
            <h1 className='adminCustomers__title'>Categories</h1>
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
                                        <tr key={user._id}>
                                            <td>
                                                #
                                                {user._id.substr(
                                                    user._id.length - 5
                                                )}
                                            </td>
                                            <td>
                                                <div className='table--image'>
                                                    <img
                                                        src={
                                                            user?.avatar
                                                                ? user.avatar
                                                                : noImage
                                                        }
                                                        alt=''
                                                    />
                                                </div>
                                            </td>
                                            <td>{user.fname}</td>
                                            <td>{user.email}</td>
                                            <td>
                                                <button className='table--editbtn'>
                                                    <FiEye />
                                                </button>
                                                <button
                                                    className='table--deletebtn'
                                                    onClick={() => {
                                                        handleDelete(user._id);
                                                    }}
                                                >
                                                    <MdDeleteOutline />
                                                </button>
                                            </td>
                                        </tr>
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
