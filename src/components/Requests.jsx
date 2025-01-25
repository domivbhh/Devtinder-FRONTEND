import React, { useEffect, useState } from 'react'
import { backend } from '../utils'
import { useDispatch, useSelector } from 'react-redux'
import { addRequest, removeRequest } from '../store/slice/requestSlice'
import axios from 'axios'

const Requests = () => {


  
  const requests=useSelector((state)=>state.requests)
  // console.log(requests)
  const dispatch=useDispatch()
      useEffect(()=>{
            fetchRequest()
      },[])


      const reviewRequest=async(status,id)=>{
        try {
          const res = await axios.post(
            `${backend}/connection/request/review/${status}/${id}`,
            {},
            {
              withCredentials: true,
            }
          );
          dispatch(removeRequest(id))
        } 
        catch (error) {
          console.log(error?.response?.data?.message);
        }
      }

      const fetchRequest=async()=>{
        try {
            const res=await axios(`${backend}/user/requests`,{
                    withCredentials: true,
                })            
            // const result=await res.json()
            // console.log(res)
            dispatch(addRequest(res.data.data))
        } 
        catch (error) {
          console.log(error.message)
        }
      }
if(requests.length===0){
    return <h2 className='text-md text-center'>No request Found</h2>
}


  return (
    <div>
      <h1 className="text-2xl text-center text-gray-500 font-bold">
        Requests
      </h1>
      
      {requests.length > 0 &&
        requests.map((ele) => {
          const{fromUserId}=ele
          return (
            <div
              key={ele._id}
              className=" mx-auto flex justify-between align-middle gap-3 m-5 p-5 border rounded-lg bg-base-300 w-1/2"
            >
              <div>
                <img
                  src={fromUserId?.photoUrl}
                  className="w-12 h-12 rounded-full"
                  alt=""
                />
              </div>
              <div className="text-left mx-4 flex flex-col align-middle">
                <h2 className="font-bold text-xl capitalize">
                  {fromUserId?.firstName + " " + fromUserId?.lastName}
                </h2>
                <p>{fromUserId?.about}</p>
              </div>
              <div className="flex flex-wrap gap-2">
                <button
                  className="btn btn-active btn-primary"
                  onClick={() => reviewRequest("rejected", ele._id)}
                >
                  Reject
                </button>
                <button
                  className="btn btn-active btn-secondary"
                  onClick={() => reviewRequest("accepted", ele._id)}>
                  Accept
                </button>
              </div>
            </div>
          );
        })}
    </div>
  );
}

export default Requests
