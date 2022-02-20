import React, { useEffect, useState } from 'react';
import { FiUploadCloud } from 'react-icons/fi';
import {
    ref,
    uploadBytesResumable,
    getDownloadURL,
    getStorage,
} from 'firebase/storage';

import './AdminCategorySidebar.scss';
import axios from '../../../axios';
import { BtnLoading } from '../../customer';
import { useDispatch } from 'react-redux';
import {
    addCategory,
    updateCategory,
} from '../../../redux/slices/categoriesSlice';
import { useSelector } from 'react-redux';

function AdminCategorySidebar({
    isCategorySidebarOpen,
    setIsCategorySidebarOpen,
}) {
    const [iconImg, setIconImg] = useState('');
    const [icon, setIcon] = useState({
        error: '',
        url: '',
        progress: 0,
    });
    const [categoryName, setCategoryName] = useState('');
    const [categoryStatus, setCategoryStatus] = useState({
        loading: false,
        error: '',
    });

    const storage = getStorage();
    const dispatch = useDispatch();
    const { isEdit, editCategory } = useSelector((state) => state.categories);
    const { token } = useSelector((state) => state.user);

    const handleIcon = (e) => {
        if (e.target.files[0]) {
            setIcon((prev) => {
                return { ...prev, error: '' };
            });

            if (!e.target.files[0].name.match(/\.(jpg|jpeg|png)/gm)) {
                setIcon({
                    ...icon,
                    error: 'Please upload jpeg, jpg, or png file',
                });
                return;
            }
            setIconImg(e.target.files[0]);
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
                    setIcon((prev) => {
                        return {
                            ...prev,
                            progress: Number(progress).toFixed(0),
                        };
                    });
                }
            },
            (error) => {
                setIcon((prev) => {
                    return {
                        ...prev,
                        error: 'something went wrong, try again.',
                    };
                });
            },
            () => {
                getDownloadURL(ref(storage, `images/${image.name}`)).then(
                    (downloadURL) => {
                        setIcon((prev) => {
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

    const handleSubmit = async (e) => {
        try {
            e.preventDefault();
            setCategoryStatus((prev) => {
                return {
                    ...prev,
                    error: '',
                    loading: true,
                };
            });

            if (iconImg && !icon.url) {
                setCategoryStatus((prev) => {
                    return {
                        ...prev,
                        error: 'please wait until file is uploaded.',
                        loading: false,
                    };
                });
                return;
            }

            if (isEdit) {
                const response = await axios.patch(
                    `/categories/${editCategory._id}`,
                    {
                        name: categoryName,
                        icon: icon?.url || editCategory.icon,
                    },
                    {
                        headers: { Authorization: `Bearer ${token}` },
                    }
                );
                dispatch(updateCategory(response.data));
            } else {
                const response = await axios.post(
                    '/categories',
                    {
                        name: categoryName,
                        icon: icon.url,
                    },
                    {
                        headers: { Authorization: `Bearer ${token}` },
                    }
                );

                dispatch(addCategory(response.data));
            }

            setCategoryStatus((prev) => {
                return {
                    ...prev,
                    loading: false,
                };
            });

            setIsCategorySidebarOpen(false);
            setIconImg('');
            setIcon((prev) => {
                return { ...prev, error: '', url: '', progress: 0 };
            });
            setCategoryName('');
        } catch (err) {
            setCategoryStatus((prev) => {
                return {
                    ...prev,
                    error:
                        err.response?.data?.error ||
                        'Something went wrong, Try again.',
                    loading: false,
                };
            });
        }
    };

    useEffect(() => {
        if (isEdit) {
            setCategoryName(editCategory.name);

            if (editCategory?.icon) {
                setIcon((prev) => {
                    return { ...prev, progress: 100 };
                });
            }
        }
    }, [editCategory.name, isEdit, editCategory?.icon]);

    return (
        <div className='adminCategorySidebar'>
            <div
                className={
                    isCategorySidebarOpen
                        ? 'adminCategorySidebar__overlay adminCategorySidebar__overlay__active'
                        : 'adminCategorySidebar__overlay'
                }
                onClick={() => {
                    setIsCategorySidebarOpen(false);
                    if (isEdit) {
                        setCategoryName('');
                    }
                }}
            ></div>
            <form
                className={
                    isCategorySidebarOpen
                        ? 'adminCategorySidebar__form adminCategorySidebar__form__active'
                        : 'adminCategorySidebar__form'
                }
                onSubmit={handleSubmit}
            >
                <div className='adminCategorySidebar__form__header'>
                    <div className='adminCategorySidebar__form__header__content'>
                        <h4>{isEdit ? 'Update' : 'Add'} Category</h4>
                        <p>
                            {isEdit ? 'Update' : 'Add'} your category and
                            necessary information from here
                        </p>
                    </div>
                    <button
                        type='button'
                        className='adminCategorySidebar__form__header__closebtn'
                        onClick={() => {
                            setIsCategorySidebarOpen(false);
                            if (isEdit) {
                                setCategoryName('');
                            }
                        }}
                    >
                        x
                    </button>
                </div>
                <div className='adminCategorySidebar__form__main'>
                    {/* Category Icon */}
                    <div className='adminCategorySidebar__form__main__file'>
                        <label htmlFor=''>Category Icon</label>
                        <div className='adminCategorySidebar__form__main__file__wrapper'>
                            <div className='adminCategorySidebar__form__main__file__wrapper__input'>
                                <input
                                    type='file'
                                    name='thumbnail'
                                    onChange={handleIcon}
                                    disabled={categoryStatus.loading}
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
                            {icon.error && (
                                <p className='adminCategorySidebar__form__error'>
                                    {icon.error}
                                </p>
                            )}
                            {iconImg || editCategory?.icon ? (
                                <>
                                    <div className='adminCategorySidebar__form__main__file__wrapper__img'>
                                        <img
                                            src={
                                                isEdit && !iconImg
                                                    ? editCategory?.icon
                                                    : URL.createObjectURL(
                                                          iconImg
                                                      )
                                            }
                                            alt=''
                                        />
                                        <span>{icon.progress}%</span>
                                    </div>
                                </>
                            ) : null}
                        </div>
                    </div>

                    {/* category name */}
                    <div className='adminCategorySidebar__form__main__input'>
                        <label htmlFor=''>Category Name</label>
                        <input
                            type='text'
                            placeholder='Category Name'
                            name='name'
                            value={categoryName}
                            onChange={(e) => {
                                setCategoryName(e.target.value);
                            }}
                            required
                            disabled={categoryStatus.loading}
                        />
                    </div>
                    {categoryStatus.error && (
                        <p className='adminCategorySidebar__form__main__error'>
                            * {categoryStatus.error}
                        </p>
                    )}
                </div>

                {/* category btns */}
                <div className='adminCategorySidebar__form__btns'>
                    <button
                        type='button'
                        className='adminCategorySidebar__form__btns__cancel'
                        onClick={() => {
                            setIsCategorySidebarOpen(false);
                            if (isEdit) {
                                setCategoryName('');
                            }
                        }}
                    >
                        Cancel
                    </button>
                    <button
                        type='submit'
                        className='adminCategorySidebar__form__btns__add'
                    >
                        {categoryStatus.loading ? (
                            <BtnLoading />
                        ) : isEdit ? (
                            'Update Category'
                        ) : (
                            'Add Category'
                        )}
                    </button>
                </div>
            </form>
        </div>
    );
}

export default AdminCategorySidebar;
