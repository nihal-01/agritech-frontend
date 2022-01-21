import React, { useState } from 'react';
import { FiUploadCloud } from 'react-icons/fi';
import {
    ref,
    uploadBytesResumable,
    getDownloadURL,
    getStorage,
} from 'firebase/storage';

import './AdminProductSidebar.scss';
import '../../../firebase/config';
import { useForm } from '../../../hooks';
import axios from '../../../axios';

const categories = [
    { _id: '012a', name: 'vegitables' },
    { _id: '012b', name: 'fruits' },
    { _id: '012c', name: 'others' },
];

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
    const [images, setImages] = useState([]);
    const [product, handleChange] = useForm({
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

    const storage = getStorage();

    const handleThumbnail = (e) => {
        if (e.target.files[0]) {
            setThumbnail((prev) => {
                return { ...prev, error: '', url: '', progress: 0 };
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

    const handleImages = (e) => {
        if (e.target.files[0]) {
            for (let i = 0; i < e.target.files.length; i++) {
                if (e.target.files[i].name.match(/\.(jpg|jpeg|png|webp)/gm)) {
                    setImages([...images, e.target.files[i]]);
                }
            }
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
                setThumbnail({
                    ...thumbnail,
                    error: 'something went wrong, try again.',
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

    const handleSubmit = async (e) => {
        try {
            e.preventDefault();

            if (!thumbnail.url) {
                setProductState((prev) => {
                    return {
                        ...prev,
                        err: 'please wait thumbnail is uploading to server!.',
                    };
                });
                return;
            }

            const response = await axios.post('/products', {
                ...product,
                price: Number(product.price),
                stock: Number(product.stock),
                thumbnail: thumbnail.url,
            });
            console.log(response.data);
        } catch (err) {
            console.log(err.response);
        }
    };

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
                        <h4>Add Product</h4>
                        <p>
                            Add your product and necessary information from here
                        </p>
                    </div>
                    <button
                        type='button'
                        className='admin--addProductSidebar__main__header__closebtn'
                        onClick={() => {
                            setIsProductSidebarOpen(false);
                        }}
                    >
                        x
                    </button>
                </div>
                <div className='admin--addProductSidebar__main__form'>
                    {/* thumbnail */}
                    <div className='admin--addProductSidebar__main__form__file'>
                        <label htmlFor=''>Product Thumbnail</label>
                        <div className='admin--addProductSidebar__main__form__file__wrapper'>
                            <div className='admin--addProductSidebar__main__form__file__wrapper__input'>
                                <input
                                    type='file'
                                    name='thumbnail'
                                    required
                                    onChange={handleThumbnail}
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
                                <p className='admin--addProductSidebar__main__error'>
                                    {thumbnail.error}
                                </p>
                            )}
                            {thumbnailImg && (
                                <>
                                    <div className='admin--addProductSidebar__main__form__file__wrapper__img'>
                                        <img
                                            src={URL.createObjectURL(
                                                thumbnailImg
                                            )}
                                            alt=''
                                        />
                                        <span>{thumbnail.progress}%</span>
                                    </div>
                                </>
                            )}
                        </div>
                    </div>
                    <div className='admin--addProductSidebar__main__form__input'>
                        <label htmlFor=''>Product Name</label>
                        <input
                            type='text'
                            name='name'
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
                            required
                        >
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
                            id=''
                            onChange={handleChange}
                            required
                        >
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
                            <input type='file' onChange={handleImages} />
                            {images.length > 0 && (
                                <div className='admin--addProductSidebar__main__form__imagePaths__right__images'>
                                    {images.map((image, index) => {
                                        return (
                                            <div
                                                key={index}
                                                className='admin--addProductSidebar__main__form__imagePaths__right__image'
                                            >
                                                <img
                                                    src={URL.createObjectURL(
                                                        image
                                                    )}
                                                    alt=''
                                                />
                                                <span>10%</span>
                                                <button
                                                    type='button'
                                                    onClick={() => {
                                                        setImages((images) => {
                                                            return images.filter(
                                                                (
                                                                    _,
                                                                    imgIndex
                                                                ) => {
                                                                    return (
                                                                        imgIndex !==
                                                                        index
                                                                    );
                                                                }
                                                            );
                                                        });
                                                    }}
                                                >
                                                    x
                                                </button>
                                            </div>
                                        );
                                    })}
                                </div>
                            )}
                        </div>
                    </div>
                    <p className='admin--addProductSidebar__main__err'>
                        * Something went wrong...
                    </p>
                </div>
                <div className='admin--addProductSidebar__main__btns'>
                    <button
                        type='button'
                        className='admin--addProductSidebar__main__btns__cancel'
                        onClick={() => {
                            setIsProductSidebarOpen(false);
                        }}
                    >
                        Cancel
                    </button>
                    <button
                        type='submit'
                        className='admin--addProductSidebar__main__btns__add'
                    >
                        Add Product
                    </button>
                </div>
            </form>
        </div>
    );
}

export default AdminProductSidebar;
