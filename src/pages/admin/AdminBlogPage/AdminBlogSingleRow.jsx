import React, { useState } from 'react';
import { MdDeleteOutline } from 'react-icons/md';
import { useDispatch, useSelector } from 'react-redux';
import axios from '../../../axios';
import { Loader } from '../../../components/customer';
import { deletePost } from '../../../redux/slices/blogSlice';
import { monthNames } from '../../../utils/constants';

function AdminBlogSingleRow({ post }) {
    const [loading, setLoading] = useState(false);

    const myDate = new Date(post.createdAt);
    const { token } = useSelector((state) => state.user);
    const dispatch = useDispatch();

    const handleDelete = async () => {
        try {
            const resp = window.confirm(`are you sure ${post._id}`);
            if (resp) {
                setLoading(true);
                await axios.delete(`/posts/${post._id}`, {
                    headers: { Authorization: `Bearer ${token}` },
                });
                setLoading(false);
                dispatch(deletePost(post._id));
            }
        } catch (err) {
            console.log(err.response);
        }
    };

    return (
        <tr>
            <td>#{post._id.slice(0, 5)}</td>
            <td>
                <div className='table--image'>
                    <img src={post.thumbnail} alt='' />
                </div>
            </td>
            <td>{post.title}</td>
            <td>
                {monthNames[myDate.getMonth()] +
                    ' ' +
                    myDate.getDate() +
                    ', ' +
                    myDate.getFullYear()}
            </td>
            <td>{post?.category?.name || 'Undefined'}</td>
            <td>
                <button
                    className='table--deletebtn'
                    onClick={() => {
                        handleDelete();
                    }}
                >
                    <MdDeleteOutline />
                </button>
            </td>

            {loading && (
                <>
                    <td className='admin__table__loading-wrapper'></td>
                    <td className='admin__table__loading'>
                        <Loader color={'#fff'} />
                    </td>
                </>
            )}
        </tr>
    );
}

export default AdminBlogSingleRow;
