import React, { useEffect } from 'react';
import { BsSearch } from 'react-icons/bs';
import { Link } from 'react-router-dom';

import './BlogSidebar.scss';

function BlogSidebar() {
    useEffect(() => {
        console.log('blog sidebar');
    }, []);

    return (
        <div className='blogSidebar'>
            <form className='blogSidebar__search'>
                <span>
                    <BsSearch />
                </span>
                <input type='text' placeholder='Search...' />
                <button>Search</button>
            </form>
            <div className='blogSidebar__categories'>
                <h2>Blog Categories</h2>
                <ul>
                    <li>
                        <Link to='/'>Home</Link>
                    </li>
                    <li>
                        <Link to='/'>Home</Link>
                    </li>
                </ul>
            </div>
            <div className='blogSidebar__posts'>
                <h2>Recent Posts</h2>
                <div className='blogSidebar__posts__wrapper'>
                    <div className='blogSidebar__posts__wrapper__single'>
                        <div className='blogSidebar__posts__wrapper__single__image'>
                            <Link to='/'>
                                <img
                                    src='https://demo2.pavothemes.com/freshio/wp-content/uploads/2019/12/blog-1-150x150.jpg'
                                    alt=''
                                />
                            </Link>
                        </div>
                        <div className='blogSidebar__posts__wrapper__single__content'>
                            <Link to='/'>
                                <h4>My blog title</h4>
                            </Link>
                            <span>February 29, 2001</span>
                        </div>
                    </div>
                    <div className='blogSidebar__posts__wrapper__single'>
                        <div className='blogSidebar__posts__wrapper__single__image'>
                            <img
                                src='https://demo2.pavothemes.com/freshio/wp-content/uploads/2019/12/blog-1-150x150.jpg'
                                alt=''
                            />
                        </div>
                        <div className='blogSidebar__posts__wrapper__single__content'>
                            <Link to='/'>
                                <h4>My blog title</h4>
                            </Link>
                            <span>February 29, 2001</span>
                        </div>
                    </div>
                    <div className='blogSidebar__posts__wrapper__single'>
                        <div className='blogSidebar__posts__wrapper__single__image'>
                            <img
                                src='https://demo2.pavothemes.com/freshio/wp-content/uploads/2019/12/blog-1-150x150.jpg'
                                alt=''
                            />
                        </div>
                        <div className='blogSidebar__posts__wrapper__single__content'>
                            <Link to='/'>
                                <h4>My blog title</h4>
                            </Link>
                            <span>February 29, 2001</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default BlogSidebar;
