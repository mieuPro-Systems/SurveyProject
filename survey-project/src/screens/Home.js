import React from 'react';
import Navbar from '../components/navbar';
import "../App.css"
import Card from '../components/card';

const Home = () => {
    return (
        <div className='app'>
            <div className='row'>
                <div className='col-11'>
                    <Navbar />
                    <div>
                        <p className='text1'>Farming is a Profession of Hope..!!</p>
                        {/* <p className='text2'>Profession of Hope</p> */}
                        {/* <p className='text3'>Hope</p> */}
                    </div>
                    <div>
                        <Card />
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Home