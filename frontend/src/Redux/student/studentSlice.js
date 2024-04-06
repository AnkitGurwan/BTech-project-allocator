import { createSlice } from "@reduxjs/toolkit"
var _ = require('lodash');

const initialState = {
    studentInfo: [],
    intrestedPeople:[],
    partnerDetails:"",
    studentProject:"",
    allStudents:[]
}

const studentSlice = createSlice({
    name: "student",
    initialState,
    reducers:{
        setStudentInfo(state,action){
            return {
                ...state,
                studentInfo: action.payload
              };
        }, 
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
            return {
                ...state,
                allStudents: action.payload
              };
        }, 
    }
})
export const {setStudentInfo, addStudent, removeStudent, addProject, setAllStudents} = studentSlice.actions;

export default studentSlice.reducer;



