import React from 'react';

import './AboutPage.scss';
import { PageHero, BlankSpace } from '../../../components/customer';
import {
    about10Img,
    about11Img,
    about1Img,
    about2Img,
    about3Img,
    about4Img,
    about5Img,
    about6Img,
    about7Img,
    about8Img,
    about9Img,
} from '../../../assets/images';
import { Link } from 'react-router-dom';

function AboutPage() {
    console.log('about page');
    return (
        <div>
            <PageHero title='About' />
            <BlankSpace />
            <div className='aboutPage'>
                <div className='aboutPage__blog'>
                    <div className='aboutPage__blog__item'>
                        <Link to='/'>
                            <img src={about1Img} alt='' />
                        </Link>
                        <Link to='/'>
                            <h3>Who We Are</h3>
                        </Link>
                        <p>
                            Lorem ipsum dolor sit amet, consectetur adipisicing
                            elit, sed do eiusmod tempor incididunt ut labore et
                            dolore magna aliqua.
                        </p>
                    </div>
                    <div className='aboutPage__blog__item'>
                        <Link to='/'>
                            <img src={about2Img} alt='' />
                        </Link>
                        <Link to='/'>
                            <h3>Our Products</h3>
                        </Link>
                        <p>
                            Lorem ipsum dolor sit amet, consectetur adipisicing
                            elit, sed do eiusmod tempor incididunt ut labore et
                            dolore magna aliqua.
                        </p>
                    </div>
                    <div className='aboutPage__blog__item'>
                        <Link to='/'>
                            <img src={about3Img} alt='' />
                        </Link>
                        <Link to='/'>
                            <h3>How We Work</h3>
                        </Link>
                        <p>
                            Lorem ipsum dolor sit amet, consectetur adipisicing
                            elit, sed do eiusmod tempor incididunt ut labore et
                            dolore magna aliqua.
                        </p>
                    </div>
                </div>
                <div className='aboutPage__features'>
                    <h5 className='aboutPage__features__sub-title'>
                        Our products
                    </h5>
                    <h2 className='aboutPage__features__title'>
                        Highest Quality
                    </h2>
                    <div className='aboutPage__features__list'>
                        <div>
                            <div className='aboutPage__features__list__item'>
                                <img src={about6Img} alt='' />
                                <div className='aboutPage__features__list__item__content'>
                                    <h3>Handmade</h3>
                                    <p>
                                        Made with passion by 300+ curators
                                        across the country.
                                    </p>
                                </div>
                            </div>
                            <div className='aboutPage__features__list__item'>
                                <img src={about7Img} alt='' />
                                <div className='aboutPage__features__list__item__content'>
                                    <h3>100% Natural</h3>
                                    <p>
                                        Eat local, consume local, closer to
                                        nature.
                                    </p>
                                </div>
                            </div>
                            <div className='aboutPage__features__list__item'>
                                <img src={about8Img} alt='' />
                                <div className='aboutPage__features__list__item__content'>
                                    <h3>Curated Products</h3>
                                    <p>
                                        Eat local, consume local, closer to
                                        nature.
                                    </p>
                                </div>
                            </div>
                        </div>
                        <div className='aboutPage__features__list__middle'>
                            <img
                                src={about4Img}
                                alt=''
                                className='aboutPage__features__list__middle__mainImg'
                            />
                            <img
                                src={about5Img}
                                alt=''
                                className='aboutPage__features__list__middle__qualityImg'
                            />
                        </div>
                        <div>
                            <div className='aboutPage__features__list__item'>
                                <img src={about9Img} alt='' />
                                <div className='aboutPage__features__list__item__content'>
                                    <h3>Modern Farm</h3>
                                    <p>
                                        Made with passion by 300+ curators
                                        across the country.
                                    </p>
                                </div>
                            </div>
                            <div className='aboutPage__features__list__item'>
                                <img src={about10Img} alt='' />
                                <div className='aboutPage__features__list__item__content'>
                                    <h3>Alway Fresh</h3>
                                    <p>
                                        Eat local, consume local, closer to
                                        nature.
                                    </p>
                                </div>
                            </div>
                            <div className='aboutPage__features__list__item'>
                                <img src={about11Img} alt='' />
                                <div className='aboutPage__features__list__item__content'>
                                    <h3>Sustainable</h3>
                                    <p>
                                        Chemical free consumption IN and ON your
                                        body.
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <BlankSpace />
        </div>
    );
}

export default AboutPage;
