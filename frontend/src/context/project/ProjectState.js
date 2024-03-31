import React, { useState } from "react";
import { useDispatch } from 'react-redux';
import { setSpecificProjects, setAllProjectsRedux, delProject, addProject, setInterestedStudents } from "../../Redux/allProjects/allprojectsSlice";
import { setAllStudents } from "../../Redux/student/studentSlice"
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
                'Content-Type': "application/json",
                'auth-token':localStorage.getItem('btpToken')
            }
        });
        const json=await response.json();

        //reverse the array to get the latest project at top
        json.reverse();

        //save details in react state and redux
        setAllProjectsState(json);
        dispatch(setAllProjectsRedux(json));

        return response.status;
    };



    const Projectspecific = async () => {  
        const response = await fetch(`${url}/project/projectsposted`, {
            method: 'GET',
            headers: {
                'Content-Type': "application/json",
                'auth-token': localStorage.getItem('btpToken')
            }
        })

        const json=await (response.json())  

        json.reverse();
        if(json)
        setItemsspecific(json);       

        dispatch(setSpecificProjects(json));
        
        return response.status;
    };

    const createProject = async (title,brief_abstract,co_supervisor,specialization) => {
            const response = await fetch(`${url}/project/newproject`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'auth-token':localStorage.getItem('btpToken')
                },
                body: JSON.stringify({ title,brief_abstract,co_supervisor,specialization})
            });
            
            const json = await response.json(); 
            const newItem={ title,brief_abstract,co_supervisor,specialization};
            dispatch(addProject(newItem));
            return response.status;
    };


    const updateProject = async (title,brief_abstract,co_supervisor,specialization,id) => {
            const response = await fetch(`${url}/project/updateproject/${id}`, {
                method: 'PATCH',
                headers: {
                    'Content-Type': 'application/json',
                    'auth-token':localStorage.getItem('btpToken')
                },
                body: JSON.stringify({ title,brief_abstract,co_supervisor,specialization})
            });
            
            const json = await response.json();
    };


    const deleteProject=async(id)=>{
            const response = await fetch(`${url}/project/deleteproject/${id}`, {
                method: 'DELETE',
                headers: {
                    'Content-Type': "application/json",
                    'auth-token':localStorage.getItem('btpToken')
                }
            });
            dispatch(delProject(id));
            return response.status;
    };

    const selectproject = async (id,accessToken,partner)=>{       
            const response = await fetch(`${url}/project/projectaddition/${id}/${accessToken}/${partner}`,  {
                method: 'GET',
                credentials:'include',
                headers: {
                    'Content-Type': "application/json"
                }
            })
            return response.status
    };

    const allotProject = async(id,user,friend)=>{   
            const response = await fetch(`${url}/project/allotProject/${id}/${user}/${friend}`,  {
                method: 'GET',
                headers: {
                    'Content-Type': "application/json"
                }
            })
            return response.status;
    };


    const deselectproject=async(id,user)=>{       
            const response = await fetch(`${url}/project/deselectproject/${id}/${user}`,  {
                method: 'GET',
                headers: {
                    'Content-Type': "application/json"
                }
            })
            return response.status;
    };
        

    const ownerdetails=async(id)=>{          
            const response = await fetch(`${url}/project/ownerdetails/${id}`, {
                    method: 'GET',
                    headers: {
                        'Content-Type': "application/json",
                        'auth-token':localStorage.getItem('btpToken')
                    }
                })            
            const json=await response.json()
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
            const json=await response.json();
            dispatch(setInterestedStudents(json));    
            return response.status;
    };


    const getAllStudent=async()=>{     
            const response = await fetch(`${url}/project/getallstudent`, {
                    method: 'GET',
                    headers: {
                        'Content-Type': "application/json"
                    }
                })   
            const json=await response.json()
            dispatch(setAllStudents(json));
            
           return json;
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

    

    const Logout = async () => {
        const tenantID = process.env.MICROSOFT_GRAPH_TENANT_ID;
        const logoutEndpoint = `https://login.microsoftonline.com/${tenantID}/oauth2/v2.0/logout?post_logout_redirect_uri=${process.env.REACT_APP_FRONTEND_URL}`;
        window.location.href = logoutEndpoint;
    }
    
        
    return (
        <ItemContext.Provider value={{details, Logout, getAllStudent, allProjects,allProjectsState,createProject,updateProject,deleteProject,selectproject,deselectproject,ownerdetails,Projectspecific,itemsspecific,getSingleProject,single, getInterestedStudents,allotProject}}>
            {props.children}
        </ItemContext.Provider>
    )
}

export default ItemState;