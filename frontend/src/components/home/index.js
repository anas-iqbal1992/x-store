import React from 'react';
import Banner from './Banner';
import Products from './Products';
const Home = () => {
    return (
        <div className='col-lg-12'>
            <div className='row'>
                <div className='col-lg-12'>
                    <Banner />
                </div>
            </div>
            <div className='row'>
                <div className='col-lg-12'>
                    <Products />
                </div>
            </div>
        </div>
    )
}
export default Home;