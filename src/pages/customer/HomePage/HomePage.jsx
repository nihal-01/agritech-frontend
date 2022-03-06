import React from 'react';
import { BlankSpace, Hero } from '../../../components/customer';
import OurProducts from '../../../components/customer/OurProducts/OurProducts';

function HomePage() {
    return (
        <div className='homePage-wrapper'>
            <Hero />
            <BlankSpace />
            <div className='homePage'>
                <OurProducts />
            </div>
        </div>
    );
}

export default HomePage;
