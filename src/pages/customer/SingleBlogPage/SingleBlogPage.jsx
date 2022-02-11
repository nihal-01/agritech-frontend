import { Link } from 'react-router-dom';

import './SingleBlogPage.scss';
import {
    PageHero,
    BlankSpace,
    BlogSidebar,
} from '../../../components/customer';
import { monthNames } from '../../../utils/constants';
import { avatar } from '../../../assets/images';

const post = {
    _id: '004',
    category: 'Fruits',
    title: 'Our Market Picks: This Is What We Love',
    createdAt: '2022-02-07T15:28:26.301Z',
    thumbnail:
        'https://demo2.wpopal.com/ecolive/wp-content/uploads/2021/10/blog-22-1024x683.jpg',
    content:
        '<p>Lorem ipsum dolor sit amet, consectetuer adipiscing elit, sed diam nonummy nibh euismod tincidunt ut laoreet dolore magna aliquam erat volutpat. Ut wisi enim ad minim veniam, quis nostrud exerci tation ullamcorper suscipit lobortis nisl ut aliquip ex ea commodo consequat. Duis autem vel eum iriure dolor in hendrerit in vulputate velit esse molestie consequat, vel illum dolore eu feugiat nulla facilisis at vero eros et accumsan et iusto odio dignissim qui blandit praesent luptatum zzril delenit augue duis dolore te feugaitLorem ipsum dolor sit amet, consectetuer adipiscing elit, sed diam nonummy.</p><br /><p>Sed ut perspiciatis, unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam eaque ipsa, quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt, explicabo. nemo enim ipsam voluptatem, quia voluptas sit, aspernatur aut odit aut fugit, sed quia consequuntur magni dolores eos, qui ratione voluptatem sequi nesciunt, neque porro quisquam est, qui dolorem ipsum, quia dolor sit, amet, consectetur, adipisci velit, sed quia non numquam eius modi tempora incidunt, ut labore et dolore magnam aliquam quaerat voluptatem. ut enim ad minima veniam, quis nostrum exercitationem ullam corporis suscipit laboriosam, nisi ut aliquid ex ea commodi consequatur? quis autem vel eum iure reprehenderit, qui in ea voluptate velit esse, quam nihil molestiae consequatur, vel illum, qui dolorem eum fugiat, quo voluptas.</p>',
    nextPost: {
        _id: '005',
        title: 'Product to Include into Your Shopping List',
    },
    previousPost: {
        _id: '003',
        title: 'How to Choose the Freshest Products',
    },
};

const SingleBlogPage = () => {
    const {
        // _id,
        category,
        title,
        createdAt,
        thumbnail,
        content,
        nextPost,
        previousPost,
    } = post;
    const myDate = new Date(createdAt);

    console.log('single blog..!');

    return (
        <div>
            <PageHero title={title} blog={true} />
            <BlankSpace />
            <div className='singleBlogPage__wrapper'>
                <div className='singleBlogPage'>
                    <div className='singleBlogPage__meta'>
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
                    <h1>{title}</h1>
                    <img
                        src={thumbnail}
                        alt=''
                        className='singleBlogPage__thumbnail'
                    />
                    <p
                        dangerouslySetInnerHTML={{ __html: content }}
                        className='singleBlogPage__para'
                    ></p>
                    <div className='singleBlogPage__nav'>
                        <div className='singleBlogPage__nav__prev'>
                            <span className='singleBlogPage__nav__reader-text'>
                                Previous post
                            </span>
                            <Link to={`/blog/${previousPost._id}`}>
                                <span className='singleBlogPage__nav__title'>
                                    {previousPost.title}
                                </span>
                            </Link>
                        </div>
                        <div className='singleBlogPage__nav__next'>
                            <span className='singleBlogPage__nav__reader-text'>
                                Next post
                            </span>
                            <Link to={`/blog/${nextPost._id}`}>
                                <span className='singleBlogPage__nav__title'>
                                    {nextPost.title}
                                </span>
                            </Link>
                        </div>
                    </div>

                    {/* blog comments */}
                    <div className='singleBlogPage__comments__wrapper'>
                        <h3>
                            Comments <div>20</div>
                        </h3>
                        <div className='singleBlogPage__comments'>
                            <div className='singleBlogPage__comment'>
                                <div className='singleBlogPage__comment__img'>
                                    <img src={avatar} alt='' />
                                </div>
                                <div className='singleBlogPage__comment__content'>
                                    <h5>Nihal N</h5>
                                    <p className='singleBlogPage__comment__content__date'>
                                        {/* {monthNames[reviewDate.getMonth()] +
                                            ' ' +
                                            reviewDate.getDate() +
                                            ', ' +
                                            reviewDate.getFullYear()} */}
                                        February 8, 2022
                                    </p>
                                    <p className='singleBlogPage__comment__content__review'>
                                        This is a awesome post
                                    </p>
                                </div>
                            </div>

                            <div className='singleBlogPage__comment'>
                                <div className='singleBlogPage__comment__img'>
                                    <img src={avatar} alt='' />
                                </div>
                                <div className='singleBlogPage__comment__content'>
                                    <h5>Nihal N</h5>
                                    <p className='singleBlogPage__comment__content__date'>
                                        {/* {monthNames[reviewDate.getMonth()] +
                                            ' ' +
                                            reviewDate.getDate() +
                                            ', ' +
                                            reviewDate.getFullYear()} */}
                                        February 8, 2022
                                    </p>
                                    <p className='singleBlogPage__comment__content__review'>
                                        This is a awesome post
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className='singleBlogPage__form-wrapper'>
                        <h3>Leave a Reply</h3>
                        <p className='singleBlogPage__form-wrapper__info'>
                            Your email address will not be published. Required
                            fields are marked <span>*</span>
                        </p>
                        <form className='singleBlogPage__form'>
                            <textarea
                                name=''
                                id=''
                                cols='30'
                                rows='10'
                                placeholder='Comment *'
                                required
                            ></textarea>
                            <input type='text' placeholder='Name' required />
                            <input type='email' placeholder='Email' required />
                            {/* <p className='singleBlogPage__form__error'>
                            Something went wrong, try again
                        </p> */}
                            <button type='submit'>Post Comment</button>
                        </form>
                    </div>
                </div>
                <BlogSidebar />
            </div>
            <BlankSpace />
        </div>
    );
};

export default SingleBlogPage;
