import React, { useContext,useEffect, useState } from "react";
import { useParams,Link } from 'react-router-dom';
import ProjectContext from '../../../context/project/ProjectContext';
import Projectcardspecific from "./projectcardOwnerReadMore";
import { useSelector } from 'react-redux';


const Specificprojectcard=()=> {
    const {Projectspecific,getInterestedStudents,allotProject,getSingleProject} = useContext(ProjectContext);
    const items = useSelector(state => state.allProjects.specificProjects);
    const params=useParams();
    const id=params.id;
    const [loading,setLoading]=useState(true);
    const [alloted,setAlloted]=useState(false);
    var studentRegisteredList = useSelector(state => state.allProjects.interestedStudents);
    var newArray = [];
    for(let i=0;i<studentRegisteredList.length;i++)
    {
      let student1 = studentRegisteredList[i];
      let student2 = studentRegisteredList[i+1];
      let array = [];
      array.push(student1);
      array.push(student2);
      newArray.push(array);
      i++;
    }
    studentRegisteredList = newArray;
    // console.log("jj",newArray)

    const getItem = async () => {        
        await Projectspecific(); 
        const x = await getInterestedStudents(id);
        

        const y = await getSingleProject(id);
        // console.log("x",y)

        if(y){
          // console.log("y",y)
          const isbanned = y.is_banned;
          setAlloted(isbanned);
        }
        // alert("hiii")
        // alert(is_banned)
        // setAlloted(is_banned);

        if(x === 200)setLoading(false);
      };
      // var is_banned = false;

      useEffect(()=>{
          getItem();
      },[]);
 
      
      const clickHandler = async (name1,name2) => {
        setLoading(true);
        const x = await allotProject(id,name1,name2);
          
        if(x === 200){
          setLoading(false);
          setAlloted(true);
        }
      }

     return(
        <div className='my-2' style={{'fontFamily':'Manrope'}}>
          <div className="flex">
            <Link className='text-xl md:text-3xl ml-4' to={`/owner`}><i class="fa-sharp fa-solid fa-arrow-left fa-lg"></i></Link>
          </div>

          <div className="flex flex-col md:flex-row mt-2">
            <div className='w-full md:w-1/2 md:ml-16 md:mr-4 px-2'>
              { items.filter((project) => project._id===id).map((projects,i) => { 
                return (<Projectcardspecific key={i} project={projects}/>)})}
            </div>

            <div className="md:w-1/2 flex flex-col items-center border-4 rounded-lg my-2 md:mx-8 p-2">
                <div>
                  <div className="font-medium text-center text-sm md:text-lg px-4 pb-2">Currently registered students :</div>
                  {
                    loading
                    ?
                    <div class="h-48 flex items-center justify-center">
                      <div class="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-gray-900"></div>
                    </div>
                    :
                    alloted
                    ?
                    <div className="mt-8 h-32 mx-4 md:mx-0 px-4 flex justify-center items-center bg-green-600 text-white rounded-md text-lg md:text-xl lg:text-2xl font-semibold">Project alloted to a group successfully.</div>
                    :
                    <div className="py-2 grid mx-2 ">
                    
                    { studentRegisteredList.length > 0 
                    ?
                    studentRegisteredList.map((individual) => {
                      return    (<div className="grid grid-cols-1 md:grid-cols-3 md:p-2 py-2 mb-4 bg-green-500 rounded-sm text-white">
                                  <div className="p-2 flex flex-col">
                                    <div className="text-xs font-medium md:font-semibold lowercase">{individual[0]}</div>
                                    <div className="flex flex-row">
                                    <div className="text-xs text-white pr-2">Grade Card <i class="fa-solid fa-download text-sm"></i></div>
                                    <div className="text-xs text-white ">Resume <i class="fa-solid fa-download text-sm"></i></div>
                                    </div>
                                  </div>
                                  <div className="p-2 flex flex-col">
                                    <div className="text-xs font-medium md:font-semibold lowercase">{individual[1]}</div>
                                    <div className="flex">
                                    <div className="text-xs text-white pr-2">Grade Card <i class="fa-solid fa-download text-xs"></i></div>
                                    <div className="text-xs text-white ">Resume <i class="fa-solid fa-download text-xs"></i></div>
                                    </div>
                                  </div>
                                  <div onClick={()=>{clickHandler(individual[0],individual[1]);}} className="my-2 mx-4 p-1 flex justify-center items-center font-bold rounded-md text-white bg-red-600 hover:bg-red-700 cursor-pointer">Approve</div>
                                </div>)
                        // return (<div className="flex flex-col py-2 bg-green-500 border-2 px-4">
                        //       <div className="text-start text-sm text-white font-medium px-1">{individual}</div>
                        //       <div className="flex flex-col items-start w-full">
                        //          <div className="text-xs px-1 text-white">Grade Card <i class="fa-solid fa-download text-sm"></i></div>
                        //          <div className="text-xs px-1 text-white">Resume <i class="fa-solid fa-download text-sm"></i></div></div>
                        //       </div>
                        //     )
                      })
                    :
                    <div className="px-3 normal-case text-sm md:text-lg">No one has registered for this project (Refresh to reflect any changes)</div>}
                  </div>}
                </div>
              </div>
          </div>
              
      </div>
    ) 
};
export default Specificprojectcard;