import React from 'react';

function ProjectCard(props) {
  const { project } = props;

  return (
    <div className='projectcardmaindivv'>
      <div className="px-2 rounded-lg border-4 bg-gray-100" style={{ width: "auto", height: "auto" }}>
        <div className="card-body" style={{ display: "flex", flexDirection: "column", alignItems: "start", padding: "1rem" }}>
          <h2 className="card-title pb-2"><i className="fa-solid fa-book text-lg" style={{ backgroundColor: "transparent", paddingRight: "0.5rem" }}></i>{project.title}</h2>

          <h4 className="card-subtitle text-muted text-lg" style={{}}><i className="fa-solid fa-user text-lg" style={{ backgroundColor: "transparent", paddingRight: "0.5rem" }}></i>{project.co_supervisor}<h6 className='text-sm'>(co-supervisor)</h6></h4>
          <hr className='w-full' />
          <div className='text-start pl-1'>{project.brief_abstract}</div>
          <hr className='w-full' />
          <div className="card-text pb-2" style={{ display: "flex", flexDirection: "column", alignItems: "start" }}><h5 className='flex items-center mb-1'><span className="material-symbols-outlined pr-1">
            school
          </span><div className='text-lg m-0 p-0'>Specialisation</div></h5><div className='pl-2'>{project.specialization}</div></div>
          <h6 className="card-title text-sm pb-1">Created on {project.creation_date} </h6>
          <h6 className="card-title pb-0 text-sm">Created at {project.creation_time} </h6>
        </div>
      </div>
    </div>
  );
}

export default ProjectCard;
