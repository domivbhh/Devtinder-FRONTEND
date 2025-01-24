import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import UserCards from './UserCards';
import { backend } from '../utils';
import { addUser } from '../store/slice/userSlice';
import axios from 'axios';
import UserViewCards from './UserViewCard';

const EditProfile = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [err, setErr] = useState("");

    let {user}=useSelector((state)=>state.user)


    const [data, setData] = useState({
      firstName: user?.firstName,
      lastName: user?.lastName,
      age: user?.age,
      skills:user?.skills,
      gender: user?.gender,
      about: user?.about,
      photoUrl: user?.photoUrl,
    });

    const[showToast,setShowToast]=useState('')

    // console.log(showToast)


    const handleChange = (e) => {
      const { name, value } = e.target;
      setData((prev) => ({ ...prev, [name]: value }));
    };

    const handleSubmit = async () => {
      try {
        const resp = await axios.patch(`${backend}/profile/edit`, {firstName:data?.firstName,lastName:data?.lastName,age:data?.age,gender:data?.gender,photoUrl:data?.photoUrl,skills:data?.skills,about:data?.about},{withCredentials:true});
        // const result = await resp.json();
  
        if (resp?.data) {
          dispatch(addUser(result?.data));
          console.log(resp?.data)
          setShowToast(true)
          setTimeout(()=>{
            setShowToast(false)
          },3000)
          setErr('')
        } 
     
      } 
      catch (error) {
        setErr(error?.response?.data?.message);
      }
    };
  return (
    <div className="flex justify-center mx-10 my-8">
      <div className="card bg-base-300  w-96 shadow-xl">
        <div className="card-body">
          <h2 className="card-title justify-center">Edit Profile</h2>
          <div className="">
            <label className="form-control w-full max-w-xs my-2">
              <div className="label">
                <span className="label-text">First Name</span>
              </div>
              <input
                type="text"
                name="firstName"
                onChange={(e) => handleChange(e)}
                value={data.firstName}
                className="input input-bordered w-full max-w-xs"
              />
              <div className="label"></div>
            </label>
            <label className="form-control w-full max-w-xs my-2">
              <div className="label">
                <span className="label-text">Last Name</span>
              </div>
              <input
                type="text"
                name="lastName"
                value={data.lastName}
                onChange={(e) => handleChange(e)}
                className="input input-bordered w-full max-w-xs"
              />
              <div className="label"></div>
            </label>
            <label className="form-control w-full max-w-xs my-2">
              <div className="label">
                <span className="label-text">Age</span>
              </div>
              <input
                type="number"
                name="age"
                value={data?.age}
                onChange={(e) => handleChange(e)}
                className="input input-bordered w-full max-w-xs"
              />
              <div className="label"></div>
            </label>
            <label className="form-control w-full max-w-xs my-2">
              <div className="label">
                <span className="label-text">About</span>
              </div>
              <input
                type="text"
                name="about"
                value={data.about}
                onChange={(e) => handleChange(e)}
                className="input input-bordered w-full max-w-xs"
              />
              <div className="label"></div>
            </label>
            <label className="form-control w-full max-w-xs my-2">
              <div className="label">
                <span className="label-text">Photo url</span>
              </div>
              <input
                type="text"
                name="photoUrl"
                value={data.photoUrl}
                onChange={(e) => handleChange(e)}
                className="input input-bordered w-full max-w-xs"
              />
              <div className="label"></div>
            </label>
            <label className="form-control w-full max-w-xs my-2">
              <div className="label">
                <span className="label-text">Gender</span>
              </div>
              {/* <input
                type="text"
                name="lastName"
                value={data.lastName}
                onChange={(e) => handleChange(e)}
                className="input input-bordered w-full max-w-xs"
              /> */}
              <select
                name="gender"
                id=""
                onChange={(e) => handleChange(e)}
                value={data.gender}
                className="p-2"
              >
                <option value="male">Male</option>
                <option value="female">Female</option>
                <option value="others">Others</option>
              </select>
              <div className="label"></div>
            </label>
          </div>
          <p className="text-red-500 font-bold capitalize">{err}</p>
          <div className="card-actions justify-center">
            <button
              className="btn btn-primary"
              onClick={() => {
                handleSubmit();
              }}
            >
              Update Profile
            </button>
          </div>
        </div>
      </div>
      <div className="mx-5">
        <UserViewCards data={data} />
      </div>

      {showToast && (
        <div className="toast toast-top toast-end">
          <div className="alert alert-info">
            <span>Profile updated.</span>
          </div>
         
        </div>
      )}
    </div>
  );
}

export default EditProfile
