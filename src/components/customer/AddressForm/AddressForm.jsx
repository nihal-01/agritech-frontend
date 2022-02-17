import React from 'react';

import './AddressForm.scss';
import { states } from '../../../utils/constants';

function AddressForm({ setAddress, address }) {
    const handleChange = (e) => {
        setAddress((prev) => {
            return { ...prev, [e.target.name]: e.target.value };
        });
    };

    return (
        <div className='addressForm'>
            <h3 className='addressForm__title'>Billing details</h3>
            <div className='addressForm__form'>
                <div className='addressForm__form__names'>
                    <div className='addressForm__form__input'>
                        <label htmlFor='fname'>
                            First Name <span>*</span>
                        </label>
                        <input
                            type='text'
                            name='fname'
                            id='fname'
                            required
                            placeholder='John'
                            onChange={handleChange}
                            value={address?.fname || ''}
                        />
                    </div>
                    <div className='addressForm__form__input'>
                        <label htmlFor='lname'>Last Name</label>
                        <input
                            type='text'
                            name='lname'
                            id='lname'
                            placeholder='Smith'
                            onChange={handleChange}
                            value={address?.lname || ''}
                        />
                    </div>
                </div>
                <div className='addressForm__form__select'>
                    <label htmlFor='country'>
                        Country / Region <span>*</span>
                    </label>
                    <select
                        name='country'
                        id='country'
                        required
                        onChange={handleChange}
                        value={address?.country || ''}
                    >
                        <option value='' hidden>
                            Select Country
                        </option>
                        <option value='india'>India</option>
                    </select>
                </div>
                <div className='addressForm__form__input'>
                    <label htmlFor='streetAddress'>
                        Street address <span>*</span>
                    </label>
                    <input
                        type='text'
                        name='streetAddress'
                        id='streetAddress'
                        required
                        placeholder='House name and postal name'
                        onChange={handleChange}
                        value={address?.streetAddress || ''}
                    />
                </div>
                <div className='addressForm__form__input'>
                    <label htmlFor='city'>
                        Town / City <span>*</span>
                    </label>
                    <input
                        type='text'
                        name='city'
                        id='city'
                        required
                        placeholder='Calicut'
                        onChange={handleChange}
                        value={address?.city || ''}
                    />
                </div>
                <div className='addressForm__form__select'>
                    <label htmlFor='state'>
                        State <span>*</span>
                    </label>
                    <select
                        name='state'
                        id='state'
                        required
                        onChange={handleChange}
                        value={address?.state || ''}
                    >
                        <option value='' hidden>
                            Select State
                        </option>
                        {states.map((state, index) => {
                            return (
                                <option value={state} key={index}>
                                    {state}
                                </option>
                            );
                        })}
                    </select>
                </div>
                <div className='addressForm__form__input'>
                    <label htmlFor='pincode'>
                        Pincode <span>*</span>
                    </label>
                    <input
                        type='number'
                        name='pincode'
                        id='pincode'
                        required
                        placeholder='673574'
                        onChange={handleChange}
                        value={address?.pincode || ''}
                    />
                </div>
                <div className='addressForm__form__input'>
                    <label htmlFor='phone'>
                        Phone Number <span>*</span>
                    </label>
                    <input
                        type='number'
                        name='phone'
                        id='phone'
                        required
                        placeholder='Phone number'
                        onChange={handleChange}
                        value={address?.phone || ''}
                    />
                </div>
                <div className='addressForm__form__input'>
                    <label htmlFor='email'>
                        Email Address <span>*</span>
                    </label>
                    <input
                        type='email'
                        name='email'
                        id='email'
                        required
                        placeholder='Email Address'
                        onChange={handleChange}
                        value={address?.email || ''}
                    />
                </div>
            </div>
        </div>
    );
}

export default AddressForm;
