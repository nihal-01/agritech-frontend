import { Link } from 'react-router-dom';

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
                        <img src={thumbnail} alt='' />
                        <div className='blogGrid__item__content'>
                            <div className='blogGrid__item__content__meta'>
                                <Link to={`/blog/category/${category}`}>
                                    {category}
                                </Link>
                                <span>
                                    {monthNames[myDate.getMonth()] +
                                        ' ' +
                                        myDate.getDay() +
                                        ', ' +
                                        myDate.getFullYear()}
                                </span>
                            </div>
                            <h2>
                                <Link to={`/blog/${_id}`}>{title}</Link>
                            </h2>
                            <p>{description}</p>
                            <Link to={`/blog/${_id}`}>
                                <button className='blogGrid__item__content__btn'>
                                    Read More
                                </button>
                            </Link>
                        </div>
                    </div>
                );
            })}
        </div>
    );
};

export default BlogGrid;
