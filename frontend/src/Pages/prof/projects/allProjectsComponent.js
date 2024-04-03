import React, { useContext, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import ProjectContext from '../../../context/project/ProjectContext';
import ProjectCard from './projectcard';
import { useSelector } from 'react-redux';

const AllProjectsComponent = () => {
  const { allProjects } = useContext(ProjectContext);
  const [loading, setLoading] = useState(true);
  const items = useSelector(state => state.allProjects.allProjects);
  const [search, setSearch] = useState("");
  const [mobileMenu, setMobileMenu] = useState(false);

  const getItem = async () => {
    const x = await allProjects();
    if (x === 200) setLoading(false);
  };

  useEffect(() => {
    getItem();
    document.body.classList.add("disable-scrolling");
  }, []);

  const detectChanges = async (e) => {
    setSearch(e.target.value);
  };

  const openNav = () => {
    document.getElementById("sidenavbar").style.top = "12vh";
    document.getElementById("sidenavbar").style.width = "20vw";
    document.getElementById("sidenavbar").style.height = "88vh";
    document.getElementById("text-left").style.left = "20vw";
    document.getElementById("text-left").style.width = "80vw";
  };

  const closeNav = () => {
    document.getElementById("sidenavbar").style.top = "0";
    document.getElementById("sidenavbar").style.width = "0vw";
    document.getElementById("sidenavbar").style.height = "0vh";
    document.getElementById("text-left").style.left = "0vw";
    document.getElementById("text-left").style.width = "100vw";
  };

  return (
    <div class="text-center">
      <div class="text-left" id="text-left">
        <nav class="shadow-md" >
          <div class="py-2 mx-auto px-2 sm:px-10 lg:px-200">
            <div class="relative flex items-center justify-between h-16">
              <div class="flex items-center justify-start" style={{ "marginLeft": "7vw" }}>
              <div class="input-group" className="searchdiv1">
                  <i class="fas fa-search text-xl h-full pr-4 "></i>
                  <div class="form-outline">
                    <input
                      id="search-input"
                      type="search"
                      class="form-control w-[40%] md:w-[30%] text-center"
                      name="search"
                      placeholder="Search by Title name"
                      value={search}
                      onChange={detectChanges}
                    />
                  </div>
                </div>
              </div>
              <div class="absolute inset-y-0 right-0 hidden md:flex items-center pr-2 sm:static sm:inset-auto sm:ml-6 sm:pr-0">
                <Link
                  to={`/owner`}
                  class="text-gray-700 hover:text-gray-500 px-3 py-2 rounded-md text-xl font-x-large"
                  style={{ "textDecoration": "none" }}
                >
                  <i class="fa-solid fa-user text-md" style={{ "backgroundColor": "transparent", "paddingRight": "0.5rem" }}></i>My Projects
                </Link>
                <div
                  class="text-gray-800 px-3 py-2 rounded-md text-xl font-bold"
                  style={{ "textDecoration": "none" }}
                >
                  All Projects
                </div>
              </div>
              {mobileMenu ? (
                <div className='flex md:hidden' onClick={() => setMobileMenu(false)}>
                  <span class="material-symbols-outlined text-black text-xl ml-12 mr-2">
                    cancel
                  </span>
                </div>
              ) : (
                <div className='flex md:hidden' onClick={() => setMobileMenu(true)}>
                  <span class="material-symbols-outlined text-black text-xl ml-12 mr-2">
                    menu_open
                  </span>
                </div>
              )}
              {mobileMenu && (
                <div className='flex flex-col md:hidden mt-12 z-10 border bg-white px-4 top-4 rounded-sm fixed left-8 cursor-pointer '>
                  <Link
                    to={`/owner`}
                    className='text-gray-600 hover:text-gray-700 no-underline py-2 text-lg border-b'
                  >
                    My Projects
                  </Link>
                  <Link
                    to={`/mainpage`}
                    className='text-gray-700 font-bold text-lg py-2 border-b no-underline'
                  >
                    All projects
                  </Link>
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
          <div className='grid grid-cols-2 gap-0 mt-4 mx-2 md:mx-6 md:grid-cols-3 lg:grid-cols-5' style={{ "marginTop": "40px" }}>
            {items
              .filter((projects) => (search.toString().toLowerCase() === '' ? projects : projects.title.toLowerCase().includes(search.toLocaleLowerCase())))
              .map((project, i) => <ProjectCard key={i} project={project} />)
            }
          </div>
        )}
        <div
          class="_feedback_container_1ob32_125 pl-4 md:pl-24 lg:pl-48"
          style={{ "height": "15vh", "width": "100vw", "margin": "auto", "display": "flex", "alignItems": "center", "backgroundColor": "whitesmoke" }}
        >
          <svg
            style={{ "height": "30px", "paddingRight": "10px" }}
            class="MuiSvgIcon-root _add__comment_1ob32_146"
            focusable="false"
            viewBox="0 0 24 24"
            aria-hidden="true"
          >
            <path d="M22 4c0-1.1-.9-2-2-2H4c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h14l4 4V4zm-2 13.17L18.83 16H4V4h16v13.17zM13 5h-2v4H7v2h4v4h2v-4h4V9h-4z"></path>
          </svg>
          <p
            class="_para__feedback_1ob32_130 text-xs md:text-sm lg:text-lg flex-wrap"
            style={{ "marginBottom": "0.5vw", "display": "flex", "alignContent": "center" }}
            hover={{ "textDecoration": "underline" }}
          >
            We value your opinion, please take a moment to fill out our
            <Link className='px-1 ' to={`/proffeedback`} style={{ "textDecoration": "none" }}>
              feedback form
            </Link>
            to help us improve.
          </p>
        </div>
      </div>
    </div>
  );
};

export default AllProjectsComponent;
