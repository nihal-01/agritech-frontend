import React from 'react';

import './ContactPage.scss';
import { PageHero, BlankSpace } from '../../../components/customer';
import { contactImg } from '../../../assets/images';

function ContactPage() {
    console.log('contact page');
    return (
        <div>
            <PageHero title='Contact' />
            <BlankSpace />
            <div className='contactPage'>
                <div className='contactPage__img'>
                    <img src={contactImg} alt='' />
                </div>
                <div className='contactPage__main'>
                    <h2 className='contactPage__main__title'>
                        We Love to Hear From You
                    </h2>
                    <p className='contactPage__main__desc'>
                        Lorem ipsum dolor sit amet, consectetur adipisicing
                        elit, sed do eiusmod tempor incididunt ut labore et
                        dolore magna aliqua. Ut enim ad minim veniam, quis
                        nostrud exercitation ullamco laboris nisi ut aliquip ex
                        ea commodo consequat. Duis aute irure dolor in
                        reprehenderit in voluptate.
                    </p>
                    <div className='contactPage__main__info'>
                        <div className='contactPage__main__info__left'>
                            <h3>OUR STORE</h3>
                            <p>
                                Box 565, Charlestown, Nevis, <br />
                                West Indies,Caribbean
                            </p>
                            <br />
                            <h3>CONTACT INFORMATION</h3>
                            <p>
                                (844) 1800-3355 <br />
                                info@example.com
                            </p>
                        </div>
                        <div className='contactPage__main__info__right'>
                            <h3>OUR BUSINESS HOURS</h3>
                            <p>
                                Monday - Friday: <br />
                                <span>8am - 4pm</span> <br />
                                Saturday, Sunday: <br />
                                <span>9am - 5pm</span>
                            </p>
                        </div>
                    </div>
                    <hr />
                    <form className='contactPage__main__form'>
                        <h2 className='contactPage__main__title'>
                            Leave A Message
                        </h2>
                        <input type='text' placeholder='Your Name' />
                        <input type='email' placeholder='Email' />
                        <input type='text' placeholder='Subject' />
                        <textarea
                            name=''
                            id=''
                            cols='30'
                            rows='10'
                            placeholder='Message'
                        ></textarea>
                        <button type='submit'>Submit</button>
                    </form>
                </div>
            </div>
            <BlankSpace />
        </div>
    );
}

export default ContactPage;
