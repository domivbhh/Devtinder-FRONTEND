import React, { useEffect } from 'react'
import Navbar from './Navbar'
import { Outlet } from 'react-router-dom';
import { backend } from '../utils';
import { useDispatch, useSelector } from 'react-redux';
import { addFeed } from '../store/slice/feedSlice';
import UserCards from './UserCards';
import axios from 'axios';


const Feed = () => {

  const dispatch=useDispatch()
  const feed=useSelector((state)=>state.feed)
  // console.log(feed)

  useEffect(()=>{
    if(true){
      fetchFeed()
    }
  },[])


  const fetchFeed=async()=>{
      if (feed) return;
    try {
        const res = await axios(`${backend}/user/feed`, {
          withCredentials: true,
        });

        console.log(res)
        // const result = await res.json();
        dispatch(addFeed(res.data.data));
        
    } catch (error) {
      console.log(error.message)
    }  }

    if(feed?.length<1){
      return <h1 className='text-center font-md'>No user found</h1>
    }

  return (
    <div className="flex justify-center mx-auto items-center gap-5 flex-col">
      {feed &&
        feed.map((ele) => {
          return <UserCards data={ele} />;
        })}
      {/* <h1>Feed</h1> */}
    </div>
  );
}

export default Feed
