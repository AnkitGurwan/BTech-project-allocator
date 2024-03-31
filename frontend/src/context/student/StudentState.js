import React from "react";
import StudentContext from "./StudentContext";
var _ = require('lodash');


const StudentState = (props) => {

    //local backend url for testing
    const url = 'http://localhost:5000';

    //hosted backend url
    // const url = process.env.REACT_APP_BACKEND_URL;


    //check student is alloted project or not
    const checkStudentAlloted = async ( email ) => {
        const response = await fetch(`${url}/student/checkAlloted/${email}`, {
            method: 'GET',
            credentials:'include',
            headers: {
                'Content-Type': "application/json"
            }
        });
        const json = await response.json();

        //if alloted return response status and id of the project registered
        var array = [];
        array.push(response.status);
        array.push(json.id);
        
        return array;
    }


    //create a new student
    const createStudent = async (userEmail,userName,userRoll) => {
        const response = await fetch(`${url}/student/newstudent`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ userEmail,userName,userRoll})
        });
        
        return response.status;
    };
    

    const LogOut = async () => {
        const tenantID = process.env.MICROSOFT_GRAPH_TENANT_ID;
        const logoutEndpoint = `https://login.microsoftonline.com/${tenantID}/oauth2/v2.0/logout?post_logout_redirect_uri=${process.env.REACT_APP_FRONTEND_URL}`;
        window.location.href = logoutEndpoint;
    }
    
        
    return (
        <StudentContext.Provider value={{LogOut,createStudent, checkStudentAlloted}}>
            {props.children}
        </StudentContext.Provider>
    )
}

export default StudentState;