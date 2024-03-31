import React from 'react';

function Ownerprojectcard(props){
    const {detail}=props;
   
    return(
    <div className='w-full mx-auto bg-gray-100' style={{'fontFamily':'Manrope'}}>
        <div class="py-1 flex items-start ml-0 mr-4 rounded ">
            <div class="flex flex-col items-start md:flex-row px-4 py-1">
                <div class="font-Manrope md:font-bold text-sm md:text-xl items-center my-auto md:pr-6">Project Supervisor :-</div>
                <div class="text-muted font-medium text-sm md:text-xl flex items-center justify-center my-auto pr-4 pt-1 md:pt-0 capitalize">
                    <i class="fa-solid fa-user text-md pr-2"></i>
                    {detail.name}
                </div>
                <div class="text-muted font-medium text-sm md:text-xl flex items-center justify-center my-auto pt-1 md:pt-0">
                    <i class="fa-solid fa-envelope pr-2 pt-1"></i>
                    {detail.email}
                </div>
            </div>
        </div>
    </div>
)};
export default Ownerprojectcard