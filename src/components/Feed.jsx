import React, { useEffect } from 'react'
import Navbar from './Navbar'
import { Outlet } from 'react-router-dom';
import { backend } from '../utils';
import { useDispatch, useSelector } from 'react-redux';
import { addFeed } from '../store/slice/feedSlice';
import UserCards from './UserCards';


const Feed = () => {

  const dispatch=useDispatch()
  const feed=useSelector((state)=>state.feed)
  console.log(feed)

  useEffect(()=>{
    if(true){
      fetchFeed()
    }
  },[])


  const fetchFeed=async()=>{
    try {
        const res = await fetch(`${backend}/user/feed`, {
          method: "GET",
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
            token: localStorage.getItem("token"),
          },
          withCredentials: true,
        });

        const result = await res.json();
        dispatch(addFeed(result.users));
        
    } catch (error) {
      console.log(error.message)
    }
  

  }

  return (
    <div className='flex justify-center my-10'>
          {
              feed.map((ele)=>{
                return <UserCards data={ele}/>
              })
          }      
    </div>
  );
}

export default Feed
