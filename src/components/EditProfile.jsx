import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import UserCards from './UserCards';
import { backend } from '../utils';
import { addUser } from '../store/slice/userSlice';

const EditProfile = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [err, setErr] = useState("");

    let {user}=useSelector((state)=>state.user)


    const [data, setData] = useState({
      firstName: user?.firstName,
      lastName: user?.lastName,
      age: user?.age,
      gender: user?.gender,
      about: user?.about,
      photoUrl: user?.photoUrl,
    });


    const handleChange = (e) => {
      const { name, value } = e.target;
      setData((prev) => ({ ...prev, [name]: value }));
    };

    const handleSubmit = async () => {
      try {
        const resp = await fetch(`${backend}/profile/`+user._id, {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            token:localStorage.getItem('token')
          },
          withCredentials: true,
          body: JSON.stringify(data),
        });
        const result = await resp.json();
        if (result?.data) {
          dispatch(addUser(result?.data));
         setErr('')
        } else {
          setErr(result.message);
        }
      } catch (error) {
        setErr(error.message);
      }
    };
  return (
    <div className='flex justify-center mx-10 my-8'>
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
                value={data.age}
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
              <select name="gender" id="" onChange={(e)=>handleChange(e)}>
                <option value='male'>Male</option>
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
              Edit
            </button>
          </div>
        </div>
      </div>
      <div className='mx-5'>
      <UserCards data={data}/>
      </div>
    </div>
  );
}

export default EditProfile
