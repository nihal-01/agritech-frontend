import React, { useState } from 'react';
import { FiUploadCloud } from 'react-icons/fi';
import RichTextEditor from '../RichTextEditor/RichTextEditor';
import {
    ref,
    uploadBytesResumable,
    getDownloadURL,
    getStorage,
} from 'firebase/storage';

import './AdminBlogSidebar.scss';
import { useSelector } from 'react-redux';
import axios from '../../../axios';
import { BtnLoading } from '../../customer';

function AdminBlogSidebar({ isBlogSidebarOpen, setBlogSidebarOpen }) {
    const [body, setBody] = useState('');
    const [thumbnailImg, setThumbnailImg] = useState('');
    const [thumbnail, setThumbnail] = useState({
        error: '',
        url: '',
        progress: 0,
    });
    const [blogStatus, setBlogStatus] = useState({ loading: false, error: '' });
    const [data, setData] = useState({
        title: '',
        category: '',
    });

    const storage = getStorage();
    const { postCategories } = useSelector((state) => state.blog);
    const { token } = useSelector((state) => state.user);

    const getValue = (value) => {
        setBody(value);
    };

    const handleThumbnail = (e) => {
        if (e.target.files[0]) {
            setThumbnail((prev) => {
                return { ...prev, error: '' };
            });

            if (!e.target.files[0].name.match(/\.(jpg|jpeg|png)/gm)) {
                setThumbnail({
                    ...thumbnail,
                    error: 'Please upload jpeg, jpg, or png file',
                });
                return;
            }
            setThumbnailImg(e.target.files[0]);
            handleUpload(e.target.files[0]);
        }
    };

    const handleUpload = (image) => {
        const storageRef = ref(storage, `images/${image.name}`);
        const uploadTask = uploadBytesResumable(storageRef, image);

        uploadTask.on(
            'state_changed',
            (snapshot) => {
                const progress =
                    (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
                if (!isNaN(progress)) {
                    setThumbnail((prev) => {
                        return {
                            ...prev,
                            progress: Number(progress).toFixed(0),
                        };
                    });
                }
            },
            (error) => {
                setThumbnail((prev) => {
                    return {
                        ...prev,
                        error: 'something went wrong, try again.',
                    };
                });
            },
            () => {
                getDownloadURL(ref(storage, `images/${image.name}`)).then(
                    (downloadURL) => {
                        setThumbnail((prev) => {
                            return {
                                ...prev,
                                url: downloadURL,
                            };
                        });
                    }
                );
            }
        );
    };

    const handleChange = (e) => {
        setData({ ...data, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        try {
            e.preventDefault();

            setBlogStatus((prev) => {
                return {
                    ...prev,
                    error: '',
                    loading: true,
                };
            });

            if (body.replace(/(<([^>]+)>)/gi, '').length < 200) {
                setBlogStatus((prev) => {
                    return {
                        ...prev,
                        error: 'Must contain at least 200 characters..!',
                        loading: false,
                    };
                });
                return;
            }

            if (thumbnailImg && !thumbnail.url) {
                setBlogStatus((prev) => {
                    return {
                        ...prev,
                        error: 'please wait until file is uploaded.',
                        loading: false,
                    };
                });
                return;
            }

            await axios.post(
                '/posts',
                { body, ...data, thumbnail: thumbnail.url },
                {
                    headers: { Authorization: `Bearer ${token}` },
                }
            );

            setBlogStatus((prev) => {
                return { ...prev, loading: false };
            });

            setBlogSidebarOpen(false);
            setData((prev) => {
                return { ...prev, category: '', title: '' };
            });
            setThumbnailImg('');
            setThumbnail((prev) => {
                return { ...prev, error: '', progress: 0, url: '' };
            });
            setBody('');
        } catch (err) {
            console.log(err.response);
        }
    };

    console.log('blog page');

    return (
        <div className='adminBlogSidebar'>
            <div
                className={
                    isBlogSidebarOpen
                        ? 'adminBlogSidebar__overlay adminBlogSidebar__overlay__active'
                        : 'adminBlogSidebar__overlay'
                }
                onClick={() => {
                    setBlogSidebarOpen(false);
                }}
            ></div>
            <form
                className={
                    isBlogSidebarOpen
                        ? 'adminBlogSidebar__form adminBlogSidebar__form__active'
                        : 'adminBlogSidebar__form'
                }
                onSubmit={handleSubmit}
            >
                <div className='adminBlogSidebar__form__header'>
                    <div className='adminBlogSidebar__form__header__content'>
                        <h4>Add Blog</h4>
                        <p>Add your Blog and necessary information from here</p>
                    </div>
                    <button
                        type='button'
                        className='adminBlogSidebar__form__header__closebtn'
                        onClick={() => {
                            setBlogSidebarOpen(false);
                        }}
                    >
                        x
                    </button>
                </div>
                <div className='adminBlogSidebar__form__main'>
                    {/* Category Icon */}
                    <div className='adminBlogSidebar__form__main__file'>
                        <label htmlFor=''>Blog Thumbnail</label>
                        <div className='adminBlogSidebar__form__main__file__wrapper'>
                            <div className='adminBlogSidebar__form__main__file__wrapper__input'>
                                <input
                                    type='file'
                                    name='thumbnail'
                                    onChange={handleThumbnail}
                                    required
                                    disabled={blogStatus.loading}
                                />
                                <span>
                                    <FiUploadCloud />
                                </span>
                                <h4>Drag your image here</h4>
                                <p>
                                    (Only *.jpeg and *.png images will be
                                    accepted)
                                </p>
                            </div>
                            {thumbnail.error && (
                                <p className='adminBlogSidebar__form__error'>
                                    {thumbnail.error}
                                </p>
                            )}
                            {thumbnailImg ? (
                                <>
                                    <div className='adminBlogSidebar__form__main__file__wrapper__img'>
                                        <img
                                            src={URL.createObjectURL(
                                                thumbnailImg
                                            )}
                                            alt=''
                                        />
                                        <span>{thumbnail.progress}%</span>
                                    </div>
                                </>
                            ) : null}
                        </div>
                    </div>

                    <div className='adminBlogSidebar__form__main__input'>
                        <label htmlFor=''>Blog Title</label>
                        <input
                            type='text'
                            placeholder='Blog Title'
                            name='title'
                            value={data.title || ''}
                            onChange={handleChange}
                            required
                            disabled={blogStatus.loading}
                        />
                    </div>

                    <div className='adminBlogSidebar__form__main__select'>
                        <label htmlFor=''>Category</label>
                        <select
                            name='category'
                            id=''
                            onChange={handleChange}
                            value={data.category || ''}
                            required
                        >
                            <option value='' disabled hidden>
                                Selct category
                            </option>
                            {postCategories.map((category) => {
                                return (
                                    <option
                                        value={category._id}
                                        key={category._id}
                                    >
                                        {category.name}
                                    </option>
                                );
                            })}
                        </select>
                    </div>

                    <div className='adminBlogSidebar__form__main__editor'>
                        <label>Blog Content</label>
                        <div className='adminBlogSidebar__form__main__editor__wrapper'>
                            <RichTextEditor
                                getValue={getValue}
                                initialValue={body}
                            />
                        </div>
                    </div>

                    {blogStatus.error && (
                        <p className='adminBlogSidebar__form__main__error'>
                            * {blogStatus.error}
                        </p>
                    )}
                </div>
                <div className='adminBlogSidebar__form__btns'>
                    <button
                        type='button'
                        className='adminBlogSidebar__form__btns__cancel'
                        onClick={() => {
                            setBlogSidebarOpen(false);
                        }}
                    >
                        Cancel
                    </button>
                    <button
                        type='submit'
                        className='adminBlogSidebar__form__btns__add'
                    >
                        {blogStatus.loading ? <BtnLoading /> : 'Add Blog'}
                    </button>
                </div>
            </form>
        </div>
    );
}

export default AdminBlogSidebar;

// title
// body
// category
// thumbnail
