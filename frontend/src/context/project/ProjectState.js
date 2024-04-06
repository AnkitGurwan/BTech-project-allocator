import React, { useState } from "react";
import { useDispatch } from 'react-redux';
import { setSpecificProjects, setAllProjectsRedux, delProject, setInterestedStudents } from "../../Redux/allProjects/allprojectsSlice";
import ItemContext from "./ProjectContext";
var _ = require('lodash');


const ItemState=(props)=>{

    const [allProjectsState,setAllProjectsState]=useState([]);
    const [itemsspecific,setItemsspecific]=useState([]);
    const [details,setDetails]=useState([]);
    const [single,setSingle]=useState([]);

    const dispatch = useDispatch();

    //local backend url for testing
    const url = 'http://localhost:5000';

    //hosted backend url
    // const url = process.env.REACT_APP_BACKEND_URL;

    
    const allProjects = async () => {
        const response = await fetch(`${url}/project/allprojects`, {
            method: 'GET',
            headers: {
                'Content-Type': "application/json"
            }
        });
        const json = await response.json();

        //reverse the array to get the latest project at top
        json.reverse();

        //save details in react state and redux
        setAllProjectsState(json);
        dispatch(setAllProjectsRedux(json));

        return response.status;
    };



    const Projectspecific = async ( email ) => {  
        const response = await fetch(`${url}/project/specificProject/${email}`, {
            method: 'GET',
            headers: {
                'Content-Type': "application/json"
            }
        })

        const json = await response.json();  

        dispatch(setSpecificProjects(json));
        return response.status;
    };

    const createProject = async (email, title, brief_abstract, co_supervisor, specialization) => {
            const response = await fetch(`${url}/project/newProject/${email}`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ title, brief_abstract, co_supervisor, specialization})
            });
            
            return response.status;
    };


    const updateProject = async (title, brief_abstract, co_supervisor, specialization, id, email) => {
            const response = await fetch(`${url}/project/updateProject/${id}/${email}`, {
                method: 'PATCH',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ title, brief_abstract, co_supervisor, specialization})
            });
            
            return response.status;
    };


    const deleteProject=async(id, email)=>{
            const response = await fetch(`${url}/project/deleteProject/${id}`, {
                method: 'DELETE',
                headers: {
                    'Content-Type': "application/json",
                    'auth-token':localStorage.getItem('prof_auth_token')
                }
            });
            dispatch(delProject(id));
            return response.status;
    };

    const selectproject = async ( email, id )=>{       
            const response = await fetch(`${url}/project/selectProject/${id}/${email}`,  {
                method: 'GET',
                credentials:'include',
                headers: {
                    'Content-Type': "application/json"
                }
            })
            return response.status;
    };
    

    const allotProject = async (id,user,friend)=>{   
            const response = await fetch(`${url}/project/allotProject/${id}/${user}/${friend}`,  {
                method: 'GET',
                credentials:'include',
                headers: {
                    'Content-Type': "application/json"
                }
            })
            return response.status;
    };


    const deselectproject = async(email, id)=>{       
            const response = await fetch(`${url}/project/deselectproject/${id}/${email}`,  {
                method: 'GET',
                credentials:'include',
                headers: {
                    'Content-Type': "application/json"
                }
            })
            return response.status;
    };
        

    const getOwnerDetails = async( id )=>{          
            const response = await fetch(`${url}/project/ownerdetails/${id}`, {
                    method: 'GET',
                    headers: {
                        'Content-Type': "application/json"
                    }
                })            
            const json = await response.json();

            //set prof details in redux
            setDetails(json);    
            return response.status;
    };

    const getInterestedStudents = async (id) => { 
            const response = await fetch(`${url}/project/getInterestedStudents/${id}`, {
                    method: 'GET',
                    headers: {
                        'Content-Type': "application/json"
                    }
                })            
            const json = await response.json();

            dispatch(setInterestedStudents(json));   

            return response.status;
    };


    const getSingleProject = async(id)=>{
        const response = await fetch(`${url}/project/projectSpecific/${id}`, {
            method: 'GET',
            headers: {
                'Content-Type': "application/json"
            }
        });
        const json=await response.json();
        return json;
    }

    
        
    return (
        <ItemContext.Provider value={{details, allProjects,allProjectsState,createProject,updateProject,deleteProject,selectproject,deselectproject,getOwnerDetails,Projectspecific,itemsspecific,getSingleProject,single, getInterestedStudents,allotProject}}>
            {props.children}
        </ItemContext.Provider>
    )
}

export default ItemState;