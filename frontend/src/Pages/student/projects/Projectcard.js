import React from 'react';
import { Link } from 'react-router-dom';


const Projectcard = (props) => {
    const {project} = props;
   
    return(
        <div className='mx-auto font-Manrope'>
            <div className="border-2 rounded-lg bg-gray-100">
                <div className="text-center py-3 w-full ">
                    <div className="px-2 break-words text-sm font-semibold md:text-lg tracking-normal leading-4 md:leading-5">
                        {project.title.slice(0,40)}...
                    </div>
                    <hr/>
                    <h5 className="text-xs md:text-sm text-muted text-center">
                        {project.co_supervisor}
                        <h6 className='text-xs md:text-sm text-center'>
                            (co-supervisor)
                        </h6>
                    </h5>
                    
                    <p className="pb-0 md:pb-4 text-xs md:text-sm px-2 pt-2 text-center">
                        {project.brief_abstract.slice(0,120)}
                        <Link 
                            to={project._id} 
                            className='no-underline px-1 font-medium'
                        >
                            ...read more
                        </Link>
                    </p>
                    <p className="text-xs md:text-sm pb-1 flex-col items-center">
                        <h6 className='m-0 text-xs md:text-sm font-medium'>
                            Specialization
                        </h6>
                        <div className='text-xs md:text-sm pb-0'>
                            {project.specialization}
                        </div>
                    </p>
                    <h6 className="text-xs md:text-sm pb-1 text-center">
                        {project.creation_date} 
                    </h6>
                    <h6 className="text-xs md:text-sm pb-1 text-center">
                        {project.creation_time} 
                    </h6>
                    <Link className='mr-3 mt-1' to={project._id}>
                        <span className="material-symbols-outlined">group_add</span>
                    </Link>   
                </div>
            </div>
        </div>
    )}

export default Projectcard;