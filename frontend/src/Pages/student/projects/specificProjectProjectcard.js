import React,{useContext,useEffect,useState} from 'react';
import { Link,useParams } from 'react-router-dom';
import ProjectContext from '../../../context/project/ProjectContext';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useSelector } from 'react-redux';

const SpecificProjectProjectcard = () =>{
  
    const {selectproject, deselectproject, ownerdetails, details, allProjects, getInterestedStudents, getSingleProject} = useContext(ProjectContext);
    const [itemData, setItemData] = useState({ name:"",partnerId:"",partnerRoll:"",isbanned:false })
    const items = useSelector(state => state.allProjects.allProjects);
    const [studentRegisteredCount,setStudentRegisteredCount]=useState(0);
    const [isRegistered,setIsRegistered]=useState(0);
    const [loading,setLoading]=useState(true);
    const [alloted,setAlloted]=useState(false);

    const params=useParams();
    const id=params.id;

    const project=items.filter((project)=>project._id===id).map((project,i)=>{return project});
    console.log("aojdoajda",project[0].intrestedPeople)


    //check if user has registered for the project or not
   const user=localStorage.getItem('studId');

    const checker = () => 
    {
      console.log(project)
      console.log(project[0])
      console.log(project[0].intrestedPeople)
      if(project[0].intrestedPeople)project[0].intrestedPeople.map((emailcheck)=>{setStudentRegisteredCount(studentRegisteredCount+1);if(emailcheck===user)setIsRegistered(1);});
      setLoading(false);
    }
    
    const Store = [];  

    const getItem = async ()=>{
      await ownerdetails(id);
      await allProjects();

      const y = await getSingleProject(id);

        if(y){
          const isbanned = y.is_banned;
          setAlloted(isbanned);
        }

      checker();
    }
    
    useEffect(()=>{
      getItem();  
    },[]);
    
    Store.push(details);

    var modal = document.getElementById("myModal");
    // Get the button that opens the modal
    var btn = document.getElementById("myBtn");

    // Get the <span> element that closes the modal
    var span = document.getElementsByClassName("close")[0];


    
    


    const click = () => {
      modal = document.getElementById("myModal");
      // Get the button that opens the modal
      btn = document.getElementById("myBtn");

      // Get the <span> element that closes the modal
      span = document.getElementsByClassName("close")[0];

      // When the user clicks on the button, open the modal
      // if(btn){
        modal.style.display = "block";
      // }

      // When the user clicks on <span> (x), close the modal
      if(span){
      span.onclick = function() {
        modal.style.display = "none";
      }}

      // When the user clicks anywhere outside of the modal, close it
      window.onclick = function(event) {
        if (event.target === modal) {
          modal.style.display = "none";
        }
      }
    }


    const onChangeHandler = (e) => {
      (setItemData({...itemData,[e.target.name]:e.target.value}));
    }

    const user1email=localStorage.getItem('studId');
    const user2email=itemData.partnerId;

    const submit = async (e)=>{
          document.getElementById('myButton').classList.add('animate-pulse');
          e.preventDefault();
          // document.getElementById("myBtn").style.width='140px'
          
          if(document.getElementById("myBtn").innerText==="Register"){
          const x=await selectproject(id,localStorage.getItem('accessToken'),user2email);

          alert(x)
          //check
          if(x===200){
            toast.success('Registered Successfully', {
              position: toast.POSITION.TOP_CENTER
          });
            await getInterestedStudents(id);
            setIsRegistered(1);
            document.getElementById("myBtn").className="projectcardlink2230a";
            document.getElementById("myBtn").innerText="De-Register"; 
            modal.style.display = "none";
            
          }
          else if(x===403)
            {
              document.getElementById('myButton').classList.remove('animate-pulse');
              toast.error('Given Id does not exist. Please ask your "Partner" to login to website once before Register.', {
                position: toast.POSITION.TOP_CENTER
            });
            }
            else if(x===350)
            {
              toast.error('Please Select A Partner.', {
                position: toast.POSITION.TOP_CENTER
            });
            }
          else if(x===400)
            {
              document.getElementById('myButton').classList.remove('animate-pulse');
              toast.error('Already Registered', {
                position: toast.POSITION.TOP_CENTER
            });
          }

        else if(x===401)
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
                modal.style.display = "none"; 
        }
            if(x===400)
            {
              document.getElementById('myButton').classList.remove('animate-pulse');
              toast.error('No Project Alloted Yet.', {
                position: toast.POSITION.TOP_CENTER
            });
            }
      
            if(x===401)
            {
              document.getElementById('myButton').classList.remove('animate-pulse');
              toast.error('This Project is not alloted to you.', {
                position: toast.POSITION.TOP_CENTER
            });
            }
              }   
      }
   

    return(
        <div className='w-full px-2' style={{'fontFamily':'Manrope'}}>
          <div class="px-4 py-2 rounded-lg border-2 bg-gray-100">
            <div class="card-body py-1">
                <div class="flex items-center justify-center font-Manrope tracking-tight leading-5 text-lg md:text-xl bg-gray-400 rounded-sm py-2 font-semibold md:font-bold"><i class="fa-solid fa-book text-xl px-2"></i>{project[0].title}</div>
                <h5 class="card-subtitle text-muted pt-2">
                  <div className='flex items-center'><span class="material-symbols-outlined pr-1">
                person
                </span><div className='text-xs md:text-sm'>{project[0].co_supervisor}</div></div><h6 className='text-xs md:text-sm'>(co-supervisor)</h6>
                </h5>
                <hr/>
                <p class="text-xs md:text-lg font-Manrope md:pl-2">{project[0].brief_abstract}</p>
                <hr/>
                <p class="card-text pb-0 md:pb-1"><h5 className='flex items-center pb-0 mb-0'><span class="material-symbols-outlined pr-1">
                school
                </span><div className='font-semibold text-xs md:text-lg '>Specialization</div></h5><div className='text-xs md:text-sm pl-1'>{project[0].specialization}</div></p>
                {/* <h6 class="card-name text-sm  flex">Created on {project[0].creation_date} <div className='pl-1 text-xs my-auto'>(day, month, year)</div> </h6>
                <h6 class="card-name text-sm">Created at {project[0].creation_time} </h6> */}
                  
                {
                  loading
                  ?
                  <div class="flex items-center justify-center">
                    <div class="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-gray-900"></div>
                  </div>
                  :
                  alloted
                  ?
                  <div className='mt-2' style={{"textAlign":"center","color":"red","fontSize":"larger","fontWeight":"600"}}>
                      This project has been alloted to a group.
                  </div>
                  :
                  isRegistered === 1
                  ?
                  <button id="myBtn" className='disabled cursor-not-allowed mx-auto flex justify-center items-center no-underline w-32 rounded-md text-white p-1 font-semibold mt-2 hover:bg-red-700 text-sm md:text-lg' disabled style={{'backgroundColor':'#EC2D01'}}>De-Register</button>
                  :
                  <button id="myBtn" className='mx-auto flex justify-center items-center no-underline w-24 md:w-32 rounded-md text-white p-1 font-semibold text-sm md:text-lg py-1 mt-2 bg-yellow-600 hover:bg-yellow-700' onClick={click}>Register</button>
                }
                
                

                {/* modal on new project */}
            {isRegistered===1?(<div id="myModal" class="modal">
                    <div class="modal-content">
                    <span class="close">&times;</span>
                    
                    <p id='myButton' className='modalp text-lg'>Are you sure you want to De-register? <Link className='flex justify-center items-center no-underline w-32 rounded-md text-white p-1 font-medium' style={{'backgroundColor':'#EC2D01'}} onClick={submit}>De-Register</Link></p>
                     </div>
                </div>):(
            <div id="myModal" class="modal2">
                <div class="modal-content3">
                  <span class="close pt-1 " style={{"justify-content":"start","height":"60px"}}>&times;</span>
                  <form class="w-100 mx-auto bg-white px-2 md:px-6 mb-3" onSubmit={submit}>
                    
                    <div class="mb-12 ">
                      <label class="block text-gray-600 text-sm font-bold mb-2 d-flex justify-content-start items-center" for="confirm-password">
                     
                      Partner Outlook id <div class='px-1 font-medium'>(including @iitg.ac.in)</div>
                      </label>
                      <input
                        class="appearance-none border text-sm rounded w-full py-2 px-3 text-gray-800 leading-tight focus:outline-none focus:shadow-outline"
                        id="confirm-password"
                        type="email"
                        placeholder="Outlook id"
                        name="partnerId"
                        onChange={onChangeHandler}
                        value={itemData.partnerId}
                        required
                      />
                    </div>
                    
                    <div class="flex items-center justify-center">
                      <button id='myButton' class="bg-yellow-600 hover:bg-yellow-700 text-white font-bold py-2 px-4 rounded w-100" type="submit">
                        Register
                      </button>

                    </div>
                  </form>
                </div>
              </div>)}
            </div>
            {/* modal */}      
            
        </div>
    </div>
    )}

export default SpecificProjectProjectcard;