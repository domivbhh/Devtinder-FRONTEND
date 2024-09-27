import React, { useEffect, useState } from 'react'
import { backend } from '../utils'
import { useDispatch, useSelector } from 'react-redux'
import { addRequest, removeRequest } from '../store/slice/requestSlice'

const Requests = () => {


  
  const requests=useSelector((state)=>state.requests)
  console.log(requests)
  const dispatch=useDispatch()
      useEffect(()=>{
            fetchRequest()
      },[])


      const reviewRequest=async(status,id,reqId)=>{
        try {
          const res = await fetch(`${backend}/request/review/${status}/${id}`, {
            method: "POST",
            headers: {
              Accept: "application/json",
              "Content-Type": "application/json",
              token: localStorage.getItem("token"),
            },
            withCredentials: true,
          });
          dispatch(removeRequest(reqId))  
        } 
        catch (error) {
          
        }
      }

      const fetchRequest=async()=>{
        try {
            const res=await fetch(`${backend}/user/requests`,{
                    method:'GET',
                    headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                    token:localStorage.getItem('token')
                    },
                    withCredentials: true,
                })
            
            const result=await res.json()
            dispatch(addRequest(result.data))
        } 
        catch (error) {
          console.log(error.message)
        }
      }



  return (
    <div>
      <h1 className="text-3xl text-center text-gray-500 font-bold">
        Requests
      </h1>
      {requests.length > 0 &&
        requests.map((ele) => {
          const{fromUserId}=ele
          return (
            <div
              key={ele._id}
              className=" mx-auto flex justify-between gap-3 m-5 p-5 border rounded-lg bg-base-300 w-2/3"
            >
              <div>
                <img
                  src={fromUserId?.photoUrl}
                  className="w-20 h-20 rounded-full"
                  alt=""
                />
              </div>
              <div className="text-left mx-4">
                <h2 className="font-bold text-4xl capitalize">
                  {fromUserId?.firstName + " " + fromUserId?.lastName}
                </h2>
                <p>{fromUserId?.age}</p>
              </div>
              <div className="flex flex-wrap gap-2">
                <button
                  className="btn btn-active btn-primary"
                  onClick={() => reviewRequest("rejected", ele.fromUserId._id,ele._id)}
                >
                  Reject
                </button>
                <button
                  className="btn btn-active btn-secondary"
                  onClick={() => reviewRequest("accepted", ele.fromUserId._id,ele._id)}>
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
