import { createSlice, createAsyncThunk } from "@reduxjs/toolkit"
var _ = require('lodash');
const url = "http://localhost:5000";

const initialState = {
    specificProjects : [],
    allProjects : [],
    interestedStudents : [],
}

const allprojectsSlice = createSlice({
    name:"allProjects",
    initialState,
    reducers:{
        setAllProjectsRedux(state,action){
            return {
                ...state,
                allProjects: action.payload
              };
        },    
        setSpecificProjects(state,action){
            return {
                ...state,
                specificProjects: action.payload
              };
        }, 
        setInterestedStudents(state,action){
            return {
                ...state,
                interestedStudents : action.payload
              };
        }, 
        addProject(state,action){
            state.specificProjects.unshift(action.payload);
            state.allProjects.unshift(action.payload);
        }, 
        delProject(state,action){
            const index = state.specificProjects.findIndex(item => item.id === action.payload);
            state.specificProjects.slice(index, 1);
        }
    }
})
export const {setAllProjectsRedux, setSpecificProjects, addProject, delProject, editProject, setInterestedStudents} = allprojectsSlice.actions;

export default allprojectsSlice.reducer;



