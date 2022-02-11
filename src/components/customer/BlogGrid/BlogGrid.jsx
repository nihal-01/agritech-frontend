import { Link } from 'react-router-dom';
import { AiOutlineCalendar, AiOutlineComment } from 'react-icons/ai';

import './BlogGrid.scss';
import { monthNames } from '../../../utils/constants';

const BlogGrid = ({ posts }) => {
    return (
        <div className='blogGrid'>
            {posts.map((post) => {
                const {
                    _id,
                    title,
                    thumbnail,
                    description,
                    createdAt,
                    category,
                } = post;

                const myDate = new Date(createdAt);

                return (
                    <div key={_id} className='blogGrid__item'>
                        <div className='blogGrid__item__img'>
                            <Link to={`/blog/${_id}`}>
                                <img src={thumbnail} alt='' />
                            </Link>
                            <Link
                                to={`/blog/categories/${category}`}
                                className='blogGrid__item__category'
                            >
                                {category}
                            </Link>
                        </div>
                        <div className='blogGrid__item__meta'>
                            <p>
                                <AiOutlineCalendar />{' '}
                                <span>
                                    {monthNames[myDate.getMonth()] +
                                        ' ' +
                                        myDate.getDate() +
                                        ', ' +
                                        myDate.getFullYear()}
                                </span>
                            </p>
                            <span>/</span>
                            <p>
                                <AiOutlineComment /> <span>6</span>
                            </p>
                        </div>
                        <h3 className='blogGrid__item__title'>
                            <Link to={`/blog/${_id}`}>{title}</Link>
                        </h3>
                        <p className='blogGrid__item__desc'>{description}</p>
                    </div>
                );
            })}
        </div>
    );
};

export default BlogGrid;
