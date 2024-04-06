import React from 'react';
import Allprojects from './ownerProjectsComponent.js';
import Header from '../../../components/mainPagesHeader.js';


const OwnerProjectPage = () => {
    return(
        <div className='w-full h-full'>
            <Header/>
            <Allprojects/>
        </div>
    )
}

export default OwnerProjectPage;