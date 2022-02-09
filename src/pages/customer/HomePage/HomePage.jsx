import React from 'react';
import { BlankSpace, Hero } from '../../../components/customer';

function HomePage() {
    console.log('Home page');
    return (
        <div className='homePage-wrapper'>
            <Hero />
            <BlankSpace />
            <div className='homePage'>
                <div>
                    <div></div>
                    <div></div>
                    <div></div>
                    <div></div>
                </div>
            </div>
        </div>
    );
}

export default HomePage;
