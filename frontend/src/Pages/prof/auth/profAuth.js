import React, { useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Header from '../../../components/interfacePageHeader';
import Proflogin from './loginComponent.js';

const ProfAuth = () => {
    return (
        <div className='h-screen bg-gray-200'>
            <div className='h-[20%]'>
                <Header />
            </div>
            <div className='h-[80%]'>
                <Link to={`/`}>
                    <i className="fa-sharp fa-solid fa-arrow-left mx-2 md:mx-4 mt-3 md:mt-5 text-2xl md:text-3xl p-2"/>
                </Link>
                <Proflogin />
            </div>
        </div>
    );
};

export default ProfAuth;
