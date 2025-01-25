import React from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { removeUser } from '../store/slice/userSlice';
import axios from 'axios';
import { backend } from '../utils';

const Navbar = () => {
  const navigate=useNavigate()
  const dispatch=useDispatch()

  const handleLogout=async()=>{
    try {
      const resp=await axios.get(`${backend}/signout`,{withCredentials:true})
      dispatch(removeUser())
      navigate('/login')
      // console.log(resp)
    } catch (error) {
      console.log(error.message)
    }
  }

  const{user}=useSelector((state)=>state.user)
  return (
    <div>
      

      <div className="navbar bg-base-100">
        <div className="flex-1">
          <Link to={'/'} className="btn btn-ghost text-xl">DevTinder</Link>
        </div>
        <div className="flex-none">
          {user && (
            <div className="dropdown dropdown-end">
              <div
                tabIndex={0}
                role="button"
                className="btn btn-ghost btn-circle  avatar"
              >
                <div className="w-10 rounded-full flex">
                  <img
                    alt="Tailwind CSS Navbar component"
                    src={`${user.photoUrl}`}
                  />
                </div>
              </div>
              <ul
                tabIndex={0}
                className="menu menu-sm dropdown-content bg-base-100 rounded-box z-[1] mt-3 w-52 p-2 shadow"
              >
                <li className='text-center'>Welcome {user.firstName}</li>
                <li>
                  <Link className="justify-between" to={`/profile`}>
                    Profile
                    {/* <span className="badge">New</span> */}
                  </Link>
                </li>
                <li>
                  <Link to={'/connections'}>Connections</Link>
                </li>
                <li>
                  {
                    user._id?
                  <Link onClick={handleLogout}>Logout</Link>:null
                  }
                </li>
              </ul>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default Navbar
