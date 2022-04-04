import { useSelector } from 'react-redux';

import './BlogGrid.scss';
import BlogGridSingle from './BlogGridSingle';

const BlogGrid = () => {
    const { posts } = useSelector((state) => state.blog);

    return (
        <div className='blogGrid'>
            {posts.map((post) => {
                return <BlogGridSingle key={post._id} {...post} />;
            })}
        </div>
    );
};

export default BlogGrid;
