import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { avatar } from '../../../assets/images';
import axios from '../../../axios';
import { BtnLoading } from '../../../components/customer';
import { updateBlogComments } from '../../../redux/slices/blogSlice';
import { monthNames } from '../../../utils/constants';

function SingleBlogComments({ id }) {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(false);
    const [comment, setComment] = useState('');

    const { blogComments } = useSelector((state) => state.blog);
    const { user, isLoggedIn, token } = useSelector((state) => state.user);
    const dispacth = useDispatch();

    const handleSubmit = async (e) => {
        try {
            e.preventDefault();
            setLoading(true);
            const response = await axios.post(
                `/comments`,
                { postId: id, comment },
                {
                    headers: { Authorization: `Bearer ${token}` },
                }
            );
            setLoading(false);
            dispacth(updateBlogComments({ ...response.data, userId: user }));
        } catch (err) {
            setError(true);
            setLoading(false);
        }
    };

    return (
        <div>
            {blogComments.length > 0 && (
                <div className='singleBlogPage__comments__wrapper'>
                    <h3>
                        Comments <div>{blogComments.length}</div>
                    </h3>
                    <div className='singleBlogPage__comments'>
                        {blogComments.map((comment) => {
                            return (
                                <SingleComment
                                    key={comment._id}
                                    comment={comment}
                                />
                            );
                        })}
                    </div>
                </div>
            )}

            {isLoggedIn && (
                <div className='singleBlogPage__form-wrapper'>
                    <h3>Leave a Reply</h3>
                    <p className='singleBlogPage__form-wrapper__info'>
                        Your email address will not be published. Required
                        fields are marked <span>*</span>
                    </p>
                    <form
                        className='singleBlogPage__form'
                        onSubmit={handleSubmit}
                    >
                        <textarea
                            name=''
                            id=''
                            cols='30'
                            rows='10'
                            placeholder='Comment *'
                            required
                            onChange={(e) => {
                                setComment(e.target.value);
                            }}
                        ></textarea>
                        <input
                            type='text'
                            placeholder='Name'
                            required
                            value={user?.fname}
                            disabled
                        />
                        <input
                            type='email'
                            placeholder='Email'
                            required
                            value={user?.email}
                            disabled
                        />
                        {error && (
                            <p className='singleBlogPage__form__error'>
                                Something went wrong, try again
                            </p>
                        )}
                        <button type='submit' disabled={loading}>
                            {loading ? <BtnLoading /> : 'Post Comment'}
                        </button>
                    </form>
                </div>
            )}
        </div>
    );
}

export default SingleBlogComments;

const SingleComment = ({ comment }) => {
    const myDate = new Date(comment.createdAt);

    return (
        <div className='singleBlogPage__comment' key={comment._id}>
            <div className='singleBlogPage__comment__img'>
                <img src={comment?.userId?.avatar || avatar} alt='' />
            </div>
            <div className='singleBlogPage__comment__content'>
                <h5>{comment?.userId?.fname}</h5>
                <p className='singleBlogPage__comment__content__date'>
                    {monthNames[myDate.getMonth()] +
                        ' ' +
                        myDate.getDate() +
                        ', ' +
                        myDate.getFullYear()}
                </p>
                <p className='singleBlogPage__comment__content__review'>
                    {comment.comment}
                </p>
            </div>
        </div>
    );
};
