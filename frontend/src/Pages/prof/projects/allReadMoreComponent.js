import React, { useContext, useEffect } from "react";
import { useParams, Link } from 'react-router-dom';
import ProjectContext from '../../../context/project/ProjectContext.js';
import ProjectCardSpecific from "./projectcardAllReadMore.js";
import { useSelector } from 'react-redux';

const SpecificProjectCard = () => {
  const { allProjects } = useContext(ProjectContext);
  const items = useSelector(state => state.allProjects.allProjects);

  const getItem = async () => {
    await allProjects();
  }

  useEffect(() => {
    getItem();
  }, []);

  const params = useParams();
  const id = params.id;

  return (
    <div className='readmorepage2'>
      <div className="flex p-3">
        <Link to={`/btp/prof/all/projects`}><i class="fa-sharp fa-solid fa-arrow-left fa-lg text-xl md:text-2xl"></i></Link>
      </div>
      <div className='allprojectsdivread mt-2 px-[5%] md:px-[10%]'>
        {items && items.length > 0 && items.filter((project) => project._id === id).map((projects, i) => {
          return (<ProjectCardSpecific key={i} project={projects} />)
        })}
      </div>
    </div>
  );
};

export default SpecificProjectCard;
