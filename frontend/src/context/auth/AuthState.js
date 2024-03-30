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


    //student login through microsoft
    const loginStudent = async ()=>{
        const response = await fetch(`${url}/microsoft/auth/login`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            }
        });
        return response.status;
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
        setInterest(json);
        return response.status;
        }


    const downloadDetails = async(email)=>{
        const response = await fetch(`${url}/project/intrestedpeople/${email}`, {
            method: 'GET',
            headers: {
                'Content-Type': "application/json",
                'Accept': 'application/json'
            }
        })

        const json=await response.json();
        return response.status;
        }

      const studentDetails = async()=>{
        window.location.href = `${process.env.REACT_APP_BACKEND_URL}/auth/microsoft`;
    }

      const getToken = async(code)=>{
        const response = await fetch(`${url}/auth/microsoft/getToken`, {
            method: 'GET',
            headers: {
                'Content-Type': "application/json",
                'Code': code
            }
        });

        const json=await response.json();
        localStorage.setItem('studName',json.studInformation.givenName);
        localStorage.setItem('studId',json.studInformation.mail);
        localStorage.setItem('studRoll',json.studInformation.surname);
        localStorage.setItem('studJob',json.studInformation.jobTitle);
        console.log("json",json)
        localStorage.setItem('accessToken',json.accessToken);
    }
    

    return (<AuthContext.Provider value={{sendFeedback, loginStudent, ownerdetails, user, downloadDetails, interest, projectdetails,  studentDetails, getToken}}>
        {props.children}
    </AuthContext.Provider>
    )
}
export default AuthState;