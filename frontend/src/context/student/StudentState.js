import React from "react";
import StudentContext from "./StudentContext";
var _ = require('lodash');


const StudentState = (props) => {

    //local backend url for testing
    const url = 'http://localhost:5000';

    //hosted backend url
    // const url = process.env.REACT_APP_BACKEND_URL;


    //check student is alloted project or not
    const checkStudentAlloted = async ( userEmail ) => {
        const response = await fetch(`${url}/student/checkAlloted/${userEmail}`, {
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
    const createStudent = async (userEmail, userName, userRoll) => {
        const response = await fetch(`${url}/student/newstudent`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ userEmail, userName, userRoll})
        });
        const json = await response.json();
        console.log("A",json)
        return response.status;
    };

    const findStepDone = async ( email ) => {
        const response = await fetch(`${url}/student/stepsdone/find/${email}`,{
            method: 'GET',
            headers: { 
                'Context-Type': 'application/json'
            }
        })
        const json = await response.json();
        console.log("json",json)
        return json.ans;
    }

    const increaseStepDone = async ( email ) => {
        const response = await fetch(`${url}/student/stepsdone/increase/${email}`,{
            method: 'GET',
            headers: { 
                'Context-Type': 'application/json'
            }
        })

        return response.status;
    }
    

    const LogOut = async () => {
        const tenantID = process.env.MICROSOFT_GRAPH_TENANT_ID;
        const logoutEndpoint = `https://login.microsoftonline.com/${tenantID}/oauth2/v2.0/logout?post_logout_redirect_uri=${process.env.REACT_APP_FRONTEND_URL}`;
        window.location.href = logoutEndpoint;

        // Delete the items from local storage
        localStorage.removeItem('accessToken');
        localStorage.removeItem('studId');
        localStorage.removeItem('studJob');
        localStorage.removeItem('studName');
        localStorage.removeItem('studRoll');
    }

    const checkStudentEligible = ( roll ) => {
        if (
            `${process.env.REACT_APP_ROLL_LOW}` <= roll &&
            roll <= `${process.env.REACT_APP_ROLL_HIGH}`
        ) {
            return true;
        } 
        else {
            return false;
        }
    }
    
        
    return (
        <StudentContext.Provider value={{LogOut,createStudent, checkStudentAlloted, findStepDone, increaseStepDone, checkStudentEligible}}>
            {props.children}
        </StudentContext.Provider>
    )
}

export default StudentState;