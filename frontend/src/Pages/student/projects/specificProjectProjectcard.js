import React,{useContext,useEffect,useState} from 'react';
import { Link,useParams } from 'react-router-dom';
import ProjectContext from '../../../context/project/ProjectContext';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useSelector } from 'react-redux';

const SpecificProjectProjectcard = () =>{
  
    //context info fetch
    const {selectproject, deselectproject, ownerdetails, getInterestedStudents } = useContext(ProjectContext);
    const [itemData, setItemData] = useState({ name: "", partnerId: "", partnerRoll: "", isbanned: false })
    

    //defined states
    const [studentRegisteredCount, setStudentRegisteredCount] = useState(0);
    const [isRegistered, setIsRegistered] = useState(false);
    const [loading, setLoading] = useState(true);
    const [alloted, setAlloted] = useState(false);
    const [showModal, setShowModal] = useState(false);

    const params=useParams();
    const id=params.id;

    //redux info fetch
    const items = useSelector(state => state.allProjects.allProjects);
    const project = items.filter((project)=>project._id === id).map((project,i)=>{return project});


    //check if user has registered for the project or not
   const user = localStorage.getItem('studId');

    const checkStudentRegisteredCount = () => 
    {
      if(project[0].intrestedPeople)
      {
        project[0].intrestedPeople.map((emailcheck) => 
          {
            setStudentRegisteredCount(studentRegisteredCount+1);
            if(emailcheck === user)setIsRegistered(1);
          });
      }
      setLoading(false);
    }
    

    const getItem = async () => {

      //get prof details
      await ownerdetails(id);

      //get single project
      const x = project;

      if(x){
        const isbanned = x.is_alloted;
        setAlloted(isbanned);
      }

      checkStudentRegisteredCount();
    }
    
    useEffect(()=>{
      getItem();  
    },[]);


    const onChangeHandler = (e) => {
      (setItemData({...itemData,[e.target.name]:e.target.value}));
    }

    //partner details
    const user1email = localStorage.getItem('studId');
    const user2email = itemData.partnerId;


    const submit = async (e) => {
          e.preventDefault();
          
          if(document.getElementById("myBtn").innerText==="Register"){
          const x=await selectproject(id,localStorage.getItem('accessToken'),user2email);

          alert(x)
          //check
          if(x === 200){
            toast.success('Registered Successfully', {
              position: toast.POSITION.TOP_CENTER
          });
            await getInterestedStudents(id);
            setIsRegistered(1);
            document.getElementById("myBtn").className="projectcardlink2230a";
            document.getElementById("myBtn").innerText="De-Register"; 
            
          }
          else if(x === 403)
            {
              document.getElementById('myButton').classList.remove('animate-pulse');
              toast.error('Given Id does not exist. Please ask your "Partner" to login to website once before Register.', {
                position: toast.POSITION.TOP_CENTER
            });
            }
            else if(x === 350)
            {
              toast.error('Please Select A Partner.', {
                position: toast.POSITION.TOP_CENTER
            });
            }
          else if(x === 400)
            {
              document.getElementById('myButton').classList.remove('animate-pulse');
              toast.error('Already Registered', {
                position: toast.POSITION.TOP_CENTER
            });
          }

        else if(x === 401)
          {
            document.getElementById('myButton').classList.remove('animate-pulse');
            toast.error('You have already Registered for a project', {
              position: toast.POSITION.TOP_CENTER
          });
          }
          }
            //already registered
            else { 
              const x=await deselectproject(id,user);
              //check
              if(x===200){
                document.getElementById('myButton').classList.remove('animate-pulse');
                setIsRegistered(0);
              
                toast.success('De-Registered', {
                  position: toast.POSITION.TOP_CENTER
              });          
                document.getElementById("myBtn").className="projectcardlink223";
                document.getElementById("myBtn").innerText="Register"; 
        }
            if(x===400)
            {
              document.getElementById('myButton').classList.remove('animate-pulse');
              toast.error('No Project Alloted Yet.', {
                position: toast.POSITION.TOP_CENTER
            });
            }
      
            if(x === 401)
            {
              document.getElementById('myButton').classList.remove('animate-pulse');
              toast.error('This Project is not alloted to you.', {
                position: toast.POSITION.TOP_CENTER
            });
            }
          }   
      }

    const click = () => {
        setShowModal(true);
    }
   

    return(
        <div className='w-full px-2' style={{'fontFamily':'Manrope'}}>
          <div className="p-3 rounded-lg border-2 bg-gray-100">
            <div className="py-1">
                <div className="flex items-center justify-center font-Manrope tracking-tight leading-5 text-lg md:text-xl bg-gray-300 rounded-sm py-2 font-semibold md:font-bold">
                  <i className="fa-solid fa-book text-xl px-2"></i>
                  {project[0].title}
                </div>

                <h5 className="card-subtitle text-muted py-2 md:py-3">
                  <div className='flex items-center'>
                    <span className="material-symbols-outlined pr-1">
                    person
                    </span>
                    <div className='text-xs md:text-sm'>{project[0].co_supervisor}</div>
                  </div>
                  <h6 className='text-xs md:text-sm'>(co-supervisor)</h6>
                </h5>
                <hr/>

                <p className="text-xs md:text-[1rem] leading-normal font-Manrope py-2 md:py-3 md:pl-1">{project[0].brief_abstract}</p>

                <hr/>
                
                <p className="py-2 md:py-3">
                  <h5 className='flex items-center pb-0 mb-0'>
                    <span className="material-symbols-outlined pr-1">
                    school
                    </span>
                    <div className='font-semibold text-xs md:text-lg '>
                      Specialization
                    </div>
                  </h5>
                  <div className='text-xs md:text-sm pl-1'>{project[0].specialization}</div>
                </p>
                  
                {
                  loading
                  ?
                  <div className="flex items-center justify-center">
                    <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-gray-900"></div>
                  </div>
                  :
                  alloted
                  ?
                  <div className='mt-2 text-center text-red text-xl font-medium'>
                      This project has been alloted to a group.
                  </div>
                  :
                  isRegistered === 1
                  ?
                  <button 
                    id="myBtn" 
                    className='disabled cursor-not-allowed mx-auto flex justify-center items-center no-underline w-32 rounded-md text-white p-1 font-semibold mt-2 hover:bg-red-700 text-sm md:text-lg' 
                    disabled 
                    style={{'backgroundColor':'#EC2D01'}}
                  >
                    De-Register
                  </button>
                  :
                  <button 
                    id="myBtn" 
                    className='mx-auto flex justify-center items-center no-underline w-24 md:w-32 rounded-md text-white p-1 font-semibold text-sm md:text-lg py-1 mt-2 bg-yellow-600 hover:bg-yellow-700' 
                    onClick={click}
                  >
                    Register
                  </button>
                }
                
                

                {/* modal on new project */}
                {showModal
                ?
                <div>
                {isRegistered === 1
                  ?
                  <div id="myModal" className="fixed top-12 left-20">
                      <div className="modal-content">
                        <span className="close">&times;</span>
                        
                        <p 
                          id='myButton' 
                          className='modalp text-lg'
                        >
                            Are you sure you want to De-register? 
                            <Link 
                              className='flex justify-center items-center no-underline w-32 rounded-md text-white p-1 font-medium' 
                              style={{'backgroundColor':'#EC2D01'}} 
                              onClick={submit}
                            >
                                De-Register
                            </Link>
                          </p>
                      </div>
                    </div>
                    :
                    <div id="myModal" className="z-10 fixed top-1/4 left-1/3 w-full h-full">
                      <div className="px-4 pt-1 pb-3 rounded-md bg-gray-200 w-1/3 border border-gray-300 border-opacity-40 shadow-md">
                        <span 
                          className="pt-1 pr-2 text-4xl flex justify-end"
                        >
                          <div className='cursor-pointer text-gray-600' onClick={() => {setShowModal(false)}}>&times;</div>
                        </span>
                        <form className="w-full mx-auto mb-3" onSubmit={submit}>
                          <div className="mb-8">
                            <label 
                              className="text-gray-600 text-sm font-bold mb-2 md:mb-4 flex justify-content-start items-center" for="confirm-password">
                                Partner Outlook id 
                                <div className='px-1 font-medium'>
                                  (including @iitg.ac.in)
                                </div>
                            </label>
                            <input
                              className="appearance-none border text-sm rounded w-full py-2 px-3 text-gray-800 leading-tight focus:outline-none focus:shadow-outline"
                              id="confirm-password"
                              type="email"
                              placeholder="Outlook id"
                              name="partnerId"
                              onChange={onChangeHandler}
                              value={itemData.partnerId}
                              required
                            />
                          </div>
                          
                          <div className="flex items-center justify-center">
                            <button 
                              id='myButton' 
                              className="bg-yellow-600 hover:bg-yellow-700 text-white font-bold py-2 px-4 rounded w-100" 
                              type="submit">
                                Register
                            </button>

                          </div>
                        </form>
                      </div>
                    </div>
                  } 
                  </div>
                  :
                  ""}
              </div>
              {/* modal */}      
              
          </div>
      </div>
    )}

export default SpecificProjectProjectcard;