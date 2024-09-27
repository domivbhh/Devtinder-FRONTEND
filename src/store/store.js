import { configureStore } from "@reduxjs/toolkit"
import userSlice from "./slice/userSlice"
import feedSlice from "./slice/feedSlice"
import connectionSlice from "./slice/connectionSlice"


const store=configureStore({
    reducer:{
            user:userSlice,
            feed:feedSlice,
            connections:connectionSlice
    }
})

export default store