import React from 'react';
import { Link } from 'react-router-dom';

const Body = () => {
    return(
        <div className='bodymaindiv'>
            <div className='bodydiv1'>
                <Link to="/login" className='bodya'>
                    Professorr
                </Link>
            </div>
            <div className='bodydiv2'>
                <Link to="/studentlogin" className='bodya'>
                    Student
                </Link>
            </div>
        </div> 
    )
}
export default Body;