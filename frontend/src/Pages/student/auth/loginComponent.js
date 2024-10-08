import React, { useContext } from 'react';
import AuthContext from '../../../context/auth/AuthContext';

const StudentAuth = () => {
    const { StudentMicrosoftLogin } = useContext(AuthContext);

    const clickHandler = async () => {
        await StudentMicrosoftLogin();
    };

    return (
        <div className="w-full flex flex-col md:flex-row h-full">
            <div className="px-6 md:px-20 lg:px-40 w-full">
                <div className='pb-4 text-gray-900'  style={{"fontFamily":"Manrope"}}>
                    <p className="text-xl md:text-2xl font-normal uppercase pt-2 text-gray-800">BTP Phase I - <b>Student login</b></p>
                    <p className="text-sm md:text-lg text-gray-800 leading-5">NOTE - Kindly refrain from login if you are not a Btech'22 Mechanical Engineering student.</p>
                    <div
                        class = "w-3/4 md:w-1/2 lg:w-1/3 h-16 md:h-12 px-2 md:px-0 mt-10 text-white hover:opacity-80 flex justify-center items-center rounded-md cursor-pointer font-medium select-none"
                        style={{"background-color": "#3b5998"}}
                        onClick={clickHandler}>
                        <i class="fa-brands fa-windows text-2xl my-auto mx-3"></i>
                        Student Sign-In with Microsoft
                    </div>
                </div>
            </div>
        </div>
    );
};

export default StudentAuth;