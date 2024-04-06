import React from 'react';
import { Link } from 'react-router-dom';

const ownerProjectcard = (props) => {
    const { project, idtoken } = props;

    return (
        <div className='mx-auto' style={{ fontFamily: 'Raleway' }}>
            <div className="border-2 projectcardmaindiv rounded-lg bg-gray-100">
                <div className="card-body text-center py-3 w-full">
                    <div className="px-2 break-words text-sm font-semibold md:text-lg tracking-normal leading-4 md:leading-5">
                        {project.title.slice(0, 40)}...
                    </div>
                    <hr />
                    <h5 className="card-subtitle text-xs md:text-sm text-muted" style={{ textAlign: "center" }}>
                        {project.co_supervisor}
                        <h6 className='text-xs md:text-sm' style={{ textAlign: "center" }}>(co-supervisor)</h6>
                    </h5>

                    <p className="card-text pb-0 md:pb-4 text-xs md:text-sm px-2 pt-2" style={{ textAlign: "center" }}>
                        {project.brief_abstract.slice(0, 120)}
                        <Link to={project._id} className='no-underline px-1 font-medium'>...read more</Link>
                    </p>

                    <div className="card-text text-xs md:text-sm pb-1" style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
                        <h6 className='m-0 text-xs md:text-sm font-medium'>Specialization</h6>
                        <div className='text-xs md:text-sm pb-0'>{project.specialization}</div>
                    </div>

                    <h6 className="card-title text-xs md:text-sm pb-1" style={{ textAlign: "center" }}>
                        {project.creation_date}
                    </h6>

                    <h6 className="card-title text-xs md:text-sm pb-1" style={{ textAlign: "center" }}>
                        {project.creation_time}
                    </h6>

                    <div className='projectcardupdate'>
                        <Link className='projectcardlink1 mr-3 mt-1' to={project._id} state={{ idtoken: idtoken }}>
                            <span className="material-symbols-outlined">group_add</span>
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default ownerProjectcard;
