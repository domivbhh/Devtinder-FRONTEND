import axios from 'axios';
import React from 'react'
import { backend } from '../utils';
import { useDispatch } from 'react-redux';
import { removeFeed } from '../store/slice/feedSlice';

const UserCards = ({data}) => {
  const dispatch=useDispatch()

  const handleSendRequest=async(status,id)=>{
    try {
      const res = await axios.post(
        `${backend}/connection/request/send/${status}/${id}`,{},{withCredentials:true});
      console.log(res)
      dispatch(removeFeed(id))
    } 
    catch (error) {
      console.log(error.message)
    }
  }






  // console.log(data)
  return (
    <div className="">
      <div className="card bg-base-200 w-96 shadow-xl">
        <figure>
          <img src={data?.photoUrl} alt="image" />
        </figure>
        <div className="card-body">
          <h2 className="card-title">{data?.firstName}</h2>
          <p>{data?.about}</p>
          <p>
            {data?.age} {data?.gender}
          </p>
          <div className="card-actions justify-end">
            <button
              className="btn btn-primary"
              onClick={() => handleSendRequest("ignored", data._id)}
            >
              Ignore
            </button>
            <button
              className="btn btn-secondary"
              onClick={() => handleSendRequest("interested", data._id)}
            >
              Interested
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default UserCards
