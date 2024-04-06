import React, { useContext, useEffect } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import ProjectContext from '../../../context/project/ProjectContext';
import AuthContext from '../../../context/auth/AuthContext';

function Projectcard(props) {
  const { project } = props;
  const { deleteProject } = useContext(ProjectContext);
  const navigate = useNavigate();
  const { ownerdetails } = useContext(AuthContext);
  const params = useParams();
  const id = params.id;

  useEffect(() => {
    const getItem = async () => {
      await ownerdetails(id);
    }
    getItem();
  }, [id, ownerdetails]);

  const clickHandler = async (e) => {
    e.preventDefault();
    const x = await deleteProject(id);
    if (x === 200) {
      navigate('/owner');
      toast.success('Deleted successfully', {
        position: toast.POSITION.TOP_CENTER
      });
    } else if (x === 403) {
      navigate('');
      toast.error('You cannot delete projects of others', {
        position: toast.POSITION.TOP_CENTER
      });
    }
  }

  return (
    <div className='w-full py-2 font-Manrope'>
      <div className="px-6 py-3 rounded-lg border-4 bg-gray-100" style={{ "width": "auto", "height": "auto" }}>
        <div className="card-body" style={{ "display": "flex", "flexDirection": "column", "alignItems": "start" }}>
          <h4 className="card-title p-2 mb-2 rounded-sm bg-gray-300"><i className="fa-solid fa-book text-md" style={{ "backgroundColor": "transparent", "paddingRight": "0.5rem" }}></i>{project.title}</h4>

          <h4 className="text-muted text-sm mb-0 pb-0" style={{}}><i className="fa-solid fa-user text-sm" style={{ "backgroundColor": "transparent", "paddingRight": "0.5rem" }}></i>{project.co_supervisor}<h6 className='text-sm'>(co-supervisor)</h6></h4>
          <hr className='w-full' />
          <p className='text-start text-sm my-0'>{project.brief_abstract}</p>
          <hr className='w-full' />
          <div className="flex flex-col"><h5 className='flex items-center mb-0'><span className="material-symbols-outlined pr-1">
            school
          </span><div className='text-sm m-0 '>Specialisation</div></h5><div className='text-sm pl-2'>{project.specialization}</div></div>
          <h6 className="card-title text-sm">Created on {project.creation_date} </h6>
          <h6 className="card-title pb-0 text-sm">Created at {project.creation_time} </h6>
          <button id="myBtn" className='projectcardlink22'>Delete</button>
        </div>
      </div>
      {/* modal */}

      <div id="myModal" className="modal">
        <div className="modal-content">
          <span className="close">&times;</span>
          <p className='modalp'>Are you sure you want to delete? <Link className='projectcardlink22a' onClick={clickHandler}>Delete</Link></p>
        </div>
      </div>

    </div>
  );
}

export default Projectcard;
