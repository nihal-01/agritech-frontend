import React, { useState } from 'react';
import { FiUploadCloud } from 'react-icons/fi';

import './AdminAddProductSidebar.scss';

function AdminAddProductSidebar({ addProductSidebar, setAddProductsSidebar }) {
    const [thumbnail, setThumbnail] = useState('');
    const [thumbnailError, setThumbnailError] = useState('');
    const [images, setImages] = useState([]);

    const handleThumbnail = (e) => {
        if (e.target.files[0]) {
            setThumbnailError('');
            setThumbnail('');

            if (!e.target.files[0].name.match(/\.(jpg|jpeg|png|webp)/gm)) {
                setThumbnailError('Please upload jpeg, jpg, png or webp file');
                return;
            }
            setThumbnail(e.target.files[0]);
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

    console.log(images);

    return (
        <div className='admin--addProductSidebar'>
            <div className='admin--addProductSidebar__ovarlay'></div>
            <form className='admin--addProductSidebar__main'>
                <div className='admin--addProductSidebar__main__header'>
                    <div className='admin--addProductSidebar__main__header__content'>
                        <h4>Add Product</h4>
                        <p>
                            Add your product and necessary information from here
                        </p>
                    </div>
                    <button className='admin--addProductSidebar__main__header__closebtn'>
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
                            {thumbnailError && (
                                <p className='admin--addProductSidebar__main__error'>
                                    {thumbnailError}
                                </p>
                            )}
                            {thumbnail && (
                                <>
                                    <div className='admin--addProductSidebar__main__form__file__wrapper__img'>
                                        <img
                                            src={URL.createObjectURL(thumbnail)}
                                            alt=''
                                        />
                                    </div>
                                    <div className='admin--addProductSidebar__main__form__file__wrapper__progress'>
                                        <div></div>
                                        <span>10% completed</span>
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
                            required
                        />
                    </div>
                    <div className='admin--addProductSidebar__main__form__input'>
                        <label htmlFor=''>Short Description</label>
                        <input
                            type='text'
                            name='shortDescription'
                            placeholder='Description'
                            required
                        />
                    </div>
                    <div className='admin--addProductSidebar__main__form__input'>
                        <label htmlFor=''>Stock</label>
                        <input
                            type='number'
                            name='stock'
                            placeholder='stock'
                            required
                        />
                    </div>
                    <div className='admin--addProductSidebar__main__form__select'>
                        <label htmlFor=''>Stock</label>
                        <select name='unit' id='' required>
                            <option value=''>Kilo Gram (kg)</option>
                            <option value=''>Gram (g)</option>
                            <option value=''>Litre (L)</option>
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
                            required
                        ></textarea>
                    </div>
                    <div className='admin--addProductSidebar__main__form__input'>
                        <label htmlFor=''>Price</label>
                        <input
                            type='number'
                            name='stock'
                            placeholder='Price'
                            required
                        />
                    </div>
                    <div className='admin--addProductSidebar__main__form__select'>
                        <label htmlFor=''>Category</label>
                        <select name='category' id=''>
                            <option value=''>Fish</option>
                            <option value=''>Vegitables</option>
                            <option value=''>Fruits</option>
                        </select>
                    </div>

                    {/* imagesPath */}
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
                </div>
                <div className='admin--addProductSidebar__main__btns'>
                    <button className='admin--addProductSidebar__main__btns__cancel'>
                        Cancel
                    </button>
                    <button className='admin--addProductSidebar__main__btns__add'>
                        Add Product
                    </button>
                </div>
            </form>
        </div>
    );
}

export default AdminAddProductSidebar;
