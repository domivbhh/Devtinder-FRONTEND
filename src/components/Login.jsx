import React, { useState } from 'react'
import { backend } from '../utils'
import { useDispatch } from 'react-redux'
import { addUser } from '../store/slice/userSlice'
import { useNavigate } from 'react-router-dom'

const Login = () => {
  const dispatch=useDispatch()
  const navigate = useNavigate();
  const[err,setErr]=useState('')

    const [data,setData]=useState({
        emailId:'',password:''
    })

    const handleChange=(e)=>{
        const{name,value}=e.target
        setData((prev)=>({...prev,[name]:value}))
    }

        const handleSubmit=async()=>{
            try {
                const resp=await fetch(`${backend}/auth/login`,{
                    method:'POST',
                    headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                    },
                    withCredentials: true,
                    body:JSON.stringify(data)
                })    
                const result=await resp.json()
                if(result?.data?.token){
                  localStorage.setItem("token", result?.data?.token);
                  dispatch(addUser(result?.data?.sendingData))
                   navigate('/')
                }
                else{
                  setErr(result.message)
                }
            } 
            catch (error) {
                setErr(error.message)
            }
        }

  return (
    <div className="flex justify-center my-8">
      <div className="card bg-base-300  w-96 shadow-xl">
        <div className="card-body">
          <h2 className="card-title justify-center">Login</h2>
          <div className=''>
            <label className="form-control w-full max-w-xs my-2">
              <div className="label">
                <span className="label-text">Email Id</span>
              </div>
              <input
                type="text"
                name='emailId'
                onChange={(e)=>handleChange(e)}
                value={data.emailId}
                className="input input-bordered w-full max-w-xs"
              />
              <div className="label">
              </div>
            </label>
            <label className="form-control w-full max-w-xs my-2">
              <div className="label">
                <span className="label-text">Password</span>
              </div>
              <input
                type="password"
                name='password'
                value={data.password}
                onChange={(e)=>handleChange(e)}
                className="input input-bordered w-full max-w-xs"
              />
              <div className="label">
              </div>
            </label>
          </div>
          <p className='text-red-500 font-bold capitalize'>{err}</p>
          <div className="card-actions justify-center">
            <button className="btn btn-primary" onClick={()=>{handleSubmit()}}>Login</button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Login
