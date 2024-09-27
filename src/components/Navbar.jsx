import React from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { removeUser } from '../store/slice/userSlice';

const Navbar = () => {
  const navigate=useNavigate()
  const dispatch=useDispatch()

  const{user}=useSelector((state)=>state.user)
  return (
    <div>
      <div className="navbar bg-base-200">
        <div className="flex-1">
          <Link className="btn btn-ghost text-xl" to={'/'}>DevTinder</Link>
        </div>
        {user?.firstName &&
        <div className="flex-none gap-2">
          <p>Welcome {user?.firstName}</p>
          {/* <div className="form-control">
            <input
              type="text"
              placeholder="Search"
              className="input input-bordered w-24 md:w-auto"
            />
          </div> */}
          <div className="dropdown dropdown-end mx-5 flex">
            <div
              tabIndex={0}
              role="button"
              className="btn btn-ghost btn-circle avatar"
            >
              <div className="w-10 rounded-full">
                <img
                  alt="Tailwind CSS Navbar component"
                  src={user && user?.photoUrl}
                />
              </div>
            </div>
            <ul
              tabIndex={0}
              className="menu menu-sm dropdown-content bg-base-100 rounded-box z-[1] mt-3 w-52 p-2 shadow"
            >
              <li>
                <Link className="justify-between" to={'/profile'}>
                  Profile
                </Link>
              </li>
              <li>
                <Link to={'/connections'}>Connections</Link>
              </li>
              <li>
                <Link to={'/requests'}>Requests</Link>
              </li>
              <li onClick={()=>{localStorage.removeItem('token'),dispatch(removeUser()),navigate('/login'),window.location.reload()}}>
                <a>Logout</a>
              </li>
            </ul>
          </div>
        </div>
        }
      </div>
    </div>
  );
}

export default Navbar
