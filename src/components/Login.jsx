import React, { useState } from 'react'
import { backend } from '../utils'
import { useDispatch, useSelector } from 'react-redux'
import { addUser } from '../store/slice/userSlice'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'

const Login = () => {
  const userData=useSelector((state)=>state.user)
  const dispatch=useDispatch()
  const navigate = useNavigate();
  const[err,setErr]=useState('')
  const[signup,setSignUp]=useState(false)

    const [data,setData]=useState({
        emailId:'',password:'',firstName:'',lastName:'',age:'',about:''
    })

    const handleChange=(e)=>{
        const{name,value}=e.target
        setData((prev)=>({...prev,[name]:value}))
    }

        const handleSubmit=async()=>{
            try {
                const resp=!signup ? await axios.post(`${backend}/signin`,{emailId:data.emailId,password:data.password},{withCredentials:true}):await axios.post(`${backend}/signup`,{emailId:data.emailId,password:data.password,firstName:data.firstName,lastName:data.lastName,age:data.age},{withCredentials:true})
                
                console.log(resp)
                console.log(signup)

                if(signup && resp?.data.message){
                  // console.log('signup entered')
                  setSignUp(false)  
                  setData((prev)=>({...prev,emailId:'',password:''}))
                  navigate('/login')
                }
                if(resp?.data?.data && !signup ){   
                    // console.log('signin entered')               
                    navigate('/')
                    dispatch(addUser(resp?.data?.data))
                }
                
            } 
            catch (error) {
                setErr(error?.response?.data?.message)
            }
        }

  return (
    <div className="flex justify-center my-8">
      <div className="card bg-base-300  w-96 shadow-xl">
        <div className="card-body">
          <h2 className="card-title justify-center">{signup? 'Signup':"Signin"}</h2>
          <div className="">
            {signup && (
              <div>
                <label className="form-control w-full max-w-xs my-2">
                  <div className="label">
                    <span className="label-text">FirstName</span>
                  </div>
                  <input
                    type="text"
                    name="firstName"
                    value={data.firstName}
                    onChange={(e) => handleChange(e)}
                    className="input input-bordered w-full max-w-xs"
                  />
                  <div className="label"></div>
                </label>
                <label className="form-control w-full max-w-xs my-2">
                  <div className="label">
                    <span className="label-text">LastName</span>
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
              </div>
            )}
            <label className="form-control w-full max-w-xs my-2">
              <div className="label">
                <span className="label-text">Email-Id</span>
              </div>
              <input
                type="text"
                name="emailId"
                onChange={(e) => handleChange(e)}
                value={data.emailId}
                className="input input-bordered w-full max-w-xs"
              />
              <div className="label"></div>
            </label>
            <label className="form-control w-full max-w-xs my-2">
              <div className="label">
                <span className="label-text">Password</span>
              </div>
              <input
                type="password"
                name="password"
                value={data.password}
                onChange={(e) => handleChange(e)}
                className="input input-bordered w-full max-w-xs"
              />
              <div className="label"></div>
            </label>
          </div>

          {/* Error */}
          <p className="text-red-500 font-bold capitalize">{err}</p>

          <div className="card-actions justify-center">
            <button
              className="btn btn-primary"
              onClick={() => {
                handleSubmit();
              }}
            >
              {signup ? "Signup" : "Login"}
            </button>
          </div>
          <div>
            <p>
              {signup ? "Already had an account? " : "Don't have an account? "}
              <span
                className="text-red-400 cursor-pointer"
                onClick={() => setSignUp(!signup)}
              >
                {signup ? "signin" : "signup"}
              </span>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Login
