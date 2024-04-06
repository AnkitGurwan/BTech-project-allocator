import React, { useContext, useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import ProjectContext from '../../../context/project/ProjectContext';
import ProfContext from '../../../context/prof/ProfContext';
import ProjectCard from './ownerProjectCard';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useSelector } from 'react-redux';
import AuthContext from '../../../context/auth/AuthContext';

const OwnerProjectsComponent = () => {
  const { Projectspecific, createProject } = useContext(ProjectContext);
  const { ProfMicrosoftLogin } = useContext(AuthContext);
  const { getProfDetailsFromMicrosoft, checkProfEligible, createProf } = useContext(ProfContext);
  const [mobileMenu, setMobileMenu] = useState(false);
  const [allowed, setAllowed] = useState(false);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [random, setRandom] = useState(false);

  const [count, setCount] = useState(0);

  const items = useSelector(state => state.allProjects.specificProjects);
  const profInfo = useSelector(state => state.prof.profInfo);


  //check prof allowed or not to access the page
  const checkAllowed = async () => {
    const x = await getProfDetailsFromMicrosoft();
    
    if(x === 200)
    {
        if(profInfo && profInfo.profInfo)
        {
            var job = "student";
            var roll = "340103016";

            job = profInfo.profInfo.jobTitle;
            roll = profInfo.profInfo.surname ? profInfo.profInfo.surname : "340103016";


            if(checkProfEligible(job, roll))
            {
                setAllowed(true);
                setLoading(false);
            } 
            else // not allowed
            {
                setAllowed(false);
                setLoading(false);
            }
        }
        else if(random) // not allowed
        {
            setAllowed(false);
            setLoading(false);
        }
        setRandom(true);
    } 
    else //not logged in or token expired
    {
        //if user if not logged in, redirect user to login page
        await ProfMicrosoftLogin();
    }
  };

  const getItem = async () => {

      checkAllowed();

      //register a new prof
      if (profInfo && profInfo.profInfo)
      {
        if(checkProfEligible(profInfo.profInfo.mail, profInfo.profInfo.surname))
        {
          const x = await createProf(
              profInfo.profInfo.mail,
              profInfo.profInfo.displayName
          );
        }      
      }

      //get a specific project
      if (profInfo && profInfo.profInfo)
      {
          const x = await Projectspecific(profInfo.profInfo.mail);  
      }
  };


  useEffect(() => {
    getItem();
  }, [random]);

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
      e.preventDefault();
      setCount(count + 1);

      //create a new project
      if (profInfo && profInfo.profInfo)
      {
        const x = await createProject(
          profInfo.profInfo.mail,
          itemData.title,
          itemData.abstract,
          itemData.cosupervisor,
          itemData.specialization,
          itemData.date,
          itemData.time,
          itemData.isbanned
        );

        if (x === 200) {
          setShowModal(false);
          setItemData({
            title: "",
            abstract: "",
            cosupervisor: "",
            specialization: "",
            date: "",
            time: "",
            isbanned: false
          });

          getItem();

          toast.success('Project created successfully', {
            position: 'top-center'
          });
        }
        else{
          toast.error('User does not exist', {
            position: 'top-center'
          });
        }
      }
      else
      {
        toast.error('Server error. Kindly login again.', {
          position: 'top-center'
        });
      }
      };

    const download = async (e) => {
      e.preventDefault();
      
      if (profInfo && profInfo.profInfo)
      {
        window.open(`${process.env.REACT_APP_BACKEND_URL}/project/intrestedpeople/${profInfo.profInfo.mail}`,
        '_blank');
      
      };
    }
  
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
                            className="outline-none border rounded-md p-2 w-[90%] md:w-[30vw]"
                            name='search'
                            placeholder="Search by Title name"
                            value={search}
                            onChange={detectChanges}
                        />
                    </div>
                </div>
              </div>
              <div class="absolute inset-y-0 right-0 hidden md:flex items-center pr-2 sm:static sm:inset-auto sm:ml-6 sm:pr-0">
                <div
                  class="text-gray-800 px-3 py-2 rounded-md text-xl font-bold"
                  style={{ textDecoration: 'none' }}
                >
                  <i
                    class="fa-solid fa-user text-md"
                    style={{ backgroundColor: 'transparent', paddingRight: '0.5rem' }}
                  ></i>
                  My Projects
                </div>
                <Link
                  to={`/btp/prof/all/projects`}
                  class="text-gray-700 hover:text-gray-500 px-3 py-2 no-underline rounded-md text-xl font-x-large"
                >
                  All Projects
                </Link>
              </div>
              {mobileMenu ? (
                <div className="flex md:hidden" onClick={() => setMobileMenu(false)}>
                  <span class="material-symbols-outlined text-black text-xl ml-12 mr-2">cancel</span>
                </div>
              ) : (
                <div className="flex md:hidden" onClick={() => setMobileMenu(true)}>
                  <span class="material-symbols-outlined text-black text-xl ml-12 mr-2">menu_open</span>
                </div>
              )}
              {mobileMenu && (
                <div className="flex flex-col md:hidden mt-12 z-10 border bg-white px-4 top-4 rounded-sm fixed left-8 cursor-pointer ">
                  <div className="text-gray-700 font-bold no-underline py-2 text-lg border-b">My Projects</div>
                  <Link
                    to={`/btp/prof/all/projects`}
                    className="text-gray-600 hover:text-gray-700 text-lg py-2 border-b no-underline"
                  >
                    All projects
                  </Link>
                </div>
              )}
            </div>
          </div>
        </nav>

        <div className='flex justify-between items-center p-2 md:p-4'>
          <div
                className="w-fit flex items-center border p-2 rounded-md"
              >
                <div
                  className="text-xs md:text-lg pr-3"
                  style={{ textAlign: 'center', fontWeight: '600' }}
                >
                  Download List
                </div>
                <i
                  class="fa-solid fa-download text-2xl"
                  onClick={download}
                  style={{
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'center',
                    cursor: 'pointer',
                  }}
                ></i>
              </div>
              <div className="flex justify-end p-4">
                <div id="myBtn" className="rounded-md bg-red-700 text-white font-medium cursor-pointer hover:bg-red-600" onClick={()=>{setShowModal(!showModal)}}>
                  <div className="p-2 text-lg md:text-xl">NEW PROJECT</div>
                </div>
              </div>
        </div>
        

        {loading ? (
          <div class="flex items-center justify-center h-screen">
            <div class="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-gray-900"></div>
          </div>
        ) : (
          <div>
            {allowed 
            ?
            <div>
              <div className="grid grid-cols-2 gap-2 md:gap-4 pt-4 pb-2 px-2 md:px-6 md:grid-cols-3 lg:grid-cols-5">
                {items && items.length > 0 && items.filter(projects => {
                    return search.toString().toLowerCase() === ''
                      ? projects
                      : projects.title.toLowerCase().includes(search.toLocaleLowerCase());
                  })
                  .map((project, i) => {
                    return <ProjectCard key={i} project={project} />;
                  })}
              </div>

                <div
                  className="flex items-center pl-4 md:pl-24 lg:pl-48 bg-gray-200"
                  style={{
                      height: "15vh",
                      width: "100vw",
                      margin: "auto",
                      display: "flex",
                      alignprojects: "center",
                  }}
                  >
                      <svg
                      style={{ height: "30px", paddingRight: "10px" }}
                      className="MuiSvgIcon-root _add__comment_1ob32_146"
                      focusable="false"
                      viewBox="0 0 24 24"
                      aria-hidden="true"
                      >
                      <path
                          d="M22 4c0-1.1-.9-2-2-2H4c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h14l4 4V4zm-2 13.17L18.83 16H4V4h16v13.17zM13 5h-2v4H7v2h4v4h2v-4h4V9h-4z"
                      ></path>
                      </svg>
                      <p
                      className="_para__feedback_1ob32_130 text-xs md:text-sm lg:text-lg flex-wrap"
                      style={{
                          marginBottom: "0.5vw",
                          display: "flex",
                          alignContent: "center",
                      }}
                      hover={{ textDecoration: "underline" }}
                      >
                      We value your opinion, please take a moment to fill out our{" "}
                      <Link
                          className='px-1 text-blue-500 hover:underline'
                          to={`/btp/prof/feedback`}
                      >
                          {" "}
                          feedback form{" "}
                      </Link>{" "}
                      to help us improve.
                      </p>
                  </div>
                </div>
                :
                <div className="w-full flex justify-center mt-8 md:mt-20">
                    <div className="max-w-md bg-white rounded-lg shadow-md p-8">
                        <h1 className="text-3xl font-bold mb-4">404</h1>
                        <p className="text-lg text-gray-700 mb-6">Oops! The page you're looking for could not be accessed by you.</p>
                        <div className="bg-blue-500 text-center text-white text-xl font-bold py-2 px-4 rounded">
                            You are not part of this Course.
                        </div>
                    </div>
                </div>
                }
          </div>
        )}
      </div>
            

        {/* modal on new project */}
        {/* modal on new project */}
        {showModal
          ?
          <div id="myModal" className="z-10 absolute top-0 flex justify-center items-center w-full h-full backdrop-blur-50">
            <div className="px-1 md:px-4 pb-2 rounded-md bg-white w-4/5 md:w-1/2 border border-gray-300 border-opacity-40 shadow-md">
              <span 
                className="pr-2 text-4xl flex justify-end"
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
                    class="appearance-none border rounded bg-gray-50 text-sm w-full py-2 px-3 text-gray-800 leading-tight focus:outline-none focus:shadow-outline"
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
                    class="appearance-none border text-sm rounded bg-gray-50 w-full py-2 px-3 text-gray-800 leading-tight focus:outline-none focus:shadow-outline"
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
                    class="appearance-none border text-sm rounded bg-gray-50 w-full py-2 px-3 text-gray-800 leading-tight focus:outline-none focus:shadow-outline"
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
