import React, { useEffect, useState } from 'react';
import { FiUploadCloud } from 'react-icons/fi';
import { useDispatch, useSelector } from 'react-redux';
import {
    ref,
    uploadBytesResumable,
    getDownloadURL,
    getStorage,
} from 'firebase/storage';

import axios from '../../../axios';
import { BtnLoading } from '../../../components/customer';
import { updateUser } from '../../../redux/slices/userSlice';

import './MyAccountDetailsPage.scss';

function MyAccountDetailsPage() {
    const [avatar, setAvatar] = useState('');
    const [avatarState, setAvatarState] = useState({
        error: '',
        progress: 0,
        url: '',
    });
    const [userData, setUserData] = useState({
        fname: '',
        lname: '',
        email: '',
    });
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');

    const { user, token } = useSelector((state) => state.user);
    const dispatch = useDispatch();
    const storage = getStorage();

    const handleChange = (e) => {
        setUserData({ ...userData, [e.target.name]: e.target.value });
    };

    const handleAvatar = (e) => {
        if (e.target.files[0]) {
            setAvatarState((prev) => {
                return { ...prev, error: '' };
            });

            if (!e.target.files[0].name.match(/\.(jpg|jpeg|png)/gm)) {
                setAvatarState((prev) => {
                    return {
                        ...prev,
                        error: 'Please upload jpeg, jpg, or png file',
                    };
                });
                return;
            }
            setAvatar(e.target.files[0]);
            setAvatarState((prev) => {
                return { ...prev, url: '', progress: 0, error: '' };
            });
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
                    setAvatarState((prev) => {
                        return {
                            ...prev,
                            progress: Number(progress).toFixed(0),
                        };
                    });
                }
            },
            (error) => {
                setAvatarState((prev) => {
                    return {
                        ...prev,
                        error: 'something went wrong, try again.',
                    };
                });
            },
            () => {
                getDownloadURL(ref(storage, `images/${image.name}`)).then(
                    (downloadURL) => {
                        setAvatarState((prev) => {
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

            if (avatar && !avatarState.url) {
                setError('Please wait until file is uploaded!');
                return;
            }
            setLoading(true);
            setError('');
            const response = await axios.patch(
                '/users',
                {
                    ...userData,
                    avatar: avatarState.url,
                },
                {
                    headers: { Authorization: `Bearer ${token}` },
                }
            );
            setLoading(false);
            dispatch(updateUser(response.data));
        } catch (err) {
            setError(
                err.response?.data?.error || 'Something went wrong, Try again!'
            );
            setLoading(false);
        }
    };

    useEffect(() => {
        setUserData((prev) => {
            return {
                ...prev,
                fname: user.fname,
                lname: user.lname,
                email: user.email,
            };
        });
        setAvatarState((prev) => {
            return { ...prev, url: user.avatar };
        });
    }, [user]);

    return (
        <form className='myAccountDetailsPage' onSubmit={handleSubmit}>
            <div className='myAccountDetailsPage__file'>
                <label htmlFor=''>Profile Picture</label>
                <div className='myAccountDetailsPage__file__wrapper'>
                    <div className='myAccountDetailsPage__file__wrapper__input'>
                        <input
                            type='file'
                            name='thumbnail'
                            onChange={handleAvatar}
                        />
                        <span>
                            <FiUploadCloud />
                        </span>
                        <h4>Drag your image here</h4>
                        <p>(Only *.jpeg and *.png images will be accepted)</p>
                    </div>
                    {avatarState.error && (
                        <p className='myAccountDetailsPage__file__wrapper__error'>
                            {avatarState.error}
                        </p>
                    )}
                    {(avatar || avatarState.url) && (
                        <div className='myAccountDetailsPage__file__wrapper__img'>
                            <img
                                src={
                                    avatar
                                        ? URL.createObjectURL(avatar)
                                        : avatarState.url
                                }
                                alt=''
                            />
                            {avatar && <span>{avatarState.progress}%</span>}
                        </div>
                    )}
                </div>
            </div>
            <div className='myAccountDetailsPage__input'>
                <label htmlFor=''>First Name</label>
                <input
                    type='text'
                    placeholder='First Name'
                    name='fname'
                    required
                    value={userData.fname || ''}
                    onChange={handleChange}
                />
            </div>
            <div className='myAccountDetailsPage__input'>
                <label htmlFor=''>Last Name</label>
                <input
                    type='text'
                    placeholder='Last Name'
                    name='lname'
                    value={userData.lname || ''}
                    onChange={handleChange}
                />
            </div>
            <div className='myAccountDetailsPage__input'>
                <label htmlFor=''>Email</label>
                <input
                    type='email'
                    placeholder='Email'
                    name='email'
                    required
                    value={userData.email || ''}
                    onChange={handleChange}
                />
            </div>
            {error && <p className='myAccountDetailsPage__error'>{error}</p>}
            <div className='myAccountDetailsPage__submit'>
                <button>{loading ? <BtnLoading /> : 'Update Profile'}</button>
            </div>
        </form>
    );
}

export default MyAccountDetailsPage;
