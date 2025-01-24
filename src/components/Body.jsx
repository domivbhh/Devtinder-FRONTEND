import React, { useEffect } from 'react'
import Navbar from './Navbar';
import { Outlet, useNavigate } from 'react-router-dom';
import Footer from './Footer';
import { backend } from '../utils';
import { useDispatch, useSelector } from 'react-redux';
import { addUser } from '../store/slice/userSlice';
import axios from 'axios';

const Body = () => {
    const token=localStorage.getItem('token')
    const dispatch=useDispatch()
    const navigate=useNavigate()

    const {user}=useSelector((state)=>state.user)
    console.log(user)


    useEffect(()=>{
    fetchUser()
       
        
  },[])

  const fetchUser=async()=>{
    if(user?.firstName) return
    try {
    const res = await axios(`${backend}/profile/view`, { 
      withCredentials: true,
    });  
    dispatch(addUser(res?.data?.data))
    } 
    catch (error) {
      if(error.status===401){
        navigate('/login')
      }
      console.log(error.message)
    }
  }



  return (
    <div>
      <Navbar />
      <Outlet/>
      <Footer/>
    </div>
  );
}

export default Body