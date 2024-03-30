import React from 'react';
import { Link } from 'react-router-dom';
import Header from '../components/interfacePageHeader';

const Body = () => {
    return(
        <div className='h-screen'>
            <div className='h-[20%]'>
                <Header />
            </div>
            <div className='h-[80%]'>
                <Link 
                    to='/proflogin' 
                    className='' 
                    style={{backgroundImage:'https://www.iconbunny.com/icons/media/catalog/product/1/5/156.12-male-student-i-icon-iconbunny.jpg'}}
                >
                    Professor
                </Link>
                <Link 
                    to='/studentlogin' 
                    className=''
                >
                    Student
                </Link>
            </div> 
        </div>
    )
}
export default Body;