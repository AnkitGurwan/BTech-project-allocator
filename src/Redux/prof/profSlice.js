import { createSlice } from "@reduxjs/toolkit"
var _ = require('lodash');

const initialState = {
    ownerDetails:[],
}

const ownerSlice = createSlice({
    name:"owner",
    initialState,
    reducers:{
        setOwner(state,action){
            return {
                ...state,
                allProjects: action.payload
              };
        },     
        addOwner(state,action){
            state.ownerDetails.unshift(action.payload);
            state.allProjects.unshift(action.payload);
        }, 
        delOwner(state,action){
            const index = state.specificProjects.findIndex(item => item.id === action.payload);
            state.specificProjects.slice(index, 1);
        }, 
    }
})
export const {setOwner,addOwner,delOwner} = ownerSlice.actions;

export default ownerSlice.reducer;



