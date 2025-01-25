import React, { useEffect, useState } from 'react'
import { backend } from '../utils'
import UserCards from './UserCards'
import { useDispatch, useSelector } from 'react-redux'
import { addConnections } from '../store/slice/connectionSlice'
import axios from 'axios'

const Connections = () => {

  const dispatch=useDispatch()

  const connections=useSelector((state)=>state.connections)

  useEffect(()=>{
      fetchConnections()
  },[])


  const fetchConnections=async ()=>{
      try {
        const  res=await axios(`${backend}/user/connections`,{
                    withCredentials: true,
                })
        if(res.data){
          dispatch(addConnections(res.data.data))
        }
      } 

      catch (error) {
        console.log(error.message)
      }
  }

  if(connections.length<1){
    return <div className='text-center font-bold text-xl'>
      <h1>No connections Found</h1>
    </div>
  }

  return (
    <div className='text-center p-4'>
      <h1 className='text-2xl text-center text-gray-500 font-bold'>Connections</h1>
      {connections.length>0 && connections.map((ele)=>{
        return <div className=' mx-auto flex gap-3 m-5 p-5 border rounded-lg bg-base-300 w-1/2'>
                    <div className='w-1/4'>
                    <img src={ele?.photoUrl} className='w-20 h-20 rounded-full' alt="image" />
                    </div>
                    <div className='text-left mx-4'>
                    <h2 className='font-bold text-xl'>{ele?.firstName+" "+ele?.lastName}</h2>
                    <p>{ele?.about}</p>
                    {/* <p>{ele?.age}</p> */}
                    </div>

              </div>
      })}
    </div>
  )
}

export default Connections
