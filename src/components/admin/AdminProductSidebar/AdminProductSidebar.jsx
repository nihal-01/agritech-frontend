import React, { useRef, useState, useEffect, useCallback } from 'react';
import { FiUploadCloud } from 'react-icons/fi';
import {
    ref,
    uploadBytesResumable,
    getDownloadURL,
    getStorage,
} from 'firebase/storage';

import './AdminProductSidebar.scss';
import '../../../firebase/config';
import axios from '../../../axios';
import { useDispatch, useSelector } from 'react-redux';
import { BtnLoading, Loader } from '../../customer';
import {
    updateIsEdit,
    updateProduct,
} from '../../../redux/slices/productsSlice';

function AdminProductSidebar({
    isProductSidebarOpen,
    setIsProductSidebarOpen,
}) {
    const [thumbnailImg, setThumbnailImg] = useState('');
    const [thumbnail, setThumbnail] = useState({
        error: '',
        url: '',
        progress: 0,
    });
    const [product, setProduct] = useState({
        name: '',
        shortDescription: '',
        stock: 0,
        unit: '',
        description: '',
        price: 0,
        category: '',
    });
    const [productState, setProductState] = useState({
        loading: false,
        err: '',
    });

    // imagespath states
    const [img1, setImg1] = useState('');
    const [img1State, setImg1State] = useState({
        progress: 0,
        error: '',
        url: '',
    });
    const [img2, setImg2] = useState('');
    const [img2State, setImg2State] = useState({
        progress: 0,
        error: '',
        url: '',
    });
    const [img3, setImg3] = useState('');
    const [img3State, setImg3State] = useState({
        progress: 0,
        error: '',
        url: '',
    });

    const [loading, setLoading] = useState(false);

    const storage = getStorage();
    const categories = useSelector((state) => state.categories.categories);
    const imgRef = useRef(null);
    const { token } = useSelector((state) => state.user);
    const { isEdit, editProductId } = useSelector((state) => state.products);
    const dispatch = useDispatch();

    const handleChange = (e) => {
        setProduct({ ...product, [e.target.name]: e.target.value });
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
                e.target.value = null;
                return;
            }
            setThumbnailImg(e.target.files[0]);
            handleUploadThumbnail(e.target.files[0]);
        }
    };

    const handleImages = (e, setImg, setImgState) => {
        if (e.target.files[0]) {
            setImgState((prev) => {
                return { ...prev, error: '', url: '', progress: 0 };
            });

            if (e.target.files[0].name.match(/\.(jpg|jpeg|png|webp)/gm)) {
                setImg(e.target.files[0]);
                handleUploadImage(e.target.files[0], setImg, setImgState);
            } else {
                setImgState((prev) => {
                    return {
                        ...prev,
                        error: 'Please upload jpeg, jpg, or png file',
                    };
                });
            }
            e.target.value = null;
        }
    };

    // thumbnail upload to fireabse
    const handleUploadThumbnail = (image) => {
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

    // product upload
    const handleSubmit = async (e) => {
        try {
            e.preventDefault();
            setProductState((prev) => {
                return { ...prev, err: '', loading: true };
            });

            if (
                !thumbnail.url ||
                (img1 && !img1State.url) ||
                (img2 && !img2State.url) ||
                (img3 && !img3State.url)
            ) {
                setProductState((prev) => {
                    return {
                        ...prev,
                        err: 'please wait until file is uploaded.',
                        loading: false,
                    };
                });
                return;
            }

            const imagesPath = [];
            if (img1State.url) {
                imagesPath.push(img1State.url);
            }
            if (img2State.url) {
                imagesPath.push(img2State.url);
            }
            if (img3State.url) {
                imagesPath.push(img3State.url);
            }

            if (isEdit) {
                const response = await axios.patch(
                    `/products/${editProductId}`,
                    {
                        ...product,
                        price: Number(product.price),
                        stock: Number(product.stock),
                        thumbnail: thumbnail.url,
                        imagesPath: imagesPath,
                    },
                    {
                        headers: { Authorization: `Bearer ${token}` },
                    }
                );
                dispatch(updateProduct(response.data));
            } else {
                await axios.post(
                    '/products',
                    {
                        ...product,
                        price: Number(product.price),
                        stock: Number(product.stock),
                        thumbnail: thumbnail.url,
                        imagesPath: imagesPath,
                    },
                    {
                        headers: { Authorization: `Bearer ${token}` },
                    }
                );
            }

            setProductState((prev) => {
                return {
                    ...prev,
                    loading: false,
                };
            });

            setIsProductSidebarOpen(false);
            clearAll();
            dispatch(updateIsEdit({ isEdit: false }));
        } catch (err) {
            console.log(err);

            setProductState((prev) => {
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

    // upload images to firebase
    const handleUploadImage = (image, setImg, setImgState) => {
        const storageRef = ref(storage, `images/${image.name}`);
        const uploadTask = uploadBytesResumable(storageRef, image);

        uploadTask.on(
            'state_changed',
            (snapshot) => {
                const progress =
                    (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
                if (!isNaN(progress)) {
                    setImgState((prev) => {
                        return {
                            ...prev,
                            progress: Number(progress).toFixed(0),
                        };
                    });
                }
            },
            (error) => {
                setImg('');
                setImgState((prev) => {
                    return {
                        ...prev,
                        error: 'something went wrong, try again.',
                    };
                });
            },
            () => {
                getDownloadURL(ref(storage, `images/${image.name}`)).then(
                    (downloadURL) => {
                        setImgState((prev) => {
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

    const clearAll = () => {
        setThumbnailImg('');
        setThumbnail((prev) => {
            return { ...prev, error: '', url: '', progress: 0 };
        });

        imgRef.current.value = null;

        setImg1('');
        setImg1State((prev) => {
            return { ...prev, progress: 0, error: '', url: '' };
        });
        setImg2('');
        setImg2State((prev) => {
            return { ...prev, progress: 0, error: '', url: '' };
        });
        setImg3('');
        setImg3State((prev) => {
            return { ...prev, progress: 0, error: '', url: '' };
        });

        setProduct((prev) => {
            return {
                ...prev,
                name: '',
                shortDescription: '',
                stock: 0,
                unit: '',
                description: '',
                price: 0,
                category: '',
            };
        });
    };

    const fetchEditProduct = useCallback(async () => {
        try {
            setLoading(true);

            const response = await axios.get(`/products/${editProductId}`);
            const {
                name,
                shortDescription,
                stock,
                unit,
                description,
                price,
                category,
                thumbnail,
                imagesPath,
            } = response.data;

            setProduct((prev) => {
                return {
                    ...prev,
                    name: name,
                    shortDescription: shortDescription,
                    stock: stock,
                    unit: unit,
                    description: description,
                    price: price,
                    category: category._id,
                };
            });

            setThumbnail((prev) => {
                return {
                    ...prev,
                    url: thumbnail,
                    progress: 100,
                };
            });

            if (imagesPath.length >= 1) {
                setImg1State((prev) => {
                    return { ...prev, url: imagesPath[0], progress: 100 };
                });
            }

            if (imagesPath.length >= 2) {
                setImg2State((prev) => {
                    return { ...prev, url: imagesPath[1], progress: 100 };
                });
            }

            if (imagesPath.length >= 3) {
                setImg3State((prev) => {
                    return { ...prev, url: imagesPath[2], progress: 100 };
                });
            }

            setLoading(false);
        } catch (err) {
            console.log(err.response);
            setLoading(false);
        }
    }, [editProductId]);

    useEffect(() => {
        if (isEdit) {
            fetchEditProduct();
        }
    }, [isEdit, fetchEditProduct]);

    return (
        <div className='admin--addProductSidebar'>
            <div
                className={
                    isProductSidebarOpen
                        ? 'admin--addProductSidebar__ovarlay admin--addProductSidebar__ovarlay__active'
                        : 'admin--addProductSidebar__ovarlay'
                }
                onClick={() => {
                    setIsProductSidebarOpen(false);
                    if (isEdit) {
                        clearAll();
                        dispatch(updateIsEdit({ isEdit: false }));
                    }
                }}
            ></div>
            <form
                className={
                    isProductSidebarOpen
                        ? 'admin--addProductSidebar__main admin--addProductSidebar__main__active'
                        : 'admin--addProductSidebar__main'
                }
                onSubmit={handleSubmit}
            >
                <div className='admin--addProductSidebar__main__header'>
                    <div className='admin--addProductSidebar__main__header__content'>
                        <h4>{isEdit ? 'Edit Product' : 'Add Product'}</h4>
                        <p>
                            {isEdit ? 'Edit' : 'Add'} your product and necessary
                            information from here
                        </p>
                    </div>
                    <button
                        type='button'
                        className='admin--addProductSidebar__main__header__closebtn'
                        onClick={() => {
                            setIsProductSidebarOpen(false);
                            if (isEdit) {
                                clearAll();
                                dispatch(updateIsEdit({ isEdit: false }));
                            }
                        }}
                    >
                        x
                    </button>
                </div>
                {loading ? (
                    <div className='admin--addProductSidebar__main__loading'>
                        <Loader color={'#fff'} />
                    </div>
                ) : (
                    <>
                        <div className='admin--addProductSidebar__main__form'>
                            {/* thumbnail */}
                            <div className='admin--addProductSidebar__main__form__file'>
                                <label htmlFor=''>Product Thumbnail</label>
                                <div className='admin--addProductSidebar__main__form__file__wrapper'>
                                    <div className='admin--addProductSidebar__main__form__file__wrapper__input'>
                                        <input
                                            type='file'
                                            name='thumbnail'
                                            required={!isEdit}
                                            onChange={handleThumbnail}
                                            ref={imgRef}
                                        />
                                        <span>
                                            <FiUploadCloud />
                                        </span>
                                        <h4>Drag your image here</h4>
                                        <p>
                                            (Only *.jpeg and *.png images will
                                            be accepted)
                                        </p>
                                    </div>
                                    {thumbnail.error && (
                                        <p className='admin--addProductSidebar__main__error'>
                                            {thumbnail.error}
                                        </p>
                                    )}
                                    {thumbnailImg ? (
                                        <>
                                            <div className='admin--addProductSidebar__main__form__file__wrapper__img'>
                                                <img
                                                    src={URL.createObjectURL(
                                                        thumbnailImg
                                                    )}
                                                    alt=''
                                                />
                                                <span>
                                                    {thumbnail.progress}%
                                                </span>
                                            </div>
                                        </>
                                    ) : isEdit && thumbnail.url ? (
                                        <>
                                            <div className='admin--addProductSidebar__main__form__file__wrapper__img'>
                                                <img
                                                    src={thumbnail.url}
                                                    alt=''
                                                />
                                                <span>
                                                    {thumbnail.progress}%
                                                </span>
                                            </div>
                                        </>
                                    ) : null}
                                </div>
                            </div>
                            <div className='admin--addProductSidebar__main__form__input'>
                                <label htmlFor=''>Product Name</label>
                                <input
                                    type='text'
                                    name='name'
                                    value={product.name || ''}
                                    placeholder='Product Name'
                                    onChange={handleChange}
                                    required
                                />
                            </div>
                            <div className='admin--addProductSidebar__main__form__input'>
                                <label htmlFor=''>Short Description</label>
                                <input
                                    type='text'
                                    name='shortDescription'
                                    value={product.shortDescription || ''}
                                    placeholder='Description'
                                    onChange={handleChange}
                                    required
                                />
                            </div>
                            <div className='admin--addProductSidebar__main__form__input'>
                                <label htmlFor=''>Stock</label>
                                <input
                                    type='number'
                                    name='stock'
                                    value={product.stock || ''}
                                    placeholder='stock'
                                    onChange={handleChange}
                                    required
                                />
                            </div>
                            <div className='admin--addProductSidebar__main__form__select'>
                                <label htmlFor=''>Unit</label>
                                <select
                                    name='unit'
                                    id=''
                                    onChange={handleChange}
                                    value={product.unit || ''}
                                    required
                                >
                                    <option value='' disabled hidden>
                                        Selct unit
                                    </option>
                                    <option value='kg'>Kilo Gram</option>
                                    <option value='g'>Gram</option>
                                    <option value='l'>Litre</option>
                                    <option value='pack'>pack</option>
                                </select>
                            </div>
                            <div className='admin--addProductSidebar__main__form__textarea'>
                                <label htmlFor=''>Description</label>
                                <textarea
                                    name='description'
                                    value={product.description || ''}
                                    id=''
                                    cols='30'
                                    rows='10'
                                    placeholder='Description'
                                    minLength='30'
                                    onChange={handleChange}
                                    required
                                ></textarea>
                            </div>
                            <div className='admin--addProductSidebar__main__form__input'>
                                <label htmlFor=''>Price</label>
                                <input
                                    name='price'
                                    value={product.price || ''}
                                    type='number'
                                    placeholder='Price'
                                    onChange={handleChange}
                                    required
                                />
                            </div>
                            <div className='admin--addProductSidebar__main__form__select'>
                                <label htmlFor=''>Category</label>
                                <select
                                    name='category'
                                    value={product.category || ''}
                                    id=''
                                    onChange={handleChange}
                                    required
                                >
                                    <option value='' hidden disabled>
                                        Selct category
                                    </option>
                                    {categories.map((category) => {
                                        const { _id, name } = category;
                                        return (
                                            <option key={_id} value={_id}>
                                                {name}
                                            </option>
                                        );
                                    })}
                                </select>
                            </div>

                            {/* other images */}
                            <div className='admin--addProductSidebar__main__form__imagePaths'>
                                <label htmlFor=''>Images</label>
                                <div className='admin--addProductSidebar__main__form__imagePaths__right'>
                                    <div className='admin--addProductSidebar__main__form__imagePaths__right__single-img'>
                                        {img1 || img1State.url ? (
                                            <>
                                                <div className='admin--addProductSidebar__main__form__imagePaths__right__single-img__image'>
                                                    <img
                                                        src={
                                                            isEdit && !img1
                                                                ? img1State.url
                                                                : URL.createObjectURL(
                                                                      img1
                                                                  )
                                                        }
                                                        alt=''
                                                    />
                                                    <span>
                                                        {img1State.progress}%
                                                    </span>
                                                    <button
                                                        type='button'
                                                        onClick={() => {
                                                            setImg1('');
                                                            setImg1State(
                                                                (prev) => {
                                                                    return {
                                                                        ...prev,
                                                                        error: '',
                                                                        progress: 0,
                                                                        url: '',
                                                                    };
                                                                }
                                                            );
                                                        }}
                                                    >
                                                        x
                                                    </button>
                                                </div>
                                            </>
                                        ) : (
                                            <>
                                                <input
                                                    type='file'
                                                    onChange={(e) => {
                                                        handleImages(
                                                            e,
                                                            setImg1,
                                                            setImg1State
                                                        );
                                                    }}
                                                />
                                                <span className='admin--addProductSidebar__images__uploadIcon'>
                                                    <FiUploadCloud />
                                                </span>
                                                <p>Upload</p>
                                            </>
                                        )}
                                    </div>
                                    <div className='admin--addProductSidebar__main__form__imagePaths__right__single-img'>
                                        {img2 || img2State.url ? (
                                            <>
                                                <div className='admin--addProductSidebar__main__form__imagePaths__right__single-img__image'>
                                                    <img
                                                        src={
                                                            isEdit && !img2
                                                                ? img2State.url
                                                                : URL.createObjectURL(
                                                                      img2
                                                                  )
                                                        }
                                                        alt=''
                                                    />
                                                    <span>
                                                        {img2State.progress}%
                                                    </span>
                                                    <button
                                                        type='button'
                                                        onClick={() => {
                                                            setImg2('');
                                                            setImg2State(
                                                                (prev) => {
                                                                    return {
                                                                        ...prev,
                                                                        error: '',
                                                                        progress: 0,
                                                                        url: '',
                                                                    };
                                                                }
                                                            );
                                                        }}
                                                    >
                                                        x
                                                    </button>
                                                </div>
                                            </>
                                        ) : (
                                            <>
                                                <input
                                                    type='file'
                                                    onChange={(e) => {
                                                        handleImages(
                                                            e,
                                                            setImg2,
                                                            setImg2State
                                                        );
                                                    }}
                                                />
                                                <span className='admin--addProductSidebar__images__uploadIcon'>
                                                    <FiUploadCloud />
                                                </span>
                                                <p>Upload</p>
                                            </>
                                        )}
                                    </div>
                                    <div className='admin--addProductSidebar__main__form__imagePaths__right__single-img'>
                                        {img3 || img3State.url ? (
                                            <>
                                                <div className='admin--addProductSidebar__main__form__imagePaths__right__single-img__image'>
                                                    <img
                                                        src={
                                                            isEdit && !img3
                                                                ? img3State.url
                                                                : URL.createObjectURL(
                                                                      img3
                                                                  )
                                                        }
                                                        alt=''
                                                    />
                                                    <span>
                                                        {img3State.progress}%
                                                    </span>
                                                    <button
                                                        type='button'
                                                        onClick={() => {
                                                            setImg3('');
                                                            setImg3State(
                                                                (prev) => {
                                                                    return {
                                                                        ...prev,
                                                                        error: '',
                                                                        progress: 0,
                                                                        url: '',
                                                                    };
                                                                }
                                                            );
                                                        }}
                                                    >
                                                        x
                                                    </button>
                                                </div>
                                            </>
                                        ) : (
                                            <>
                                                <input
                                                    type='file'
                                                    onChange={(e) => {
                                                        handleImages(
                                                            e,
                                                            setImg3,
                                                            setImg3State
                                                        );
                                                    }}
                                                />
                                                <span className='admin--addProductSidebar__images__uploadIcon'>
                                                    <FiUploadCloud />
                                                </span>
                                                <p>Upload</p>
                                            </>
                                        )}
                                    </div>
                                </div>
                            </div>
                            {productState.err && (
                                <p className='admin--addProductSidebar__main__err'>
                                    {productState.err}
                                </p>
                            )}
                        </div>
                        <div className='admin--addProductSidebar__main__btns'>
                            <button
                                type='button'
                                className='admin--addProductSidebar__main__btns__cancel'
                                onClick={() => {
                                    setIsProductSidebarOpen(false);
                                    if (isEdit) {
                                        clearAll();
                                        dispatch(
                                            updateIsEdit({ isEdit: false })
                                        );
                                    }
                                }}
                            >
                                Cancel
                            </button>
                            <button
                                type='submit'
                                className='admin--addProductSidebar__main__btns__add'
                            >
                                {productState.loading ? (
                                    <BtnLoading />
                                ) : (
                                    'Add Product'
                                )}
                            </button>
                        </div>
                    </>
                )}
            </form>
        </div>
    );
}

export default AdminProductSidebar;
