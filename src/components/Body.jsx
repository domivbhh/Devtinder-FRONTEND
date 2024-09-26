import React, { useEffect } from 'react'
import Navbar from './Navbar';
import { Outlet, useNavigate } from 'react-router-dom';
import Footer from './Footer';
import { backend } from '../utils';
import { useDispatch, useSelector } from 'react-redux';
import { addUser } from '../store/slice/userSlice';

const Body = () => {
    const token=localStorage.getItem('token')
    const dispatch=useDispatch()
    const navigate=useNavigate()

    const {user}=useSelector((state)=>state.user)
    console.log(user)


  useEffect(()=>{
       if(token && !user.firstName)
        { fetchUser()
        }
        else{
          navigate('/login')
        }
  },[])

  const fetchUser=async()=>{
    try {
    const res = await fetch(`${backend}/profile/view`, {
      method: "GET",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        token:localStorage.getItem('token')
      },
      withCredentials: true,
    });  
    const result=await res.json()
    dispatch(addUser(result.data))

    } 
    catch (error) {
      console.log(error.message)
      navigate('/login')
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