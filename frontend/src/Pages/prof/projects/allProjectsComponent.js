import React, { useContext, useEffect, useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import ProjectContext from '../../../context/project/ProjectContext';
import ProfContext from '../../../context/prof/ProfContext';
import ProjectCard from './allProjectCard';

import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useSelector } from 'react-redux';

const OwnerProjectsComponent = () => {
  const { allProjects, createProject} = useContext( ProjectContext );
  const { getProfDetailsFromMicrosoft } = useContext(ProfContext);
  const [mobileMenu, setMobileMenu] = useState(false);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  
  const navigate = useNavigate();
  const [count, setCount] = useState(0);


  const items = useSelector((state) => state.allProjects.allProjects);

  const getItem = async () => {

    const x = await allProjects();

    if (x === 200) setLoading(false);
    else {
      toast.error('Your session has expired, please login again.', {
        position: 'top-center'
      });
      navigate(`/btp/prof`);
    }
  };

  useEffect(() => {
    getItem();
    document.body.classList.add("disable-scrolling");
  }, []);

  const [search, setSearch] = useState("");

  const detectChanges = async (e) => {
    setSearch(e.target.value);
  };

  const [itemData, setItemData] = useState({
    title: "",
    abstract: "",
    cosupervisor: "",
    specialization: "",
    date: "",
    time: "",
    isbanned: false
  });

  const onChangeHandler = (e) => {
    setItemData({ ...itemData, [e.target.name]: e.target.value });
  };

  const submit = async (e) => {
    setLoading(true);
    e.preventDefault();
    setCount(count + 1);
    const x = await createProject(
      itemData.title,
      itemData.abstract,
      itemData.cosupervisor,
      itemData.specialization,
      itemData.date,
      itemData.time,
      itemData.isbanned
    );

    if (x === 200) {
      setItemData({
        title: "",
        abstract: "",
        cosupervisor: "",
        specialization: "",
        date: "",
        time: "",
        isbanned: false
      });
      setLoading(false);
      getItem();

      toast.success('Project created successfully', {
        position: toast.POSITION.TOP_CENTER
      });

      const modal = document.getElementById("myModal");
          modal.style.display = "none";
        }
      };

  const download = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem('btpToken');
    window.open(
      `${process.env.REACT_APP_BACKEND_URL}/project/interestedpeople/${token}`,
      '_blank'
    );
  };
  
  return (
    <div class="w-full overflow-x-hidden">
      <div class="w-full text-left">
        <nav class="shadow-md">
          <div class="mx-auto p-2">
            <div class="flex items-center justify-between h-16">
              <div class="flex items-center justify-start">
                <div className="flex items-center justify-start gap-2 px-2">
                    <i className="fas fa-search text-xl pr-2 h-full" />
                    <div className="form-outline">
                        <input
                            id="search-input"
                            type="search"
                            className="outline-none border rounded-md p-2"
                            name='search'
                            placeholder="Search by Title name"
                            value={search}
                            onChange={detectChanges}
                            style={{
                            width: "30vw",
                            textAlign: "start",
                            }}
                        />
                    </div>
                </div>
              </div>
              <div class="absolute inset-y-0 right-0 hidden md:flex items-center pr-2 sm:static sm:inset-auto sm:ml-6 sm:pr-0">
                <Link
                  to={`/btp/prof/owner/projects`}
                  class=" px-3 py-2 rounded-md text-xl "
                  style={{ textDecoration: 'none' }}
                >
                  <i
                    class="fa-solid fa-user text-md"
                    style={{ backgroundColor: 'transparent', paddingRight: '0.5rem' }}
                  ></i>
                  My Projects
                </Link>
                <div
                  class="text-gray-800 px-3 py-2 no-underline rounded-md text-xl font-x-large font-bold"
                >
                  All Projects
                </div>
              </div>
              {mobileMenu 
              ?
               (
                <div className="flex md:hidden" onClick={() => setMobileMenu(false)}>
                  <div class="material-symbols-outlined text-black text-xl ml-12 mr-2">cancel</div>
                </div>
              ) : (
                <div className="flex md:hidden" onClick={() => setMobileMenu(true)}>
                  <div class="material-symbols-outlined text-black text-xl ml-12 mr-2">menu_open</div>
                </div>
              )}
              {mobileMenu && (
                <div className="flex flex-col md:hidden mt-12 z-10 border bg-white px-4 top-4 rounded-sm fixed left-8 cursor-pointer ">
                  <Link
                    to={`/btp/prof/owner/projects`} className="text-gray-700 no-underline py-2 text-lg border-b">
                      My Projects
                    </Link>
                  
                    <div className="text-gray-600 hover:text-gray-700 text-lg py-2 border-b no-underline font-bold ">
                      All projects
                    </div>
                </div>
              )}
            </div>
          </div>
        </nav>


        {loading ? (
          <div class="flex items-center justify-center h-screen">
            <div class="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-gray-900"></div>
          </div>
        ) : (
          <div>
            
            <div className="grid grid-cols-2 gap-2 md:gap-4 pt-4 pb-2 px-2 md:px-6 md:grid-cols-3 lg:grid-cols-5">
              {items
                .filter(projects => {
                  return search.toString().toLowerCase() === ''
                    ? projects
                    : projects.title.toLowerCase().includes(search.toLocaleLowerCase());
                })
                .map((project, i) => {
                  return <ProjectCard key={i} project={project} />;
                })}
            </div>

            <div
              class="_feedback_container_1ob32_125 pl-4 md:pl-24 lg:pl-48"
              style={{
                height: '15vh',
                width: '100vw',
                margin: 'auto',
                display: 'flex',
                alignItems: 'center',
                backgroundColor: 'whitesmoke',
              }}
            >
              <svg
                style={{ height: '30px', paddingRight: '10px' }}
                class="MuiSvgIcon-root _add__comment_1ob32_146"
                focusable="false"
                viewBox="0 0 24 24"
                aria-hidden="true"
              >
                <path
                  d="M22 4c0-1.1-.9-2-2-2H4c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h14l4 4V4zm-2 13.17L18.83 16H4V4h16v13.17zM13 5h-2v4H7v2h4v4h2v-4h4V9h-4z"
                ></path>
              </svg>
              <p
                class="_para__feedback_1ob32_130 text-xs md:text-sm lg:text-lg flex-wrap"
                style={{
                  marginBottom: '0.5vw',
                  display: 'flex',
                  alignContent: 'center',
                }}
                hover={{ textDecoration: 'underline' }}
              >
                We value your opinion, please take a moment to fill out our{' '}
                <Link
                  className="px-1 "
                  to={`/proffeedback`}
                  style={{ textDecoration: 'none' }}
                >
                  feedback form
                </Link>{' '}
                to help us improve.
              </p>
            </div>
          </div>
        )}
      </div>
            

        {/* modal on new project */}
        {/* modal on new project */}
        {showModal
          ?
          <div id="myModal" className="z-10 absolute top-[2%] flex justify-center items-center w-full h-full backdrop-blur-50">
            <div className="px-4 pb-2 rounded-md bg-white w-1/2 border border-gray-300 border-opacity-40 shadow-md">
              <span 
                className="pt-1 pr-2 text-4xl flex justify-end"
              >
                <div className='cursor-pointer text-gray-600' onClick={() => {setShowModal(false)}}>&times;</div>
              </span>
              <form class="w-full mx-auto px-4 md:px-8 mb-3" onSubmit={submit}>
                <div class="mb-3">
                  <label class="text-gray-600 font-bold mb-2 text-sm flex justify-start items-center" for="username">
                    <span class="material-symbols-outlined pr-1">
                      bookmark
                    </span>
                    <div>Project Title</div>
                  </label>
                  <input
                    class="appearance-none border rounded text-sm w-full py-2 px-3 text-gray-800 leading-tight focus:outline-none focus:shadow-outline"
                    id="username"
                    type="text"
                    placeholder="Enter project title"
                    name="title"
                    autoFocus
                    onChange={onChangeHandler}
                    value={itemData.title}
                    required
                  />
                </div>
                <div class="mb-3">
                  <label class="text-gray-600 font-bold mb-2 text-sm flex justify-start items-center" for="email">
                    Brief Abstract:
                  </label>
                  <textarea
                    id="message"
                    rows="5"
                    class="block w-full text-sm text-gray-800 bg-gray-50 rounded-lg border border-gray-300 focus:outline-none focus:shadow-outline dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-500 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 px-3 py-2"
                    placeholder="Write project details..."
                    name="abstract"
                    onChange={onChangeHandler}
                    value={itemData.abstract}
                    required
                  ></textarea>
                </div>
                <div class="mb-3">
                  <label class="text-gray-600 font-bold mb-2 text-sm flex justify-start items-center" for="confirm-password">
                    <span class="material-symbols-outlined pr-1">
                      person
                    </span>
                    Co-Supervisor
                  </label>
                  <input
                    class="appearance-none border text-sm rounded w-full py-2 px-3 text-gray-800 leading-tight focus:outline-none focus:shadow-outline"
                    id="confirm-password"
                    type="text"
                    placeholder="Name of Co-Supervisor"
                    name="cosupervisor"
                    onChange={onChangeHandler}
                    value={itemData.cosupervisor}
                    required
                  />
                </div>
                <div class="mb-4">
                  <label class="text-gray-600 font-bold mb-2 text-sm flex justify-start items-center" for="password">
                    <span class="material-symbols-outlined pr-1">
                      school
                    </span>
                    Specialization:
                  </label>
                  <input
                    class="appearance-none border text-sm rounded w-full py-2 px-3 text-gray-800 leading-tight focus:outline-none focus:shadow-outline"
                    type="text"
                    placeholder="Enter the specialization"
                    name="specialization"
                    onChange={onChangeHandler}
                    value={itemData.specialization}
                    required
                  />
                </div>

                <div class="flex items-center justify-center">
                  <button class="bg-indigo-500 hover:bg-indigo-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline w-100" type="submit">
                    Submit
                  </button>
                </div>
              </form>
            </div>
          </div>
          :
          ""}
        </div>
    )
}
export default OwnerProjectsComponent;
