import { useState } from "react";
import AuthContext from "./AuthContext";


const AuthState = (props) => {

    //states define for auth
    const [user,setUser]=useState([])
    const [interest,setInterest]=useState([])

    //local backend url for testing
    const url = 'http://localhost:5000';

    //hosted backend url
    // const url = process.env.REACT_APP_BACKEND_URL;


    //prof login
    const ProfMicrosoftLogin = async()=>{
        window.location.href = `${process.env.REACT_APP_BACKEND_URL}/auth/microsoft/prof`;
    }

    //student login
    const StudentMicrosoftLogin = async()=>{
        window.location.href = `${process.env.REACT_APP_BACKEND_URL}/auth/microsoft/student`;
    }

    
    //send feedback both student and professor
    const sendFeedback = async (email, header, body)=>{
        const response = await fetch(`${url}/btp/feedback`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ email, header, body }),
        });
        return response.status;
    }


    //get project owner details
    const ownerdetails = async (id) => {
        const response = await fetch(`${url}/project/ownerdetails/${id}`, {
            method: 'GET',
            headers: {
                'Content-Type': "application/json",
                'auth-token':localStorage.getItem('btpToken')
            }
        })
        const json=await response.json();

        //set user details in react redux
        setUser(json);

        return response.status;
    }


    //get a particular project details
    const projectdetails = async (id) => {
        const response = await fetch(`${url}/project/projectdetails/${id}`, {
            method: 'GET',
            headers: {
                'Content-Type': "application/json",
                'auth-token': localStorage.getItem('btpToken')
            }
        })
        const json=await response.json();

        // save particular project in react-redux 
        setInterest(json);

        return response.status;
    }


    //dowload complete list of registered students
    const downloadDetails = async(email)=>{
        const response = await fetch(`${url}/project/intrestedpeople/${email}`, {
            method: 'GET',
            headers: {
                'Content-Type': "application/json",
                'Accept': 'application/json'
            }
        })
        return response.status;
    }


    const getUserDetailsFromMicrosoft = async (code) => {
        const response = await fetch(`${url}/auth/microsoft/getUserDetailsFromMicrosoft`, {
            method: 'GET',
            headers: {
                'Content-Type': "application/json",
                'Code': code
            }
        });

        const json=await response.json();

        //save user details in local storage
        localStorage.setItem('studName',json.studInformation.givenName);
        localStorage.setItem('studId',json.studInformation.mail);
        localStorage.setItem('studRoll',json.studInformation.surname);
        localStorage.setItem('studJob',json.studInformation.jobTitle);
        localStorage.setItem('accessToken',json.accessToken);
    }
    

    return (<AuthContext.Provider value={{sendFeedback, ProfMicrosoftLogin, StudentMicrosoftLogin, ownerdetails, user, downloadDetails, interest, projectdetails, getUserDetailsFromMicrosoft}}>
        {props.children}
    </AuthContext.Provider>
    )
}
export default AuthState;