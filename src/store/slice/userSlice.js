import { createSlice, current } from "@reduxjs/toolkit";

const userSlice=createSlice({
    name:'user',
    initialState:{
        user:{}
    },
    reducers:{
        addUser:(state,action)=>{
            state.user=action.payload
            // console.log(current(state.user))
        },
        removeUser:(state,action)=>{
            state.user=null
        }
    }
})

export default userSlice.reducer
export const {addUser}=userSlice.actions