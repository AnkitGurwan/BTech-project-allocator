import React from 'react';
import { Link } from "react-router-dom";
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const MainPagesHeader = () => {

    const newfunc=()=>{
        localStorage.clear('btpToken');
        toast.success('Logged out successfully', {
            position: toast.POSITION.TOP_CENTER
        });
    };
        
    return(
        <div 
            className='w-full bg-blue-700 text-white flex justify-between items-center py-1 md:px-6'
            style={{'backgroundColor':'#10A19D'}}
        >
            <div class="navbar-brand float-left flex items-center">
              <img 
                class="h-10 md:h-16 w-10 md:w-16" 
                src="https://iitg.ac.in/mech/static/images/logo.png" 
                alt='iitg logo'
            />
                <span className='md:flex'>
                    <div className='text-xs md:text-2xl md:ml-8 font-medium md:font-semibold'>
                        Indian Institute of Technology,
                    </div>
                    <div className='text-xs md:text-2xl md:ml-2 font-medium md:font-semibold'>
                        Guwahati
                    </div>
                </span> 
            </div> 
            
            <span>
                <i className='fa-solid fa-right-from-bracket font-bold text-xs md:text-xl md:mx-1'></i> 
                <Link 
                    className='no-underline hover:bg-red-700 text-white bg-red-600 p-1 rounded-md text-center text-xs md:text-lg font-medium md:font-semibold' 
                    to={'/'} 
                    onClick={newfunc} 
                >
                    LogOut
                </Link>
            </span>
        </div>
)
};
export default MainPagesHeader;