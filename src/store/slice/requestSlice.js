import { createSlice } from "@reduxjs/toolkit";



const requestSLice=createSlice({
    name:'requests',
    initialState:'',
    reducers:{
        addRequest:(state,action)=>{
            return action.payload
        },
        removeRequest:(state,action)=>{
            const newArray=state.filter((ele)=>ele._id!==action.payload)
            return newArray
        }
    }
})


export default requestSLice.reducer
export const {addRequest,removeRequest}=requestSLice.actions