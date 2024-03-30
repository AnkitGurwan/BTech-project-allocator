import { createSlice } from "@reduxjs/toolkit"
var _ = require('lodash');

const initialState = {
    intrestedPeople:[],
    partnerDetails:"",
    studentProject:"",
    allStudents:[]
}

const studentSlice = createSlice({
    name:"student",
    initialState,
    reducers:{
        addStudent(state,action){
            return {
                ...state,
                intrestedPeople: action.payload
              };
        },     
        removeStudent(state,action){
            
            state.intrestedPeople=[];
        }, 
        addPartner(state,action){
            const index = state.specificProjects.findIndex(item => item.id === action.payload);
            state.specificProjects.slice(index, 1);
        }, 
        setAllStudents(state,action){
            console.log("hiii guys")
            return {
                ...state,
                allStudents: action.payload
              };
        }, 
    }
})
export const {addStudent,removeStudent,addProject,setAllStudents} = studentSlice.actions;

export default studentSlice.reducer;



