import React, { useContext } from 'react';
import AuthContext from '../../../context/auth/AuthContext';

const StudentAuth = () => {
    const { MicrosoftLogin } = useContext(AuthContext);

    const clickHandler = async () => {
        await MicrosoftLogin();
    };

    return (
        <div className="flex justify-center mx-4 mt-8 md:mt-0">
            <div className='w-full md:w-1/3 mx-auto shadow-lg flex flex-col items-center justify-center p-4'>
                <div className="text-lg md:text-xl text-center" style={{'fontFamily':'Manrope','fontWeight':'900'}}>Click on Login to continue</div>
                <br/>
                <div className="w-full flex justify-center p-1 md:p-3">
                    <button
                        id="myButton"
                        className="bsk-btn w-3/4 md:w-2/3 flex justify-center items-center p-1 md:p-2 rounded bsk-btn-default bg-green-600 hover:bg-green-700 text-white "
                        onClick={clickHandler}
                    >
                        <i className="fa-brands fa-windows text-2xl p-2 my-auto mx-2"></i>
                        <h5 className="p-1 my-auto text-center text-sm md:text-lg">Microsoft Login</h5>
                    </button>
                </div>
            </div>
        </div>
    );
};

export default StudentAuth;