import React from 'react';
import { BiPhoneCall } from 'react-icons/bi';
import {
    BsFacebook,
    BsYoutube,
    BsTwitter,
    BsInstagram,
    BsArrowRight,
} from 'react-icons/bs';
import { Link } from 'react-router-dom';

import './Footer.scss';
import { BlankSpace } from '..';
import { paymentCardsImg } from '../../../assets/images';
import { useSelector } from 'react-redux';

function Footer() {
    const { categories } = useSelector((state) => state.categories);

    return (
        <>
            <BlankSpace />
            <footer className='footer__wrapper'>
                <div className='footer'>
                    <div className='footer__top'>
                        <div className='footer__top__contact'>
                            <BiPhoneCall />
                            <div className='footer__top__contact__number'>
                                <h2>CALL US 24/7</h2>
                                <a href='tel:+918899776655'>(+91)-8899776655</a>
                            </div>
                        </div>
                        <div className='footer__top__social'>
                            <h2>FOLLOW US</h2>
                            <div className='footer__top__social__icons'>
                                <a
                                    target='_blank'
                                    rel='noreferrer'
                                    href='https://www.facebook.com/'
                                >
                                    <BsFacebook />
                                </a>
                                <a
                                    target='_blank'
                                    rel='noreferrer'
                                    href='https://www.youtube.com/'
                                >
                                    <BsYoutube />
                                </a>
                                <a
                                    target='_blank'
                                    rel='noreferrer'
                                    href='https://twitter.com/'
                                >
                                    <BsTwitter />
                                </a>
                                <a
                                    target='_blank'
                                    rel='noreferrer'
                                    href='https://www.instagram.com/'
                                >
                                    <BsInstagram />
                                </a>
                            </div>
                        </div>
                        <div className='footer__top__payments'>
                            <img src={paymentCardsImg} alt='' />
                        </div>
                    </div>
                    <hr />
                    <div className='footer__middle'>
                        <div className='footer__middle__location'>
                            <h2>STORE LOCATION</h2>
                            <p>4709 Shadowmar Drive, Kenner, LA 70062</p>
                            <a href='mailto:contact@agritech.com'>
                                contact@agritech.com
                            </a>
                        </div>
                        <div className='footer__middle__information'>
                            <h2>INFORMATION</h2>
                            <ul className='footer__middle__information__list'>
                                <li>
                                    <Link to='/about'>About us</Link>
                                </li>
                                <li>
                                    <Link to='/blog'>Blog</Link>
                                </li>
                                <li>
                                    <Link to='/contact'>Contact</Link>
                                </li>
                            </ul>
                        </div>
                        <div className='footer__middle__account'>
                            <h2>MY ACCOUNT</h2>
                            <ul className='footer__middle__account__list'>
                                <li>
                                    <Link to='/my-account'>My Account</Link>
                                </li>
                                <li>
                                    <Link to='/contact'>Contact</Link>
                                </li>
                                <li>
                                    <Link to='/cart'>Shopping Cart</Link>
                                </li>
                                <li>
                                    <Link to='/shop'>Shop</Link>
                                </li>
                            </ul>
                        </div>
                        <div className='footer__middle__categories'>
                            <h2>CATEGORIES</h2>
                            <ul className='footer__middle__categories__list'>
                                {categories.map((category, index) => {
                                    return (
                                        <li key={index}>
                                            <Link
                                                to={`/products/category/${category.name}`}
                                            >
                                                {category.name}
                                            </Link>
                                        </li>
                                    );
                                })}
                            </ul>
                        </div>
                        <div className='footer__middle__subscribe'>
                            <h2>SUBSCRIBE US</h2>
                            <p>Subscribe to get Offers and other updates.</p>
                            <div className='footer__middle__subscribe__inp'>
                                <input
                                    type='email'
                                    placeholder='Email address...'
                                />
                                <button>
                                    <BsArrowRight />
                                </button>
                            </div>
                        </div>
                    </div>
                    <hr />
                    <div className='footer__bottom'>
                        <p>
                            Copyright © {new Date().getFullYear()}{' '}
                            <Link to='/'>Agritech</Link>. All Rights Reserved.
                        </p>
                    </div>
                </div>
            </footer>
        </>
    );
}

export default Footer;
